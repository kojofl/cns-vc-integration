import { Result } from "@js-soft/ts-utils";
import { CoreId, RelationshipTemplate, RelationshipTemplateController } from "@nmshd/transport";
import { Inject } from "typescript-ioc";
import { QRCode, RelationshipTemplateIdString, RuntimeErrors, SchemaRepository, SchemaValidator, UseCase } from "../../common";

export interface CreateQrCodeForOwnTemplateRequest {
    templateId: RelationshipTemplateIdString;
}

class Validator extends SchemaValidator<CreateQrCodeForOwnTemplateRequest> {
    public constructor(@Inject schemaRepository: SchemaRepository) {
        super(schemaRepository.getSchema("CreateQrCodeForOwnTemplateRequest"));
    }
}

export interface CreateQrCodeForOwnTemplateResponse {
    qrCodeBytes: string;
}

export class CreateQrCodeForOwnTemplateUseCase extends UseCase<CreateQrCodeForOwnTemplateRequest, CreateQrCodeForOwnTemplateResponse> {
    public constructor(
        @Inject private readonly templateController: RelationshipTemplateController,
        @Inject validator: Validator
    ) {
        super(validator);
    }

    protected async executeInternal(request: CreateQrCodeForOwnTemplateRequest): Promise<Result<CreateQrCodeForOwnTemplateResponse>> {
        const template = await this.templateController.getRelationshipTemplate(CoreId.from(request.templateId));

        if (!template) {
            return Result.fail(RuntimeErrors.general.recordNotFound(RelationshipTemplate));
        }

        if (!template.isOwn) {
            return Result.fail(RuntimeErrors.relationshipTemplates.cannotCreateQRCodeForPeerTemplate());
        }

        const qrCode = await QRCode.forTruncateable(template);
        return Result.ok({ qrCodeBytes: qrCode.asBase64() });
    }
}
