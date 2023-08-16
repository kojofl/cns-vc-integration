import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreId, ICoreId } from "@nmshd/transport"
import {
    IIdentityAttribute,
    IRelationshipAttribute,
    IdentityAttribute,
    IdentityAttributeJSON,
    RelationshipAttribute,
    RelationshipAttributeJSON
} from "../../../attributes"
import { IRequestItem, RequestItem, RequestItemJSON } from "../../RequestItem"

export interface SucceedAttributeRequestItemJSON extends RequestItemJSON {
    /**
     * The id of the Attribute to be succeeded.
     */
    succeededAttributeId: string

    /**
     * The new Attribute.
     */
    attribute: IdentityAttributeJSON | RelationshipAttributeJSON
}

export interface ISucceedAttributeRequestItem extends IRequestItem {
    /**
     * The id of the Attribute to be succeeded.
     */
    succeededAttributeId: ICoreId

    /**
     * The new Attribute.
     */
    attribute: IIdentityAttribute | IRelationshipAttribute
}

@type("SucceedAttributeRequestItem")
export class SucceedAttributeRequestItem extends RequestItem implements ISucceedAttributeRequestItem {
    @validate()
    @serialize()
    public succeededAttributeId: CoreId

    @validate()
    @serialize({ unionTypes: [IdentityAttribute, RelationshipAttribute] })
    public attribute: IdentityAttribute | RelationshipAttribute

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
