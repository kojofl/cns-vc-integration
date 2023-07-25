import { ConnectorTUIBaseConstructor } from "../ConnectorTUIBase"
import { VerifiableCredentialController } from "@blubi/vc"
import chalk from "chalk"

export function AddListIdentityAttributes<TBase extends ConnectorTUIBaseConstructor>(Base: TBase) {
  return class Sync extends Base {
    public constructor(...args: any[]) {
      super(...args)
      this.choices.push({ title: "List Identity Attributes", value: this.listIdentityAttributes })
      this.choices.push({ title: "List Shared Attributes", value: this.listIdentityAttributes.bind(this, true) })
    }

    protected async listIdentityAttributes(showShared = false) {
      const attributesResult = await this.connectorClient.attributes.getAttributes({})
      if (attributesResult.isError) {
        console.log("Error retrieving attributes: ", attributesResult.error)
      }

      const attributes = attributesResult.result

      for (const el of attributes) {
        if (el.content["@type"] !== "IdentityAttribute") {
          continue
        }
        if (el.shareInfo && !showShared) {
          continue
        }
        const type = el.content.value["@type"]
        const value = el.content.value

        const hasProof = (el.content as any).proof !== undefined
        const vc = await VerifiableCredentialController.initialize()
        let validationResult = undefined
        try {
          validationResult = await vc.verify((el.content as any).proof)
        } catch (e) {
          /* empty */
        }
        console.log(type)
        console.log(value)
        if (hasProof) {
          console.log(`Issuer: ${(el.content as any).proof.issuer}`)
          console.log(`Subject: ${(el.content as any).proof.credentialSubject.id}`)
          if (validationResult.verified) {
            console.log(`Validation result: ${chalk.green(validationResult.verified)}`)
          } else {
            console.log(`Validation result: ${chalk.red(validationResult.verified)}`)
          }
        } else {
          console.log("No proof provided")
        }
        console.log("")
      }
    }
  }
}
