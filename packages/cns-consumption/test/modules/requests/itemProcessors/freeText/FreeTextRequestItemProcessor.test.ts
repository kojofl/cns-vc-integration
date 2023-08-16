import { ConsumptionController, FreeTextRequestItemProcessor } from "@nmshd/consumption"
import { FreeTextRequestItem } from "@nmshd/content"
import { Transport } from "@nmshd/transport"
import { expect } from "chai"
import { IntegrationTest } from "../../../../core/IntegrationTest"
import { TestUtil } from "../../../../core/TestUtil"

export class FreeTextRequestItemProcessorTest extends IntegrationTest {
    public run(): void {
        const that = this

        describe("FreeTextRequestItemProcessor", function () {
            const transport = new Transport(that.connection, that.config, that.eventBus, that.loggerFactory)

            let consumptionController: ConsumptionController

            let processor: FreeTextRequestItemProcessor

            this.timeout(150000)

            before(async function () {
                await TestUtil.clearAccounts(that.connection)

                await transport.init()

                const account = (await TestUtil.provideAccounts(transport, 1))[0]
                ;({ consumptionController } = account)

                processor = new FreeTextRequestItemProcessor(consumptionController)
            })

            afterEach(async function () {
                const listeners = await consumptionController.attributeListeners.getAttributeListeners()

                for (const listener of listeners) {
                    await consumptionController.attributeListeners["attributeListeners"].delete(listener)
                }
            })

            describe("canAccept", function () {
                it("returns success when called with valid params", function () {
                    const requestItem = FreeTextRequestItem.from({
                        mustBeAccepted: true,
                        freeText: "Dies ist ein TestRequest"
                    })

                    const result = processor.canAccept(requestItem, {
                        accept: true,
                        freeText: "Dies ist ein TestResponse"
                    })

                    expect(result).to.be.a.successfulValidationResult()
                })

                it("returns an error when called with invalid params", function () {
                    const requestItem = FreeTextRequestItem.from({
                        mustBeAccepted: true,
                        freeText: "Dies ist ein TestRequest"
                    })

                    const result = processor.canAccept(requestItem, {
                        accept: true,
                        freeText: {} as string
                    })

                    expect(result).to.be.an.errorValidationResult()
                })
            })

            describe("accept", function () {
                it("creates a FreeTextAcceptResponseItem when called with valid params", function () {
                    const requestItem = FreeTextRequestItem.from({
                        mustBeAccepted: true,
                        freeText: "Dies ist ein TestRequest"
                    })

                    const result = processor.accept(requestItem, {
                        accept: true,
                        freeText: "Dies ist ein TestResponse"
                    })

                    expect(result.freeText).to.equal("Dies ist ein TestResponse")
                })
            })
        })
    }
}
