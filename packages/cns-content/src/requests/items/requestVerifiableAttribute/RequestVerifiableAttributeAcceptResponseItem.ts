import { serialize, type, validate } from "@js-soft/ts-serval"
import {
    IdentityAttribute,
    IdentityAttributeJSON,
    IIdentityAttribute,
    IRelationshipAttribute,
    RelationshipAttribute,
    RelationshipAttributeJSON
} from "../../../attributes"
import { AcceptResponseItem, AcceptResponseItemJSON, IAcceptResponseItem } from "../../response"

export interface RequestVerifiableAttributeAcceptResponseItemJSON extends AcceptResponseItemJSON {
    "@type": "RequestVerifiableAttributeAcceptResponseItem"
    attribute: IdentityAttributeJSON | RelationshipAttributeJSON
}

export interface IRequestVerifiableAttributeAcceptResponseItem extends IAcceptResponseItem {
    attribute: IIdentityAttribute | IRelationshipAttribute
}

@type("ProposeAttributeAcceptResponseItem")
export class RequestVerifiableAttributeAcceptResponseItem
    extends AcceptResponseItem
    implements IRequestVerifiableAttributeAcceptResponseItem
{

    @serialize({ unionTypes: [IdentityAttribute, RelationshipAttribute] })
    @validate()
    public attribute: IdentityAttribute | RelationshipAttribute

    public static override from(
        value: IRequestVerifiableAttributeAcceptResponseItem | RequestVerifiableAttributeAcceptResponseItemJSON
    ): RequestVerifiableAttributeAcceptResponseItem {
        return this.fromAny(value)
    }

    public override toJSON(
        verbose?: boolean | undefined,
        serializeAsString?: boolean | undefined
    ): RequestVerifiableAttributeAcceptResponseItemJSON {
        return super.toJSON(verbose, serializeAsString) as RequestVerifiableAttributeAcceptResponseItemJSON
    }
}
