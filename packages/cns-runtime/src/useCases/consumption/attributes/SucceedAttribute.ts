import { Result } from "@js-soft/ts-utils";
import { AttributesController, SucceedLocalAttributeParams } from "@nmshd/consumption";
import { IdentityAttributeJSON, RelationshipAttributeJSON } from "@nmshd/content";
import { AccountController } from "@nmshd/transport";
import { Inject } from "typescript-ioc";
import { LocalAttributeDTO } from "../../../types";
import { AttributeIdString, SchemaRepository, SchemaValidator, UseCase } from "../../common";
import { AttributeMapper } from "./AttributeMapper";

export interface SucceedAttributeRequest {
    successorContent: IdentityAttributeJSON | RelationshipAttributeJSON;
    succeeds: AttributeIdString;
}

class Validator extends SchemaValidator<SucceedAttributeRequest> {
    public constructor(@Inject schemaRepository: SchemaRepository) {
        super(schemaRepository.getSchema("SucceedAttributeRequest"));
    }
}
export class SucceedAttributeUseCase extends UseCase<SucceedAttributeRequest, LocalAttributeDTO> {
    public constructor(
        @Inject private readonly attributeController: AttributesController,
        @Inject private readonly accountController: AccountController,
        @Inject validator: Validator
    ) {
        super(validator);
    }

    protected async executeInternal(request: SucceedAttributeRequest): Promise<Result<LocalAttributeDTO>> {
        const params = SucceedLocalAttributeParams.from({
            successorContent: request.successorContent,
            succeeds: request.succeeds
        });
        const successor = await this.attributeController.succeedLocalAttribute(params);

        await this.accountController.syncDatawallet();

        return Result.ok(AttributeMapper.toAttributeDTO(successor));
    }
}
