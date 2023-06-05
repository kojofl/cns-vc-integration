import { ILogger } from "@js-soft/logging-abstractions"
import { AccountController, CoreDate, Transport, TransportController } from "@nmshd/transport"
import { expect } from "chai"
import { mock } from "ts-mockito"
import { AbstractTest, RequestInterceptor, TestUtil } from "../../testHelpers"

export class AuthenticationTest extends AbstractTest {
    public run(): void {
        const that = this

        describe("AuthenticationTest", function () {
            let transport: Transport
            let oldGetCredentials: Function
            let oldBaseUrl: string
            let oldLogger: ILogger
            let testAccount: AccountController
            let interceptor: RequestInterceptor

            this.timeout(150000)

            function startWrongAuth(controller: TransportController, config: any = {}) {
                const anyC = controller as any
                oldLogger = anyC.client._logger
                anyC.client._logger = mock<ILogger>()
                oldGetCredentials = controller.parent.activeDevice.getCredentials as Function
                controller.parent.activeDevice.getCredentials = async function () {
                    const deviceCredentials = await oldGetCredentials.apply(anyC.parent.activeDevice)
                    const newCredentials = Object.assign({}, deviceCredentials, config)
                    return newCredentials
                }

                if (config.baseUrl) {
                    const authenticatorAsAny = controller.parent.authenticator as any
                    oldBaseUrl = authenticatorAsAny.authClient.requestConfig.baseURL
                    authenticatorAsAny.authClient.requestConfig.baseURL = config.baseUrl
                }
            }

            function stopWrongAuth(controller: TransportController) {
                const anyC = controller as any
                anyC.parent.activeDevice.getCredentials = oldGetCredentials
                if (oldBaseUrl) {
                    ;(controller.parent.authenticator as any).authClient.requestConfig.baseURL = oldBaseUrl
                    oldBaseUrl = ""
                }
                anyC.client._logger = oldLogger
            }

            function setAuthTokenToExpired(controller: AccountController) {
                const anyAuthenticator = controller.authenticator as any
                anyAuthenticator.expiry = CoreDate.utc().subtract({ seconds: 1 })
            }

            before(async function () {
                transport = new Transport(that.connection, that.config, that.eventBus, that.loggerFactory)

                await TestUtil.clearAccounts(that.connection)

                await transport.init()

                const accounts = await TestUtil.provideAccounts(transport, 1)
                testAccount = accounts[0]
                interceptor = new RequestInterceptor((testAccount.authenticator as any).authClient)
            })

            it("should only authenticate once", async function () {
                interceptor.start()
                setAuthTokenToExpired(testAccount)
                // First Request = Auth
                await testAccount.syncEverything()
                await testAccount.syncEverything()
                await testAccount.syncEverything()
                await testAccount.syncEverything()
                const results = interceptor.stop()
                const requests = results.requests
                expect(requests).to.have.lengthOf(1)

                expect(requests[0].method).equals("post")
                expect(requests[0].url).to.match(/^\/connect\/token/)
            }).timeout(60000)

            it("should only authenticate again if token is expired", async function () {
                interceptor.start()
                await testAccount.syncEverything()
                await testAccount.syncEverything()

                setAuthTokenToExpired(testAccount)
                // Third Request => Auth as it is expired now

                await testAccount.syncEverything()
                await testAccount.syncEverything()

                const results = interceptor.stop()
                const requests = results.requests
                expect(requests).to.have.lengthOf(1)

                expect(requests[0].method).equals("post")
                expect(requests[0].url).to.match(/^\/connect\/token/)
            }).timeout(60000)

            it("should throw correct error on authentication issues", async function () {
                setAuthTokenToExpired(testAccount)

                startWrongAuth(testAccount.messages, { password: "thisIsAnIntentionallyWrongPassword" })

                await TestUtil.expectThrowsRequestErrorAsync(
                    testAccount.syncEverything(),
                    "error.transport.request.noAuthGrant",
                    400
                )
                stopWrongAuth(testAccount.messages)
            }).timeout(60000)

            it("should throw correct error on network issues", async function () {
                startWrongAuth(testAccount.messages, { baseUrl: "bad-protocol://localhost/" })
                await TestUtil.expectThrowsRequestErrorAsync(
                    testAccount.syncEverything(),
                    "error.transport.request.noAuthPossible",
                    500
                )
                stopWrongAuth(testAccount.messages)
            }).timeout(60000)

            after(async function () {
                await testAccount.close()
            })
        })
    }
}
