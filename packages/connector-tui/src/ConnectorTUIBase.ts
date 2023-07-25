import { ConnectorClient, ConnectorFile, ConnectorRelationship, ConnectorRelationshipStatus } from "@nmshd/connector-sdk"
import prompts from "prompts"

export type ConnectorTUIBaseConstructor = new (...args: any[]) => ConnectorTUIBase

export interface ConnectorTUIChoice extends prompts.Choice {
  value(): Promise<void>
}

export class ConnectorTUIBase {
  protected choices: ConnectorTUIChoice[] = []

  public constructor(protected connectorClient: ConnectorClient, protected connectorAddress: string, protected did: string) {}

  protected async selectRelationship(prompt: string, status: ConnectorRelationshipStatus = ConnectorRelationshipStatus.ACTIVE): Promise<ConnectorRelationship | undefined> {
    const choices = await this.getRelationshipChoices(status, true)
    if (!choices) return

    const recipientsResult = await prompts({ message: prompt, type: "select", name: "recipient", choices })

    return recipientsResult.recipient as ConnectorRelationship | undefined
  }

  protected async selectRelationships(prompt: string, status: ConnectorRelationshipStatus = ConnectorRelationshipStatus.ACTIVE): Promise<string[] | undefined> {
    const choices = await this.getRelationshipChoices(status, false)
    if (!choices) return

    const recipientsResult = await prompts({ message: prompt, type: "multiselect", name: "recipients", choices })

    const recipients = recipientsResult.recipients as string[] | undefined
    if (!recipients || recipients.length === 0) {
      console.log("No recipients selected")
      return
    }

    return recipients
  }

  protected async selectAttributes(prompt: string): Promise<string | undefined> {
    const choices = await this.getAttributeChoices()
    if (!choices) return

    const recipientsResult = await prompts({ message: prompt, type: "select", name: "attributes", choices })

    const attribute = recipientsResult.attributes as string | undefined
    if (!attribute || attribute.length === 0) {
      console.log("No attributes selected")
      return
    }

    return attribute
  }

  protected async selectVerifiableAttribute(prompt: string): Promise<string | undefined> {
    const choices = await this.getVerifiableAttributeChoices()
    if (!choices) return

    const recipientsResult = await prompts({ message: prompt, type: "select", name: "attributes", choices })

    const attribute = recipientsResult.attributes as string | undefined
    if (!attribute || attribute.length === 0) {
      console.log("No attributes selected")
      return
    }

    return attribute
  }

  private async getAttributeChoices() {
    const attributesResult = await this.connectorClient.attributes.getAttributes({})
    if (attributesResult.isError) {
      console.error(attributesResult.error)
      return
    }
    const attributes = attributesResult.result
    const filteredAttributes = attributes.filter((attr) => attr.content["@type"] === "IdentityAttribute" && (attr.content as any).proof === undefined && !attr.shareInfo)
    if (attributes.length === 0) {
      console.log("No attributes found")
      return
    }
    const choices = filteredAttributes.map((attr) => {
      return {
        title: attr.content.value["@type"],
        value: attr.id,
      }
    })

    return choices
  }

  private async getVerifiableAttributeChoices() {
    const attributesResult = await this.connectorClient.attributes.getAttributes({})
    if (attributesResult.isError) {
      console.error(attributesResult.error)
      return
    }
    const attributes = attributesResult.result
    const filteredAttributes = attributes.filter((attr) => attr.content["@type"] === "IdentityAttribute" && (attr.content as any).proof !== undefined && !attr.shareInfo)
    if (attributes.length === 0) {
      console.log("No attributes found")
      return
    }
    const choices = filteredAttributes.map((attr) => {
      return {
        title: attr.content.value["@type"],
        value: attr.id,
      }
    })

    return choices
  }

  private async getRelationshipChoices(status: ConnectorRelationshipStatus, returnRelationship: boolean) {
    const relationshipsResult = await this.connectorClient.relationships.getRelationships({ status })
    if (relationshipsResult.isError) {
      console.error(relationshipsResult.error)
      return
    }
    const relationships = relationshipsResult.result
    if (relationships.length === 0) {
      console.log(`No relationships with status '${status}' found`)
      return
    }

    const choices = await Promise.all(relationships.map((relationship) => this.renderRelationship(relationship, returnRelationship)))
    return choices
  }

  private async renderRelationship(relationship: ConnectorRelationship, returnRelationship: boolean): Promise<prompts.Choice> {
    const value = returnRelationship ? relationship : relationship.peer
    const response = await this.connectorClient.relationships.getAttributesForRelationship(relationship.id)
    const relationshipAttributes = response.result.filter((a) => a.content.owner === relationship.peer)

    const displayName = relationshipAttributes.find((a) => a.content.value["@type"] === "DisplayName")
    if (displayName) {
      return { title: `${relationship.peer} (${displayName.content.value.value})`, value }
    }

    const surname = relationshipAttributes.find((a) => a.content.value["@type"] === "Surname")
    const givenName = relationshipAttributes.find((a) => a.content.value["@type"] === "GivenName")
    if (surname || givenName) {
      const name = `${surname?.content.value.value || ""} ${givenName?.content.value.value || ""}`.trim()
      return {
        title: `${relationship.peer} (${name})`,
        value,
      }
    }

    return { title: relationship.peer, value }
  }

  protected async selectFile(prompt: string): Promise<ConnectorFile | undefined> {
    const choices = await this.getFileChoices()
    if (!choices) return

    const result = await prompts({ message: prompt, type: "select", name: "file", choices: choices })
    return result.file as ConnectorFile | undefined
  }

  protected async selectFiles(prompt: string): Promise<ConnectorFile[] | undefined> {
    const choices = await this.getFileChoices()
    if (!choices) return

    const result = await prompts({ message: prompt, type: "multiselect", name: "files", choices: choices })
    return result.files as ConnectorFile[] | undefined
  }

  private async getFileChoices(): Promise<prompts.Choice[] | undefined> {
    const files = (await this.connectorClient.files.getFiles()).result
    if (files.length === 0) {
      console.log("No files found")
      return
    }

    return files.map((f) => this.renderFile(f))
  }

  private renderFile(file: ConnectorFile): prompts.Choice {
    return { title: file.title, value: file }
  }
}
