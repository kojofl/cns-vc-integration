import { ISerializable, Serializable, serialize, validate } from "@js-soft/ts-serval"
import {
    IdentityAttribute,
    IdentityAttributeJSON,
    IIdentityAttribute,
    IRelationshipAttribute,
    RelationshipAttribute,
    RelationshipAttributeJSON
} from "@nmshd/content"
import { CoreId, ICoreId } from "@nmshd/transport"

export interface CreateLocalAttributeParamsJSON {
    content: IdentityAttributeJSON | RelationshipAttributeJSON
}

export interface ICreateLocalAttributeParams extends ISerializable {
    content: IIdentityAttribute | IRelationshipAttribute
    parentId?: ICoreId
}

export class CreateLocalAttributeParams extends Serializable implements ICreateLocalAttributeParams {
    @serialize({ unionTypes: [IdentityAttribute, RelationshipAttribute] })
    @validate()
    public content: IdentityAttribute | RelationshipAttribute

    @serialize({ optional: true })
    @validate()
    public parentId?: CoreId

    public static from(
        value: ICreateLocalAttributeParams | CreateLocalAttributeParamsJSON
    ): CreateLocalAttributeParams {
        return this.fromAny(value)
    }
}
