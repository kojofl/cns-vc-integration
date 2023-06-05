import { Serializable, serialize, type, validate, ValidationError } from "@js-soft/ts-serval"
import { nameof } from "ts-simple-nameof"
import {
    IdentityAttribute,
    IdentityAttributeJSON,
    IdentityAttributeQuery,
    IdentityAttributeQueryJSON,
    IIdentityAttribute,
    IIdentityAttributeQuery,
    IRelationshipAttribute,
    IRelationshipAttributeQuery,
    RelationshipAttribute,
    RelationshipAttributeJSON,
    RelationshipAttributeQuery,
    RelationshipAttributeQueryJSON
} from "../../../attributes"
import { IRequestItem, RequestItem, RequestItemJSON } from "../../RequestItem"

export interface ProposeAttributeRequestItemJSON extends RequestItemJSON {
    "@type": "ProposeAttributeRequestItem"
    query: IdentityAttributeQueryJSON | RelationshipAttributeQueryJSON
    attribute: IdentityAttributeJSON | RelationshipAttributeJSON
}

export interface IProposeAttributeRequestItem extends IRequestItem {
    query: IIdentityAttributeQuery | IRelationshipAttributeQuery
    attribute: IIdentityAttribute | IRelationshipAttribute
}

@type("ProposeAttributeRequestItem")
export class ProposeAttributeRequestItem extends RequestItem implements IProposeAttributeRequestItem {
    @serialize({ unionTypes: [IdentityAttributeQuery, RelationshipAttributeQuery] })
    @validate()
    public query: IdentityAttributeQuery | RelationshipAttributeQuery

    @serialize({ unionTypes: [IdentityAttribute, RelationshipAttribute] })
    @validate()
    public attribute: IdentityAttribute | RelationshipAttribute

    public static from(
        value: IProposeAttributeRequestItem | Omit<ProposeAttributeRequestItemJSON, "@type">
    ): ProposeAttributeRequestItem {
        return this.fromAny(value)
    }

    protected static override postFrom<T extends Serializable>(value: T): T {
        if (!(value instanceof ProposeAttributeRequestItem)) throw new Error("this should never happen")

        if (value.query instanceof IdentityAttributeQuery) {
            const attributeValueType = (value.attribute.value.toJSON() as any)["@type"]
            const queryValueType = value.query.valueType

            if (attributeValueType !== queryValueType) {
                throw new ValidationError(
                    ProposeAttributeRequestItem.name,
                    `${nameof<ProposeAttributeRequestItem>((x) => x.query)}.${nameof<IdentityAttributeQuery>(
                        (x) => x.valueType
                    )}`,
                    `You cannot propose an Attribute whose type of the value ('${attributeValueType}') is different from the value type of the query ('${queryValueType}').`
                )
            }
        }

        if (value.attribute instanceof RelationshipAttribute && !(value.query instanceof RelationshipAttributeQuery)) {
            throw new ValidationError(
                ProposeAttributeRequestItem.name,
                "",
                "When proposing a RelationshipAttribute, the corresponding query has to be a RelationshipAttributeQuery."
            )
        }

        if (value.attribute instanceof IdentityAttribute && !(value.query instanceof IdentityAttributeQuery)) {
            throw new ValidationError(
                ProposeAttributeRequestItem.name,
                "",
                "When proposing an IdentityAttribute, the corresponding query has to be a IdentityAttributeQuery."
            )
        }

        return value
    }

    public override toJSON(
        verbose?: boolean | undefined,
        serializeAsString?: boolean | undefined
    ): ProposeAttributeRequestItemJSON {
        return super.toJSON(verbose, serializeAsString) as ProposeAttributeRequestItemJSON
    }
}
