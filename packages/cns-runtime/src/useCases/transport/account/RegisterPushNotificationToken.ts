import { Result } from "@js-soft/ts-utils";
import { AccountController } from "@nmshd/transport";
import { Inject } from "typescript-ioc";
import { SchemaRepository, SchemaValidator, UseCase } from "../../common";

export interface RegisterPushNotificationTokenRequest {
    handle: string;
    installationId: string;
    platform: string;
}

class Validator extends SchemaValidator<RegisterPushNotificationTokenRequest> {
    public constructor(@Inject schemaRepository: SchemaRepository) {
        super(schemaRepository.getSchema("RegisterPushNotificationTokenRequest"));
    }
}

export class RegisterPushNotificationTokenUseCase extends UseCase<RegisterPushNotificationTokenRequest, void> {
    public constructor(@Inject private readonly accountController: AccountController, @Inject validator: Validator) {
        super(validator);
    }

    protected async executeInternal(request: RegisterPushNotificationTokenRequest): Promise<Result<void>> {
        await this.accountController.registerPushNotificationToken({
            handle: request.handle,
            installationId: request.installationId,
            platform: request.platform
        });

        return Result.ok(undefined);
    }
}
