import { ConnectorTUIBaseConstructor } from "../ConnectorTUIBase"

export function AddCreateIdentityAttributes<TBase extends ConnectorTUIBaseConstructor>(Base: TBase) {
    return class Sync extends Base {
        public constructor(...args: any[]) {
            super(...args)
            this.choices.push({ title: "Setup identity attributes", value: this.createAttributes })
        }

        // eslint-disable-next-line @typescript-eslint/require-await
        protected async createAttributes() {
            const attributesResult = await this.connectorClient.attributes.getAttributes({})
            if (attributesResult.isError) {
                console.log("Error retrieving attributes: ", attributesResult.error)
            }
            if (attributesResult.result.length > 0) {
                console.log("The identity is allready set up")
                return
            }
            const idResult = await this.connectorClient.account.getIdentityInfo()
            const id = idResult.result
            const birthDateResult = await this.connectorClient.attributes.createAttribute({
                content: {
                    "@type": "IdentityAttribute",
                    value: {
                        "@type": "BirthDate",
                        day: 23,
                        month: 11,
                        year: 1998,
                    },
                    owner: id.address,
                },
            })
            if (birthDateResult.isError) {
                console.log(birthDateResult.error)
                return
            }
            const givenNameResult = await this.connectorClient.attributes.createAttribute({
                content: {
                    "@type": "IdentityAttribute",
                    value: {
                        "@type": "GivenName",
                        "value": "Flietel"
                    },
                    owner: id.address
                }
            })
            if (givenNameResult.isError) {
                console.log(givenNameResult.error)
                return
            }
        }
    }
}
