import { Result } from "@js-soft/ts-utils";
import { AccountController, CoreId, Device, DevicesController } from "@nmshd/transport";
import { Inject } from "typescript-ioc";
import { DeviceIdString, RuntimeErrors, SchemaRepository, SchemaValidator, UseCase } from "../../common";

export interface DeleteDeviceRequest {
    id: DeviceIdString;
}

class Validator extends SchemaValidator<DeleteDeviceRequest> {
    public constructor(@Inject schemaRepository: SchemaRepository) {
        super(schemaRepository.getSchema("DeleteDeviceRequest"));
    }
}

export class DeleteDeviceUseCase extends UseCase<DeleteDeviceRequest, void> {
    public constructor(
        @Inject private readonly devicesController: DevicesController,
        @Inject private readonly accountController: AccountController,
        @Inject validator: Validator
    ) {
        super(validator);
    }

    protected async executeInternal(request: DeleteDeviceRequest): Promise<Result<void>> {
        const device = await this.devicesController.get(CoreId.from(request.id));

        if (!device) {
            return Result.fail(RuntimeErrors.general.recordNotFound(Device));
        }

        await this.devicesController.delete(device);
        await this.accountController.syncDatawallet();

        return Result.ok(undefined);
    }
}
