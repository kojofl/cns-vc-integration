import { type } from "@js-soft/ts-serval"
import {
    CreateAttributeAcceptResponseItem,
    CreateAttributeAcceptResponseItemJSON,
    FreeTextAcceptResponseItem,
    FreeTextAcceptResponseItemJSON,
    ICreateAttributeAcceptResponseItem,
    IFreeTextAcceptResponseItem,
    IProposeAttributeAcceptResponseItem,
    IReadAttributeAcceptResponseItem,
    IRegisterAttributeListenerAcceptResponseItem,
    IShareAttributeAcceptResponseItem,
    ISucceedAttributeAcceptResponseItem,
    ProposeAttributeAcceptResponseItem,
    ProposeAttributeAcceptResponseItemJSON,
    ReadAttributeAcceptResponseItem,
    ReadAttributeAcceptResponseItemJSON,
    RegisterAttributeListenerAcceptResponseItem,
    RegisterAttributeListenerAcceptResponseItemJSON,
    ShareAttributeAcceptResponseItem,
    ShareAttributeAcceptResponseItemJSON,
    SucceedAttributeAcceptResponseItem,
    SucceedAttributeAcceptResponseItemJSON
} from "../items"
import { IResponseItem, ResponseItem, ResponseItemJSON } from "./ResponseItem"
import { ResponseItemResult } from "./ResponseItemResult"

export interface AcceptResponseItemJSON extends ResponseItemJSON {
    result: ResponseItemResult.Accepted
}

export type AcceptResponseItemJSONDerivations =
    | AcceptResponseItemJSON
    | CreateAttributeAcceptResponseItemJSON
    | ShareAttributeAcceptResponseItemJSON
    | ProposeAttributeAcceptResponseItemJSON
    | ReadAttributeAcceptResponseItemJSON
    | RegisterAttributeListenerAcceptResponseItemJSON
    | SucceedAttributeAcceptResponseItemJSON
    | FreeTextAcceptResponseItemJSON

export interface IAcceptResponseItem extends IResponseItem {
    result: ResponseItemResult.Accepted
}

export type IAcceptResponseItemDerivations =
    | IAcceptResponseItem
    | ICreateAttributeAcceptResponseItem
    | IShareAttributeAcceptResponseItem
    | IProposeAttributeAcceptResponseItem
    | IReadAttributeAcceptResponseItem
    | IRegisterAttributeListenerAcceptResponseItem
    | ISucceedAttributeAcceptResponseItem
    | IFreeTextAcceptResponseItem

@type("AcceptResponseItem")
export class AcceptResponseItem extends ResponseItem implements IAcceptResponseItem {
    public override result: ResponseItemResult.Accepted

    public static from(value: IAcceptResponseItem | Omit<AcceptResponseItemJSON, "@type">): AcceptResponseItem {
        return this.fromAny(value)
    }

    public override toJSON(
        verbose?: boolean | undefined,
        serializeAsString?: boolean | undefined
    ): AcceptResponseItemJSON {
        return super.toJSON(verbose, serializeAsString) as AcceptResponseItemJSON
    }
}

export type AcceptResponseItemDerivations =
    | AcceptResponseItem
    | CreateAttributeAcceptResponseItem
    | ShareAttributeAcceptResponseItem
    | ProposeAttributeAcceptResponseItem
    | ReadAttributeAcceptResponseItem
    | RegisterAttributeListenerAcceptResponseItem
    | SucceedAttributeAcceptResponseItem
    | FreeTextAcceptResponseItem
