import { Result } from "@js-soft/ts-utils";
import { CoreId, Device, DevicesController } from "@nmshd/transport";
import { Inject } from "typescript-ioc";
import { DeviceDTO } from "../../../types";
import { DeviceIdString, RuntimeErrors, SchemaRepository, SchemaValidator, UseCase } from "../../common";
import { DeviceMapper } from "./DeviceMapper";

export interface GetDeviceRequest {
    id: DeviceIdString;
}

class Validator extends SchemaValidator<GetDeviceRequest> {
    public constructor(@Inject schemaRepository: SchemaRepository) {
        super(schemaRepository.getSchema("GetDeviceRequest"));
    }
}

export class GetDeviceUseCase extends UseCase<GetDeviceRequest, DeviceDTO> {
    public constructor(@Inject private readonly devicesController: DevicesController, @Inject validator: Validator) {
        super(validator);
    }

    protected async executeInternal(request: GetDeviceRequest): Promise<Result<DeviceDTO>> {
        const device = await this.devicesController.get(CoreId.from(request.id));

        if (!device) {
            return Result.fail(RuntimeErrors.general.recordNotFound(Device));
        }

        return Result.ok(DeviceMapper.toDeviceDTO(device));
    }
}
