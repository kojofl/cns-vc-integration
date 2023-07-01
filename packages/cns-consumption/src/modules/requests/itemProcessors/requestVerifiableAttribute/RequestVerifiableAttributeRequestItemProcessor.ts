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
import { CoreAddress, CoreErrors as TransportCoreErrors, CoreId, DeviceSecretType } from "@nmshd/transport"
import { CoreErrors } from "../../../../consumption"
import { LocalAttribute } from "../../../attributes/local/LocalAttribute"
import { GenericRequestItemProcessor } from "../GenericRequestItemProcessor"
import { LocalRequestInfo } from "../IRequestItemProcessor"
import { VerifiableCredentialController } from "@blubi/vc"
import { ValidationResult } from "../ValidationResult"
import {
    AcceptVerifiableAttributeRequestItemParameters,
    AcceptVerifiableAttributeRequestItemParametersJSON
} from "./AcceptVerifiableAttributeRequestItemParameters"
import { CoreBuffer } from "@nmshd/crypto"

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
        _params: AcceptVerifiableAttributeRequestItemParametersJSON,
        requestInfo: LocalRequestInfo
    ): Promise<ValidationResult> {
        return ValidationResult.success()
    }

    public override async accept(
        requestItem: RequestVerifiableAttributeRequestItem,
        _params: AcceptVerifiableAttributeRequestItemParametersJSON,
        requestInfo: LocalRequestInfo
    ): Promise<RequestVerifiableAttributeAcceptResponseItem> {
        const multikeyPublic = `z${CoreBuffer.from([0xed, 0x01])
            .append(this["accountController"].identity.identity.publicKey.publicKey)
            .toBase58()}`
        const identityPrivateKey = ((await this["accountController"].activeDevice.secrets.loadSecret(
            DeviceSecretType.IdentitySignature
        )) as any)!.secret["privateKey"]
        const multikeyPrivate = `z${CoreBuffer.from([0x80, 0x26]).append(identityPrivateKey).toBase58()}`

        const vc = await VerifiableCredentialController.initialize()
        const credential = buildCredential(requestItem.attribute.value, requestItem.did, multikeyPublic)
        const signedCredential = vc.sign(credential, multikeyPublic, multikeyPrivate)
        requestItem.attribute.proof = signedCredential

        return RequestVerifiableAttributeAcceptResponseItem.from({
            result: ResponseItemResult.Accepted,
            attribute: requestItem.attribute
        })
    }
}

function buildCredential(data: any, subjectDid: string, publicKey: string) {
    const now = new Date().toJSON()
    const issuanceDate = `${now.substring(0, now.length - 5)}Z`
    const credentialSubject = { ...data }
    credentialSubject["id"] = subjectDid
    return {
        "@context": ["https://www.w3.org/2018/credentials/v1", "https://www.w3.org/2018/credentials/examples/v1"],
        type: ["VerifiableCredential"],
        issuer: `did:key:${publicKey}`,
        issuanceDate,
        credentialSubject
    }
}
