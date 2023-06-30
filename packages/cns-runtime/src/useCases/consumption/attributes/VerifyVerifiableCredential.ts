import { Result } from "@js-soft/ts-utils";
import { AttributesController } from "@nmshd/consumption";
import { AccountController, DeviceSecretType } from "@nmshd/transport";
import { Inject } from "typescript-ioc";
import { LocalAttributeDTO } from "../../../types";
import { SchemaRepository, SchemaValidator, UseCase } from "../../common";
import { VerifiableCredentialController } from "@blubi/vc";
import { CoreBuffer } from "@nmshd/crypto";
import { template } from "lodash";
import { IdentityAttributeJSON, RelationshipAttributeJSON } from "@nmshd/content";

export interface VerifyVerifiableCredentialRequest {
    attribute: IdentityAttributeJSON | RelationshipAttributeJSON;
    issuerValidator: (issuerDid: string) => Promise<boolean>;
}

class Validator extends SchemaValidator<VerifyVerifiableCredentialRequest> {
    public constructor(@Inject schemaRepository: SchemaRepository) {
        super(schemaRepository.getSchema("CreateVerifiableCredentialRequest"));
    }
}

export class VerifyVerifiableCredentialUseCase extends UseCase<VerifyVerifiableCredentialRequest, VerifiableCredentialValidationResult> {
    public constructor(
        @Inject private readonly attributeController: AttributesController,
        @Inject private readonly accountController: AccountController,
        @Inject validator: Validator
    ) {
        super(validator);
    }

    protected async executeInternal(request: VerifyVerifiableCredentialRequest): Promise<Result<VerifiableCredentialValidationResult>> {
        if (!request.attribute.proof) {
            return Result.ok({
                success: false,
                message: "No proof value"
            });
        }

        if (!(request.attribute.proof as any).issuer) {
            return Result.ok({
                success: false,
                message: "No proof value"
            });
        }

        const vc = await VerifiableCredentialController.initialize();

        const validationResult = await vc.verify(request.attribute.proof);

        if (!(await request.issuerValidator((request.attribute.proof as any).issuer))) {
            return Result.ok({
                success: false,
                message: "The issuer is not trusted"
            });
        }

        return Result.ok({
            success: validationResult.result
        });
    }
}

export interface VerifiableCredentialValidationResult {
    success: boolean;
    message?: string;
}
