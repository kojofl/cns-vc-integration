sap.ui.define(
    ["nmshd/app/core/App", "nmshd/app/core/_AppController", "sap/ui/core/Fragment"],
    (App, BaseController, Fragment) => {
        "use strict"
        return BaseController.extend("nmshd.app.flows.accounts.OnboardOverview", {
            routeNames: ["accounts.onboardoverview"],
            createViewModel() {
                return {
                    busy: false,
                    delay: 0,
                    submitAvailable: true
                }
            },

            onPopupPress(oEvent) {
                this.navTo(oEvent.getParameter("listItem").data("key"))
            },

            async onInitialized() {},

            async onRouteMatched(oEvent) {
                App.setMenuIcon()
                App.appController.setTitle(this.resource("accounts.create.title"))
                await App.isInitialized()
                const aAccounts = await App.localAccountController().getAccounts()
                if (aAccounts.length >= 1) {
                    App.setMenuIcon()
                }
                await this.super("onRouteMatched")
                App.appController.setTitle(this.resource("accounts.create.title"))

                this.clear()
            },

            clear() {},

            onCreate() {
                this.navTo("accounts.create")
            },

            onNavButtonPress() {
                this.navBack("accounts.select")
            },

            scan() {
                this.navTo("accounts.scan")
            },

            onNoCode() {
                //this.navTo("accounts.onboardnocode")
                this.create()
            },

            async create() {
                try {
                    this.loadInc()
                    this.viewProp("/submitAvailable", false)
                    const accounts = await runtime.accountServices.getAccounts()
                    const accountname =
                        this.resource("accounts.processRelationshipToken.profile") + (accounts.length + 1)
                    const oAccounts = await runtime.accountServices.createAccount(
                        NMSHDTransport.Realm.Prod,
                        accountname
                    )
                    this.localAccount = oAccounts
                    await App.selectAccount(this.localAccount.id, "")
                    this.accountId = this.localAccount.id
                    App.navTo("account.login", "account.home", {
                        accountId: this.accountId
                    })
                } catch (e) {
                    App.error(e)
                } finally {
                    this.loadDec()
                }
            },

            toEULA() {
                App.navTo("", "app.eula")
            },

            toPrivacy() {
                App.navTo("", "app.privacy")
            },

            navBackToCreate() {
                this.navBack("accounts.create")
            }
        })
    }
)
