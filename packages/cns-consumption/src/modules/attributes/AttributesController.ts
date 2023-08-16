import { EventBus } from "@js-soft/ts-utils"
import {
    AbstractAttributeValue,
    AbstractComplexValue,
    AttributeValues,
    IIQLQuery,
    IIdentityAttributeQuery,
    IRelationshipAttributeQuery,
    IThirdPartyRelationshipAttributeQuery,
    IdentityAttribute,
    IdentityAttributeQuery,
    RelationshipAttributeJSON,
    RelationshipAttributeQuery,
    ThirdPartyRelationshipAttributeQuery
} from "@nmshd/content"
import * as Iql from "@nmshd/iql"
import {
    CoreAddress,
    CoreDate,
    CoreId,
    SynchronizedCollection,
    CoreErrors as TransportCoreErrors
} from "@nmshd/transport"
import { nameof } from "ts-simple-nameof"
import {
    ConsumptionBaseController,
    ConsumptionControllerName,
    ConsumptionError,
    ConsumptionIds,
    CoreErrors
} from "../../consumption"
import { ConsumptionController } from "../../consumption/ConsumptionController"
import {
    AttributeCreatedEvent,
    AttributeDeletedEvent,
    AttributeSucceededEvent,
    AttributeUpdatedEvent,
    SharedAttributeCopyCreatedEvent
} from "./events"
import { ICreateLocalAttributeParams } from "./local/CreateLocalAttributeParams"
import { ICreatePeerLocalAttributeParams } from "./local/CreatePeerLocalAttributeParams"
import {
    CreateSharedLocalAttributeCopyParams,
    ICreateSharedLocalAttributeCopyParams
} from "./local/CreateSharedLocalAttributeCopyParams"
import { LocalAttribute, LocalAttributeJSON } from "./local/LocalAttribute"
import { LocalAttributeShareInfo } from "./local/LocalAttributeShareInfo"
import {
    IdentityAttributeQueryTranslator,
    RelationshipAttributeQueryTranslator,
    ThirdPartyRelationshipAttributeQueryTranslator
} from "./local/QueryTranslator"
import { ISucceedLocalAttributeParams, SucceedLocalAttributeParams } from "./local/SucceedLocalAttributeParams"
import { IUpdateLocalAttributeParams } from "./local/UpdateLocalAttributeParams"

export class AttributesController extends ConsumptionBaseController {
    private attributes: SynchronizedCollection

    public constructor(
        parent: ConsumptionController,
        private readonly eventBus: EventBus,
        private readonly identity: { address: CoreAddress }
    ) {
        super(ConsumptionControllerName.AttributesController, parent)
    }

    public override async init(): Promise<this> {
        await super.init()

        this.attributes = await this.parent.accountController.getSynchronizedCollection("Attributes")

        return this
    }

    public checkValid(attribute: LocalAttribute): boolean {
        const now = CoreDate.utc()
        if (!attribute.content.validFrom && !attribute.content.validTo) {
            return true
        } else if (
            attribute.content.validFrom &&
            !attribute.content.validTo &&
            attribute.content.validFrom.isSameOrBefore(now)
        ) {
            return true
        } else if (
            !attribute.content.validFrom &&
            attribute.content.validTo &&
            attribute.content.validTo.isSameOrAfter(now)
        ) {
            return true
        } else if (
            attribute.content.validFrom &&
            attribute.content.validTo &&
            attribute.content.validFrom.isSameOrBefore(now) &&
            attribute.content.validTo.isSameOrAfter(now)
        ) {
            return true
        }
        return false
    }

    public findCurrent(attributes: LocalAttribute[]): LocalAttribute | undefined {
        const sorted = attributes.sort((a, b) => {
            return a.createdAt.compare(b.createdAt)
        })
        let current: LocalAttribute | undefined
        for (const attribute of sorted) {
            if (this.checkValid(attribute)) {
                current = attribute
            }
        }
        return current
    }

    public filterCurrent(attributes: LocalAttribute[]): LocalAttribute[] {
        const sorted = attributes.sort((a, b) => {
            return a.createdAt.compare(b.createdAt)
        })

        const items = []
        for (const attribute of sorted) {
            if (this.checkValid(attribute)) {
                items.push(attribute)
            }
        }
        return items
    }

    public async getLocalAttribute(id: CoreId): Promise<LocalAttribute | undefined> {
        const result = await this.attributes.findOne({
            [nameof<LocalAttribute>((c) => c.id)]: id.toString()
        })

        if (!result) return
        return LocalAttribute.from(result)
    }

    public async getLocalAttributes(query?: any, hideTechnical = false, onlyValid = false): Promise<LocalAttribute[]> {
        const enrichedQuery = this.enrichQuery(query, hideTechnical)
        const attributes = await this.attributes.find(enrichedQuery)
        const parsed = this.parseArray(attributes, LocalAttribute)
        if (!onlyValid) return parsed

        return this.filterCurrent(parsed)
    }

    private enrichQuery(query: any, hideTechnical: boolean) {
        if (!hideTechnical) return query

        const hideTechnicalQuery = {
            $or: [
                {
                    [`${nameof<LocalAttributeJSON>((c) => c.content)}.@type`]: "IdentityAttribute"
                },
                {
                    $and: [
                        {
                            [`${nameof<LocalAttributeJSON>((c) => c.content)}.@type`]: "RelationshipAttribute"
                        },
                        {
                            [`${nameof<LocalAttributeJSON>((c) => c.content)}.${nameof<RelationshipAttributeJSON>(
                                (c) => c.isTechnical
                            )}`]: false
                        }
                    ]
                }
            ]
        }

        if (!query) return hideTechnicalQuery

        return { $and: [query, hideTechnicalQuery] }
    }

    public async getValidLocalAttributes(query?: any, hideTechnical = false): Promise<LocalAttribute[]> {
        return await this.getLocalAttributes(query, hideTechnical, true)
    }

    public async executeIQLQuery(query: IIQLQuery): Promise<LocalAttribute[]> {
        /* Fetch subset of attributes relevant for IQL queries. We filter for
         * local identity attributes. */
        const envelopedAttributes: any[] = (await this.attributes.find()).filter((e) => {
            return e["@type"] === "LocalAttribute" && e.content["@type"] === "IdentityAttribute"
        })

        /* Remove envelope from attributes and execute query. IQL makes no use
         * of the envelope data. */
        const attributes: Iql.AttributeView[] = envelopedAttributes.map((e) => {
            return e.content
        }) as Iql.AttributeView[]
        const indices = Iql.execute(query.queryString, attributes)

        /* Map matched indices back to their respective attributes and return. */
        const matchedAttributes = indices.map((ii) => envelopedAttributes[ii])
        const result = this.parseArray(matchedAttributes, LocalAttribute)
        return result
    }

    public async executeRelationshipAttributeQuery(
        query: IRelationshipAttributeQuery
    ): Promise<LocalAttribute | undefined> {
        const parsedQuery = RelationshipAttributeQuery.from(query)

        const dbQuery = RelationshipAttributeQueryTranslator.translate(parsedQuery)
        dbQuery["content.confidentiality"] = { $ne: "private" }

        const attributes = await this.attributes.find(dbQuery)
        const attribute = attributes.length > 0 ? LocalAttribute.from(attributes[0]) : undefined

        return attribute
    }

    public async executeThirdPartyRelationshipAttributeQuery(
        query: IThirdPartyRelationshipAttributeQuery
    ): Promise<LocalAttribute[]> {
        const parsedQuery = ThirdPartyRelationshipAttributeQuery.from(query)

        const dbQuery = ThirdPartyRelationshipAttributeQueryTranslator.translate(parsedQuery)
        dbQuery["content.confidentiality"] = { $ne: "private" }

        const attributes = await this.attributes.find(dbQuery)

        return this.parseArray(attributes, LocalAttribute)
    }

    public async executeIdentityAttributeQuery(query: IIdentityAttributeQuery): Promise<LocalAttribute[]> {
        const parsedQuery = IdentityAttributeQuery.from(query)
        const dbQuery = IdentityAttributeQueryTranslator.translate(parsedQuery)
        dbQuery["content.owner"] = this.identity.address.toString()
        dbQuery["shareInfo"] = { $exists: false }

        const attributes = await this.attributes.find(dbQuery)

        return this.parseArray(attributes, LocalAttribute)
    }

    public async createLocalAttribute(params: ICreateLocalAttributeParams): Promise<LocalAttribute> {
        const localAttribute = LocalAttribute.from({
            id: await ConsumptionIds.attribute.generate(),
            createdAt: CoreDate.utc(),
            content: params.content,
            parentId: params.parentId
        })

        await this.attributes.create(localAttribute)

        if (
            localAttribute.content instanceof IdentityAttribute && // nested Local Attributes should only be created for Identity Attributes
            localAttribute.content.value instanceof AbstractComplexValue
        ) {
            await this.createLocalAttributesForNestedAttributeValues(localAttribute)
        }

        this.eventBus.publish(new AttributeCreatedEvent(this.identity.address.toString(), localAttribute))

        return localAttribute
    }

    private async createLocalAttributesForNestedAttributeValues(localAttribute: LocalAttribute): Promise<void> {
        if (!(localAttribute.content instanceof IdentityAttribute)) {
            throw new ConsumptionError("Only Identity Attributes are allowed here")
        }

        const nestedAttributeValues = Object.values(localAttribute.content.value).filter(
            (p) => p instanceof AbstractAttributeValue
        ) as AttributeValues.Identity.Class[]

        for (const propertyValue of nestedAttributeValues) {
            const nestedAttribute = IdentityAttribute.from({
                ...localAttribute.content.toJSON(),
                value: propertyValue.toJSON() as AttributeValues.Identity.Json
            })

            await this.createLocalAttribute({ content: nestedAttribute, parentId: localAttribute.id })
        }
    }

    public async succeedLocalAttribute(params: ISucceedLocalAttributeParams): Promise<LocalAttribute> {
        const parsedParams = SucceedLocalAttributeParams.from(params)
        const currentAttributeDoc = await this.attributes.findOne({
            [nameof<LocalAttribute>((c) => c.id)]: params.succeeds.toString()
        })
        const currentAttribute = LocalAttribute.from(currentAttributeDoc)

        if (currentAttribute.parentId) {
            throw CoreErrors.attributes.cannotSucceedAttributesWithAParent(parsedParams.succeeds.toString())
        }

        if (!currentAttributeDoc) {
            throw TransportCoreErrors.general.recordNotFound(LocalAttribute, parsedParams.succeeds.toString())
        }

        if (!parsedParams.successorContent.validFrom) {
            parsedParams.successorContent.validFrom = CoreDate.utc()
        }

        const validFrom = parsedParams.successorContent.validFrom
        currentAttribute.content.validTo = validFrom.subtract(1)
        await this.attributes.update(currentAttributeDoc, currentAttribute)

        const successor = await LocalAttribute.fromAttribute(parsedParams.successorContent, parsedParams.succeeds)
        await this.attributes.create(successor)
        this.eventBus.publish(new AttributeSucceededEvent(this.identity.address.toString(), successor))
        return successor
    }

    public async createSharedLocalAttributeCopy(
        params: ICreateSharedLocalAttributeCopyParams
    ): Promise<LocalAttribute> {
        const parsedParams = CreateSharedLocalAttributeCopyParams.from(params)
        const sourceAttribute = await this.getLocalAttribute(parsedParams.sourceAttributeId)
        if (!sourceAttribute) {
            throw TransportCoreErrors.general.recordNotFound(LocalAttribute, parsedParams.sourceAttributeId.toString())
        }

        const shareInfo = LocalAttributeShareInfo.from({
            peer: parsedParams.peer,
            requestReference: parsedParams.requestReference,
            sourceAttribute: parsedParams.sourceAttributeId
        })

        const sharedLocalAttributeCopy = await LocalAttribute.fromAttribute(
            sourceAttribute.content,
            undefined,
            shareInfo,
            parsedParams.attributeId
        )
        await this.attributes.create(sharedLocalAttributeCopy)
        this.eventBus.publish(
            new SharedAttributeCopyCreatedEvent(this.identity.address.toString(), sharedLocalAttributeCopy)
        )
        return sharedLocalAttributeCopy
    }

    public async createPeerLocalAttribute(params: ICreatePeerLocalAttributeParams): Promise<LocalAttribute> {
        const shareInfo = LocalAttributeShareInfo.from({
            peer: params.peer,
            requestReference: params.requestReference
        })
        const peerLocalAttribute = LocalAttribute.from({
            id: params.id ?? (await ConsumptionIds.attribute.generate()),
            content: params.content,
            shareInfo: shareInfo,
            createdAt: CoreDate.utc()
        })
        await this.attributes.create(peerLocalAttribute)
        this.eventBus.publish(new AttributeCreatedEvent(this.identity.address.toString(), peerLocalAttribute))
        return peerLocalAttribute
    }

    public async updateLocalAttribute(params: IUpdateLocalAttributeParams): Promise<LocalAttribute> {
        const current = await this.attributes.findOne({
            [nameof<LocalAttribute>((c) => c.id)]: params.id.toString()
        })
        if (!current) {
            throw TransportCoreErrors.general.recordNotFound(LocalAttribute, params.id.toString())
        }
        const updatedLocalAttribute = LocalAttribute.from({
            id: current.id,
            content: params.content,
            createdAt: current.createdAt,
            shareInfo: current.shareInfo,
            succeededBy: current.succeededBy,
            succeeds: current.succeeds
        })
        await this.attributes.update(current, updatedLocalAttribute)
        this.eventBus.publish(new AttributeUpdatedEvent(this.identity.address.toString(), updatedLocalAttribute))
        return updatedLocalAttribute
    }

    public async deleteAttribute(attribute: LocalAttribute): Promise<void> {
        await this.attributes.delete(attribute)
        this.eventBus.publish(new AttributeDeletedEvent(this.identity.address.toString(), attribute))
    }
}
