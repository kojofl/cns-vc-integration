import { Result } from "@js-soft/ts-utils";
import { AttributesController } from "@nmshd/consumption";
import { AccountController, DeviceSecretType } from "@nmshd/transport";
import { Inject } from "typescript-ioc";
import { LocalAttributeDTO } from "../../../types";
import { SchemaRepository, SchemaValidator, UseCase } from "../../common";
import { VerifiableCredentialController } from "@blubi/vc";
import { CoreBuffer } from "@nmshd/crypto";

export interface CreateVerifiableCredentialRequest {
    content: any;
    subjectDid: string;
}

class Validator extends SchemaValidator<CreateVerifiableCredentialRequest> {
    public constructor(@Inject schemaRepository: SchemaRepository) {
        super(schemaRepository.getSchema("CreateVerifiableCredentialRequest"));
    }
}

export class CreateVerifiableCredentialUseCase extends UseCase<CreateVerifiableCredentialRequest, LocalAttributeDTO> {
    public constructor(
        @Inject private readonly attributeController: AttributesController,
        @Inject private readonly accountController: AccountController,
        @Inject validator: Validator
    ) {
        super(validator);
    }

    protected async executeInternal(request: CreateVerifiableCredentialRequest): Promise<Result<any>> {
        const multikeyPublic = `z${CoreBuffer.from([0xed, 0x01]).append(this["accountController"].identity.identity.publicKey.publicKey).toBase58()}`;
        const identityPrivateKey = ((await this["accountController"].activeDevice.secrets.loadSecret(DeviceSecretType.IdentitySignature)) as any)!.secret["privateKey"];
        const multikeyPrivate = `z${CoreBuffer.from([0x80, 0x26]).append(identityPrivateKey).toBase58()}`;

        const credential = buildCredential(request.content, request.subjectDid, multikeyPublic);
        const vc = await VerifiableCredentialController.initialize();

        console.log(credential);

        const signedCredential = await vc.sign(credential, multikeyPublic, multikeyPrivate);

        console.log(signedCredential);

        return Result.ok(signedCredential);
    }
}

function buildCredential(data: any, subjectDid: string, publicKey: string) {
    const now = new Date().toJSON();
    const issuanceDate = `${now.substring(0, now.length - 5)}Z`;
    const credentialSubject = { ...data };
    credentialSubject["id"] = subjectDid;
    return {
        "@context": ["https://www.w3.org/2018/credentials/v1", "https://www.w3.org/2018/credentials/examples/v1"],
        type: ["VerifiableCredential"],
        issuer: `did:key:${publicKey}`,
        issuanceDate,
        credentialSubject
    };
}
