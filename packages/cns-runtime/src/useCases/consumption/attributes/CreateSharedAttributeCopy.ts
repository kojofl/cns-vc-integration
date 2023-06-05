import { Result } from "@js-soft/ts-utils";
import { AttributesController, CreateSharedLocalAttributeCopyParams } from "@nmshd/consumption";
import { AccountController, CoreAddress, CoreId } from "@nmshd/transport";
import { Inject } from "typescript-ioc";
import { LocalAttributeDTO } from "../../../types";
import { AddressString, AttributeIdString, RequestIdString, SchemaRepository, SchemaValidator, UseCase } from "../../common";
import { AttributeMapper } from "./AttributeMapper";

export interface CreateSharedAttributeCopyRequest {
    attributeId: AttributeIdString;
    peer: AddressString;
    requestReference: RequestIdString;
}

class Validator extends SchemaValidator<CreateSharedAttributeCopyRequest> {
    public constructor(@Inject schemaRepository: SchemaRepository) {
        super(schemaRepository.getSchema("CreateSharedAttributeCopyRequest"));
    }
}

export class CreateSharedAttributeCopyUseCase extends UseCase<CreateSharedAttributeCopyRequest, LocalAttributeDTO> {
    public constructor(
        @Inject private readonly attributeController: AttributesController,
        @Inject private readonly accountController: AccountController,
        @Inject validator: Validator
    ) {
        super(validator);
    }

    protected async executeInternal(request: CreateSharedAttributeCopyRequest): Promise<Result<LocalAttributeDTO>> {
        const params = CreateSharedLocalAttributeCopyParams.from({
            sourceAttributeId: CoreId.from(request.attributeId),
            peer: CoreAddress.from(request.peer),
            requestReference: CoreId.from(request.requestReference)
        });
        const successor = await this.attributeController.createSharedLocalAttributeCopy(params);
        await this.accountController.syncDatawallet();

        return Result.ok(AttributeMapper.toAttributeDTO(successor));
    }
}
