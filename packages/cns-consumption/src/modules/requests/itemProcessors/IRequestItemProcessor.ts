import { AcceptResponseItem, RejectResponseItem, Request, RequestItem, ResponseItem } from "@nmshd/content"
import { CoreAddress, CoreId } from "@nmshd/transport"
import { AcceptRequestItemParametersJSON } from "../incoming/decide/AcceptRequestItemParameters"
import { RejectRequestItemParametersJSON } from "../incoming/decide/RejectRequestItemParameters"
import { ValidationResult } from "./ValidationResult"

export interface LocalRequestInfo {
    id: CoreId
    peer: CoreAddress
}

export interface IRequestItemProcessor<
    TRequestItem extends RequestItem = RequestItem,
    TAcceptParams extends AcceptRequestItemParametersJSON = AcceptRequestItemParametersJSON,
    TRejectParams extends RejectRequestItemParametersJSON = RejectRequestItemParametersJSON
> {
    checkPrerequisitesOfIncomingRequestItem(
        requestItem: TRequestItem,
        requestInfo: LocalRequestInfo
    ): Promise<boolean> | boolean
    canAccept(
        requestItem: TRequestItem,
        params: TAcceptParams,
        requestInfo: LocalRequestInfo
    ): Promise<ValidationResult> | ValidationResult
    canReject(
        requestItem: TRequestItem,
        params: TRejectParams,
        requestInfo: LocalRequestInfo
    ): Promise<ValidationResult> | ValidationResult
    accept(
        requestItem: TRequestItem,
        params: TAcceptParams,
        requestInfo: LocalRequestInfo
    ): Promise<AcceptResponseItem> | AcceptResponseItem
    reject(
        requestItem: TRequestItem,
        params: TRejectParams,
        requestInfo: LocalRequestInfo
    ): Promise<RejectResponseItem> | RejectResponseItem

    canCreateOutgoingRequestItem(
        requestItem: TRequestItem,
        request: Request,
        recipient?: CoreAddress
    ): Promise<ValidationResult> | ValidationResult
    canApplyIncomingResponseItem(
        responseItem: ResponseItem,
        requestItem: TRequestItem,
        requestInfo: LocalRequestInfo
    ): Promise<ValidationResult> | ValidationResult
    applyIncomingResponseItem(
        responseItem: ResponseItem,
        requestItem: TRequestItem,
        requestInfo: LocalRequestInfo
    ): Promise<void> | void
}