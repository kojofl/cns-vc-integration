import { Serializable, serialize, type, validate, ValidationError } from "@js-soft/ts-serval"
import { CoreId, ICoreId } from "@nmshd/transport"
import nameof from "easy-tsnameof"
import {
    IdentityAttribute,
    IdentityAttributeJSON,
    IIdentityAttribute,
    IRelationshipAttribute,
    RelationshipAttribute,
    RelationshipAttributeJSON
} from "../../../attributes"
import { IRequestItem, RequestItem, RequestItemJSON } from "../../RequestItem"

export interface SucceedAttributeRequestItemJSON extends RequestItemJSON {
    /**
     * The id of the Attribute to be succeeded.
     */
    succeededId: string
    /**
     * The succeeded Attribute with the updated validTo date. Its validTo date must be lower than the validFrom date of the new Attribute.
     */
    succeededAttribute: IdentityAttributeJSON | RelationshipAttributeJSON

    /**
     * The new Attribute. Its validFrom date must be greater than the validTo date of the succeeded Attribute.
     */
    newAttribute: IdentityAttributeJSON | RelationshipAttributeJSON
}

export interface ISucceedAttributeRequestItem extends IRequestItem {
    /**
     * The id of the Attribute to be succeeded.
     */
    succeededId: ICoreId
    /**
     * The succeeded Attribute with the updated validTo date. Its validTo date must be lower than the validFrom date of the new Attribute.
     */
    succeededAttribute: IIdentityAttribute | IRelationshipAttribute

    /**
     * The new Attribute. Its validFrom date must be greater than the validTo date of the succeeded Attribute.
     */
    newAttribute: IIdentityAttribute | IRelationshipAttribute
}

@type("SucceedAttributeRequestItem")
export class SucceedAttributeRequestItem extends RequestItem implements ISucceedAttributeRequestItem {
    @validate()
    @serialize()
    public succeededId: CoreId

    @validate()
    @serialize({ unionTypes: [IdentityAttribute, RelationshipAttribute] })
    public succeededAttribute: IdentityAttribute | RelationshipAttribute

    @validate()
    @serialize({ unionTypes: [IdentityAttribute, RelationshipAttribute] })
    public newAttribute: IdentityAttribute | RelationshipAttribute

    protected static override postFrom<T extends Serializable>(value: T): T {
        if (!(value instanceof SucceedAttributeRequestItem)) throw new Error("this should never happen")

        if (value.succeededAttribute.toJSON()["@type"] !== value.newAttribute.toJSON()["@type"]) {
            throw new ValidationError(
                SucceedAttributeRequestItem.name,
                nameof<SucceedAttributeRequestItem>((x) => x.succeededAttribute),
                "the type of the new Attribute must be the same as the type of the succeeded Attribute"
            )
        }

        if (!value.succeededAttribute.validTo) {
            throw new ValidationError(
                SucceedAttributeRequestItem.name,
                nameof<SucceedAttributeRequestItem>((x) => x.succeededAttribute.validTo),
                "succeededAttribute must have a validTo date"
            )
        }
        if (!value.newAttribute.validFrom) {
            throw new ValidationError(
                SucceedAttributeRequestItem.name,
                nameof<SucceedAttributeRequestItem>((x) => x.newAttribute.validFrom),
                "newAttribute must have a validFrom date"
            )
        }

        if (!value.succeededAttribute.validTo.add({ day: 1 }).isSame(value.newAttribute.validFrom, "day")) {
            throw new ValidationError(
                SucceedAttributeRequestItem.name,
                nameof<SucceedAttributeRequestItem>((x) => x.succeededAttribute.validTo),
                "the validTo date of the succeeded Attribute must be one day before the validFrom date of the new Attribute"
            )
        }

        return value
    }

    public static from(
        value: ISucceedAttributeRequestItem | SucceedAttributeRequestItemJSON
    ): SucceedAttributeRequestItem {
        return this.fromAny(value)
    }

    public override toJSON(
        verbose?: boolean | undefined,
        serializeAsString?: boolean | undefined
    ): SucceedAttributeRequestItemJSON {
        return super.toJSON(verbose, serializeAsString) as SucceedAttributeRequestItemJSON
    }
}
