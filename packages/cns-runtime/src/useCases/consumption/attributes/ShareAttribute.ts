import { Result } from "@js-soft/ts-utils";
import { AttributesController, LocalAttribute, OutgoingRequestsController } from "@nmshd/consumption";
import { ShareAttributeRequestItem } from "@nmshd/content";
import { AccountController, CoreAddress, CoreId, MessageController } from "@nmshd/transport";
import { Inject } from "typescript-ioc";
import { LocalRequestDTO } from "../../../types";
import { AddressString, AttributeIdString, RuntimeErrors, SchemaRepository, SchemaValidator, UseCase } from "../../common";
import { RequestMapper } from "../requests";

export interface ShareAttributeRequest {
    attributeId: AttributeIdString;
    peer: AddressString;

    requestTitle?: string;
    requestDescription?: string;
    requestMetadata?: any;

    requestItemTitle?: string;
    requestItemDescription?: string;
}

class Validator extends SchemaValidator<ShareAttributeRequest> {
    public constructor(@Inject schemaRepository: SchemaRepository) {
        super(schemaRepository.getSchema("ShareAttributeRequest"));
    }
}

export class ShareAttributeUseCase extends UseCase<ShareAttributeRequest, LocalRequestDTO> {
    public constructor(
        @Inject private readonly attributeController: AttributesController,
        @Inject private readonly accountController: AccountController,
        @Inject private readonly requestsController: OutgoingRequestsController,
        @Inject private readonly messageController: MessageController,
        @Inject validator: Validator
    ) {
        super(validator);
    }

    protected async executeInternal(request: ShareAttributeRequest): Promise<Result<LocalRequestDTO>> {
        const attribute = await this.attributeController.getLocalAttribute(CoreId.from(request.attributeId));
        if (!attribute) return Result.fail(RuntimeErrors.general.recordNotFound(LocalAttribute));

        const peer = CoreAddress.from(request.peer);
        const createRequestParams = {
            peer,
            content: {
                title: request.requestTitle,
                description: request.requestDescription,
                metadata: request.requestMetadata,

                items: [
                    ShareAttributeRequestItem.from({
                        attribute: attribute.content,
                        sourceAttributeId: attribute.id,
                        title: request.requestItemTitle,
                        description: request.requestItemDescription,
                        mustBeAccepted: true
                    })
                ]
            }
        };

        const canCreateRequestResult = await this.requestsController.canCreate(createRequestParams);
        if (canCreateRequestResult.isError()) return Result.fail(canCreateRequestResult.error);

        const localRequest = await this.requestsController.create(createRequestParams);
        await this.messageController.sendMessage({ recipients: [peer], content: localRequest.content });
        await this.accountController.syncDatawallet();

        return Result.ok(RequestMapper.toLocalRequestDTO(localRequest));
    }
}
