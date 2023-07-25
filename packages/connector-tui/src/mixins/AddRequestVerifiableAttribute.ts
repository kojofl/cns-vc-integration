import { ConnectorTUIBaseConstructor } from "../ConnectorTUIBase"
import { RequestVerifiableAttributeRequestItem, ShareAttributeRequestItem } from "@nmshd/content"
import axios from "axios"

export function AddRequestVerifiableAttribute<TBase extends ConnectorTUIBaseConstructor>(Base: TBase) {
  return class Sync extends Base {
    public constructor(...args: any[]) {
      super(...args)
      this.choices.push({ title: "Request Verifiable Attribute", value: this.requestVerifiableAttribute })
    }

    protected async requestVerifiableAttribute() {
      const recipients = await this.selectRelationships("Which recipient(s) do you want to send the message to?")
      if (!recipients) return
      const attribute = await this.selectAttributes("Which attribute do you want to have verified?")
      if (!attribute) return
      const id = await this.connectorClient.account.getIdentityInfo()

      const result = await this.connectorClient.attributes.getAttribute(attribute)

      if (result.isError) {
        console.log(result.error)
        return
      }

      const params = {
        content: {
          items: [
            RequestVerifiableAttributeRequestItem.from({
              attribute: result.result.content as any,
              did: this.did,
              mustBeAccepted: true,
            }),
          ],
        },
        peer: recipients[0],
      }
      const response = await this.connectorClient.outgoingRequests.createRequest(params as any)

      if (response.isError) {
        console.log(response.error)
      }

      const messageResponse = await this.connectorClient.messages.sendMessage({
        recipients: [recipients[0]],
        content: response.result.content,
      })

      if (messageResponse.isError) {
        return console.error("Error while sending message", messageResponse.error)
      }

      console.log("The following Request was sent:", JSON.stringify(response.result.content, null, 2))

      console.log(`Request sent to '${recipients[0]}'`)
      return
    }
  }
}
