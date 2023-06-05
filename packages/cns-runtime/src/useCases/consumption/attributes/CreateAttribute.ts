import { Result } from "@js-soft/ts-utils";
import { AttributesController, CreateLocalAttributeParams } from "@nmshd/consumption";
import { IdentityAttributeJSON, RelationshipAttributeJSON } from "@nmshd/content";
import { AccountController } from "@nmshd/transport";
import { Inject } from "typescript-ioc";
import { LocalAttributeDTO } from "../../../types";
import { SchemaRepository, SchemaValidator, UseCase } from "../../common";
import { AttributeMapper } from "./AttributeMapper";

export interface CreateAttributeRequest {
    content: IdentityAttributeJSON | RelationshipAttributeJSON;
}

class Validator extends SchemaValidator<CreateAttributeRequest> {
    public constructor(@Inject schemaRepository: SchemaRepository) {
        super(schemaRepository.getSchema("CreateAttributeRequest"));
    }
}

export class CreateAttributeUseCase extends UseCase<CreateAttributeRequest, LocalAttributeDTO> {
    public constructor(
        @Inject private readonly attributeController: AttributesController,
        @Inject private readonly accountController: AccountController,
        @Inject validator: Validator
    ) {
        super(validator);
    }

    protected async executeInternal(request: CreateAttributeRequest): Promise<Result<LocalAttributeDTO>> {
        const params = CreateLocalAttributeParams.from({
            content: request.content
        });
        const createdAttribute = await this.attributeController.createLocalAttribute(params);
        await this.accountController.syncDatawallet();

        return Result.ok(AttributeMapper.toAttributeDTO(createdAttribute));
    }
}
