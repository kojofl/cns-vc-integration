import { serialize, type, validate } from "@js-soft/ts-serval"
import {
    IdentityAttributeQuery,
    IdentityAttributeQueryJSON,
    IIdentityAttributeQuery,
    IRelationshipAttributeQuery,
    IThirdPartyRelationshipAttributeQuery,
    RelationshipAttributeQuery,
    RelationshipAttributeQueryJSON,
    ThirdPartyRelationshipAttributeQuery,
    ThirdPartyRelationshipAttributeQueryJSON
} from "../../../attributes"
import { IRequestItem, RequestItem, RequestItemJSON } from "../../RequestItem"

export interface ReadAttributeRequestItemJSON extends RequestItemJSON {
    "@type": "ReadAttributeRequestItem"
    query: IdentityAttributeQueryJSON | RelationshipAttributeQueryJSON | ThirdPartyRelationshipAttributeQueryJSON
}

export interface IReadAttributeRequestItem extends IRequestItem {
    query: IIdentityAttributeQuery | IRelationshipAttributeQuery | IThirdPartyRelationshipAttributeQuery
}

@type("ReadAttributeRequestItem")
export class ReadAttributeRequestItem extends RequestItem implements IReadAttributeRequestItem {
    @serialize({
        unionTypes: [IdentityAttributeQuery, RelationshipAttributeQuery, ThirdPartyRelationshipAttributeQuery]
    })
    @validate()
    public query: IdentityAttributeQuery | RelationshipAttributeQuery | ThirdPartyRelationshipAttributeQuery

    public static from(
        value: IReadAttributeRequestItem | Omit<ReadAttributeRequestItemJSON, "@type">
    ): ReadAttributeRequestItem {
        return this.fromAny(value)
    }
}
