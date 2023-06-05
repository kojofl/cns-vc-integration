import { RequestItemDVO, RequestItemGroupDVO } from "../content";
import { DraftIdentityAttributeDVO, DraftRelationshipAttributeDVO, IdentityAttributeQueryDVO, ThirdPartyRelationshipAttributeQueryDVO } from "../content/AttributeDVOs";
import { ProcessedAttributeQueryDVO } from "./LocalAttributeDVO";

export interface DecidableRequestItemGroupDVO extends RequestItemGroupDVO {
    type: "RequestItemGroupDVO";
    items: RequestItemDVO[];
    isDecidable: boolean;
}

export interface DecidableRequestItemDVO extends RequestItemDVO {}

export interface DecidableReadAttributeRequestItemDVO extends DecidableRequestItemDVO {
    type: "DecidableReadAttributeRequestItemDVO";
    query: ProcessedAttributeQueryDVO;
}

export interface DecidableProposeAttributeRequestItemDVO extends DecidableRequestItemDVO {
    type: "DecidableProposeAttributeRequestItemDVO";
    query: ProcessedAttributeQueryDVO;
    attribute: DraftIdentityAttributeDVO | DraftRelationshipAttributeDVO;
}

export interface DecidableCreateAttributeRequestItemDVO extends DecidableRequestItemDVO {
    type: "DecidableCreateAttributeRequestItemDVO";
    attribute: DraftIdentityAttributeDVO | DraftRelationshipAttributeDVO;
}

export interface DecidableShareAttributeRequestItemDVO extends DecidableRequestItemDVO {
    type: "DecidableShareAttributeRequestItemDVO";
    sourceAttributeId: string;
    attribute: DraftIdentityAttributeDVO;
}

export interface DecidableAuthenticationRequestItemDVO extends DecidableRequestItemDVO {
    type: "DecidableAuthenticationRequestItemDVO";
}

export interface DecidableConsentRequestItemDVO extends DecidableRequestItemDVO {
    type: "DecidableConsentRequestItemDVO";
    consent: string;
    link?: string;
}

export interface DecidableRegisterAttributeListenerRequestItemDVO extends DecidableRequestItemDVO {
    type: "DecidableRegisterAttributeListenerRequestItemDVO";
    query: IdentityAttributeQueryDVO | ThirdPartyRelationshipAttributeQueryDVO;
}
