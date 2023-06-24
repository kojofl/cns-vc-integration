import {
    IdentityAttribute,
    RequestVerifiableAttributeAcceptResponseItem,
    RequestVerifiableAttributeRequestItem,
    RejectResponseItem,
    RelationshipAttribute,
    RelationshipAttributeQuery,
    Request,
    ResponseItemResult
} from "@nmshd/content"
import { CoreAddress, CoreErrors as TransportCoreErrors, CoreId } from "@nmshd/transport"
import { CoreErrors } from "../../../../consumption"
import { LocalAttribute } from "../../../attributes/local/LocalAttribute"
import { GenericRequestItemProcessor } from "../GenericRequestItemProcessor"
import { LocalRequestInfo } from "../IRequestItemProcessor"
import validateQuery from "../utility/validateQuery"
import { ValidationResult } from "../ValidationResult"
import {
    AcceptVerifiableAttributeRequestItemParameters,
    AcceptVerifiableAttributeRequestItemParametersJSON
} from "./AcceptVerifiableAttributeRequestItemParameters"

export class RequestVerifiableAttributeRequestItemProcessor extends GenericRequestItemProcessor<
    RequestVerifiableAttributeRequestItem,
    AcceptVerifiableAttributeRequestItemParametersJSON
> {
    public override canCreateOutgoingRequestItem(
        requestItem: RequestVerifiableAttributeRequestItem,
        _request: Request,
        recipient?: CoreAddress
    ): ValidationResult {
        const attributeValidationResult = this.validateAttribute(requestItem.attribute)
        if (attributeValidationResult.isError()) {
            return attributeValidationResult
        }

        return ValidationResult.success()
    }

    private validateAttribute(attribute: IdentityAttribute | RelationshipAttribute) {
        if (attribute.owner === this.currentIdentityAddress) {
            return ValidationResult.error(
                CoreErrors.requests.invalidRequestItem("The owner has to be the requesting party.")
            )
        }

        return ValidationResult.success()
    }

    public override async canAccept(
        _requestItem: RequestVerifiableAttributeRequestItem,
        params: AcceptVerifiableAttributeRequestItemParametersJSON,
        requestInfo: LocalRequestInfo
    ): Promise<ValidationResult> {
        const parsedParams: AcceptVerifiableAttributeRequestItemParameters =
            AcceptVerifiableAttributeRequestItemParameters.from(params)

        let attribute = parsedParams.attribute

        const ownerIsEmpty = attribute!.owner.equals("")
        const ownerIsCurrentIdentity = attribute!.owner.equals(this.currentIdentityAddress)
        if (!ownerIsEmpty && !ownerIsCurrentIdentity) {
            return ValidationResult.error(
                CoreErrors.requests.invalidRequestItem(
                    "The given Attribute belongs to someone else. You can only share own Attributes."
                )
            )
        }

        if (!attribute.proof) {
            return ValidationResult.error(CoreErrors.requests.invalidRequestItem("The attribute has to be verifiable."))
        }

        return ValidationResult.success()
    }

    public override async accept(
        _requestItem: RequestVerifiableAttributeRequestItem,
        params: AcceptVerifiableAttributeRequestItemParametersJSON,
        requestInfo: LocalRequestInfo
    ): Promise<RequestVerifiableAttributeAcceptResponseItem> {
        const parsedParams: AcceptVerifiableAttributeRequestItemParameters =
            AcceptVerifiableAttributeRequestItemParameters.from(params)

        return RequestVerifiableAttributeAcceptResponseItem.from({
            result: ResponseItemResult.Accepted,
            attribute: parsedParams.attribute
        })
    }
}
