import {
    AuthenticationRequestItem,
    ConsentRequestItem,
    CreateAttributeRequestItem,
    ProposeAttributeRequestItem,
    ReadAttributeRequestItem,
    RegisterAttributeListenerRequestItem,
    ShareAttributeRequestItem
} from "@nmshd/content"
import { AccountController, Transport } from "@nmshd/transport"
import {
    AttributeListenersController,
    AttributesController,
    CreateAttributeRequestItemProcessor,
    DraftsController,
    GenericRequestItemProcessor,
    IncomingRequestsController,
    OutgoingRequestsController,
    ProcessorConstructor,
    ProposeAttributeRequestItemProcessor,
    ReadAttributeRequestItemProcessor,
    RegisterAttributeListenerRequestItemProcessor,
    RequestItemConstructor,
    RequestItemProcessorRegistry,
    SettingsController,
    ShareAttributeRequestItemProcessor
} from "../modules"

export class ConsumptionController {
    public constructor(public readonly transport: Transport, public readonly accountController: AccountController) {}

    private _attributes: AttributesController
    public get attributes(): AttributesController {
        return this._attributes
    }

    private _drafts: DraftsController
    public get drafts(): DraftsController {
        return this._drafts
    }

    private _outgoingRequests: OutgoingRequestsController
    public get outgoingRequests(): OutgoingRequestsController {
        return this._outgoingRequests
    }

    private _incomingRequests: IncomingRequestsController
    public get incomingRequests(): IncomingRequestsController {
        return this._incomingRequests
    }

    private _settings: SettingsController
    public get settings(): SettingsController {
        return this._settings
    }

    private _attributeListeners: AttributeListenersController
    public get attributeListeners(): AttributeListenersController {
        return this._attributeListeners
    }

    public async init(
        requestItemProcessorOverrides = new Map<RequestItemConstructor, ProcessorConstructor>()
    ): Promise<ConsumptionController> {
        this._attributes = await new AttributesController(
            this,
            this.transport.eventBus,
            this.accountController.identity
        ).init()
        this._drafts = await new DraftsController(this).init()

        const processorRegistry = new RequestItemProcessorRegistry(this, this.getDefaultProcessors())

        for (const [itemConstructor, processorConstructor] of requestItemProcessorOverrides) {
            processorRegistry.registerOrReplaceProcessor(itemConstructor, processorConstructor)
        }

        this._outgoingRequests = await new OutgoingRequestsController(
            await this.accountController.getSynchronizedCollection("Requests"),
            processorRegistry,
            this,
            this.transport.eventBus,
            this.accountController.identity,
            this.accountController.relationships
        ).init()
        this._incomingRequests = await new IncomingRequestsController(
            await this.accountController.getSynchronizedCollection("Requests"),
            processorRegistry,
            this,
            this.transport.eventBus,
            this.accountController.identity
        ).init()
        this._settings = await new SettingsController(this).init()
        this._attributeListeners = await new AttributeListenersController(
            this,
            this.transport.eventBus,
            this.accountController.identity
        ).init()
        return this
    }

    private getDefaultProcessors() {
        return new Map<RequestItemConstructor, ProcessorConstructor>([
            [ShareAttributeRequestItem, ShareAttributeRequestItemProcessor],
            [CreateAttributeRequestItem, CreateAttributeRequestItemProcessor],
            [ReadAttributeRequestItem, ReadAttributeRequestItemProcessor],
            [ProposeAttributeRequestItem, ProposeAttributeRequestItemProcessor],
            [ConsentRequestItem, GenericRequestItemProcessor],
            [AuthenticationRequestItem, GenericRequestItemProcessor],
            [RegisterAttributeListenerRequestItem, RegisterAttributeListenerRequestItemProcessor]
        ])
    }
}
