import prompts from "prompts"
import { ConnectorTUIBaseConstructor } from "../ConnectorTUIBase"

export function AddStartRelationship<TBase extends ConnectorTUIBaseConstructor>(Base: TBase) {
  return class SendMail extends Base {
    public constructor(...args: any[]) {
      super(...args)
      this.choices.push({ title: "Start Relationship", value: this.startRelationship })
    }

    protected async startRelationship() {
      const result = await prompts([
        {
          message: "What is the template reference?",
          type: "text",
          name: "templateId",
          initial: "A Subject",
        },
      ])

      const templateResult = await this.connectorClient.relationshipTemplates.loadPeerRelationshipTemplate({ reference: result.templateId })

      if (templateResult.isError) {
        return console.error("Error retrieving the request", templateResult.error)
      }

      const content = {
        templateId: templateResult.result.id,
        content: {},
      }

      const sendRequestResult = await this.connectorClient.relationships.createRelationship(content)
      if (sendRequestResult.isError) {
        return console.error("Error while sending relationship request", sendRequestResult.error)
      }

      console.log(`Relationshiprequest received sent`)
    }
  }
}
