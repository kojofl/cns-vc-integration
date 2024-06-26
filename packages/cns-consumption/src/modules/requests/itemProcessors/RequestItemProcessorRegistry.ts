import { RequestItem } from "@nmshd/content"
import { ConsumptionError } from "../../../consumption"
import { ConsumptionController } from "../../../consumption/ConsumptionController"
import { IRequestItemProcessor } from "./IRequestItemProcessor"
import { ProcessorConstructor } from "./ProcessorConstructor"
import { RequestItemConstructor } from "./RequestItemConstructor"

export class RequestItemProcessorRegistry {
    public constructor(
        private readonly consumptionController: ConsumptionController,
        private readonly processors = new Map<RequestItemConstructor, ProcessorConstructor | undefined>()
    ) {}

    public registerProcessor(
        itemConstructor: RequestItemConstructor,
        processorConstructor: ProcessorConstructor
    ): void {
        if (this.processors.has(itemConstructor)) {
            throw new ConsumptionError(
                `There is already a processor registered for '${itemConstructor.name}''. Use 'replaceProcessorForType' if you want to replace it.`
            )
        }
        this.processors.set(itemConstructor, processorConstructor)
    }

    public registerOrReplaceProcessor(
        itemConstructor: RequestItemConstructor,
        processorConstructor: ProcessorConstructor
    ): void {
        this.processors.set(itemConstructor, processorConstructor)
    }

    public getProcessorForItem(item: RequestItem): IRequestItemProcessor {
        const constructor = this.processors.get(item.constructor as RequestItemConstructor)
        if (!constructor) {
            throw new ConsumptionError(`There was no processor registered for '${item.constructor.name}'.`)
        }
        return new constructor(this.consumptionController)
    }
}
