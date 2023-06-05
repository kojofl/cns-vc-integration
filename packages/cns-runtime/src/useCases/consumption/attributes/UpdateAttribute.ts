import { Result } from "@js-soft/ts-utils";
import { AttributesController, UpdateLocalAttributeParams } from "@nmshd/consumption";
import { IdentityAttributeJSON, RelationshipAttributeJSON } from "@nmshd/content";
import { AccountController } from "@nmshd/transport";
import { Inject } from "typescript-ioc";
import { LocalAttributeDTO } from "../../../types";
import { AttributeIdString, SchemaRepository, SchemaValidator, UseCase } from "../../common";
import { AttributeMapper } from "./AttributeMapper";

export interface UpdateAttributeRequest {
    id: AttributeIdString;
    content: IdentityAttributeJSON | RelationshipAttributeJSON;
}

class Validator extends SchemaValidator<UpdateAttributeRequest> {
    public constructor(@Inject schemaRepository: SchemaRepository) {
        super(schemaRepository.getSchema("UpdateAttributeRequest"));
    }
}

export class UpdateAttributeUseCase extends UseCase<UpdateAttributeRequest, LocalAttributeDTO> {
    public constructor(
        @Inject private readonly attributeController: AttributesController,
        @Inject private readonly accountController: AccountController,
        @Inject validator: Validator
    ) {
        super(validator);
    }

    protected async executeInternal(request: UpdateAttributeRequest): Promise<Result<LocalAttributeDTO>> {
        const params = UpdateLocalAttributeParams.from({
            id: request.id,
            content: request.content
        });
        const updated = await this.attributeController.updateLocalAttribute(params);

        await this.accountController.syncDatawallet();

        return Result.ok(AttributeMapper.toAttributeDTO(updated));
    }
}
