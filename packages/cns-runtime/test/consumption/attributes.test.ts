import { LocalRequestStatus } from "@nmshd/consumption";
import { CityJSON, CountryJSON, HouseNumberJSON, RelationshipAttributeConfidentiality, StreetJSON, ZipCodeJSON } from "@nmshd/content";
import { CoreDate } from "@nmshd/transport";
import assert from "assert";
import { DateTime } from "luxon";
import {
    AttributeCreatedEvent,
    CreateAttributeRequest,
    CreateSharedAttributeCopyRequest,
    IncomingRequestReceivedEvent,
    IncomingRequestStatusChangedEvent,
    OutgoingRequestStatusChangedEvent,
    SucceedAttributeRequest,
    UpdateAttributeRequest
} from "../../src";
import { ensureActiveRelationship, exchangeAndAcceptRequestByMessage, RuntimeServiceProvider, syncUntilHasMessages, TestRuntimeServices } from "../lib";

const runtimeServiceProvider = new RuntimeServiceProvider();

let sender: TestRuntimeServices;
let recipient: TestRuntimeServices;

beforeAll(async () => {
    const runtimeServices = await runtimeServiceProvider.launch(2, { enableRequestModule: true });

    sender = runtimeServices[0];
    recipient = runtimeServices[1];

    await ensureActiveRelationship(sender.transport, recipient.transport);
}, 30000);
afterAll(async () => await runtimeServiceProvider.stop());

beforeEach(() => {
    sender.eventBus.reset();
    recipient.eventBus.reset();
});

describe("Attributes", () => {
    beforeEach(async function () {
        await sender.consumption.attributes.createAttribute({
            content: {
                "@type": "IdentityAttribute",
                value: {
                    "@type": "Surname",
                    value: "ASurname"
                },
                owner: sender.address
            }
        });

        await sender.consumption.attributes.createAttribute({
            content: {
                "@type": "IdentityAttribute",
                value: {
                    "@type": "GivenName",
                    value: "AGivenName"
                },
                owner: sender.address
            }
        });
    });

    afterEach(async function () {
        const senderAttributesResult = await sender.consumption.attributes.getAttributes({});
        for (const attribute of senderAttributesResult.value) {
            const result = await sender.consumption.attributes.deleteAttribute({ id: attribute.id });
            assert(result.isSuccess);
        }

        const recipientAttributesResult = await recipient.consumption.attributes.getAttributes({});
        for (const attribute of recipientAttributesResult.value) {
            const result = await recipient.consumption.attributes.deleteAttribute({ id: attribute.id });
            assert(result.isSuccess);
        }
    });

    test("should delete attributes", async () => {
        const attributesBeforeDelete = await sender.consumption.attributes.getAttributes({ query: {} });
        expect(attributesBeforeDelete.value).toHaveLength(2);
        await sender.consumption.attributes.deleteAttribute({ id: attributesBeforeDelete.value[0].id });
        const attributesAfterDelete = await sender.consumption.attributes.getAttributes({ query: {} });
        expect(attributesAfterDelete.value).toHaveLength(1);
    });

    test("should list all attributes with empty query", async () => {
        const attributes = await sender.consumption.attributes.getAttributes({ query: {} });
        expect(attributes.value).toHaveLength(2);
    });

    test("should hide technical attributes when hideTechnical=true", async () => {
        await sender.consumption.attributes.createAttribute({
            content: {
                "@type": "RelationshipAttribute",
                key: "a key",
                confidentiality: RelationshipAttributeConfidentiality.Public,
                value: {
                    "@type": "ProprietaryString",
                    value: "a String",
                    title: "a title"
                },
                owner: sender.address,
                isTechnical: true
            }
        });
        const attributes = await sender.consumption.attributes.getAttributes({ query: {}, hideTechnical: true });
        expect(attributes.value).toHaveLength(2);
    });

    test("should return technical attributes when hideTechnical=false", async () => {
        await sender.consumption.attributes.createAttribute({
            content: {
                "@type": "RelationshipAttribute",
                key: "a key",
                confidentiality: RelationshipAttributeConfidentiality.Public,
                value: {
                    "@type": "ProprietaryString",
                    value: "a String",
                    title: "a title"
                },
                owner: sender.address,
                isTechnical: true
            }
        });
        const attributes = await sender.consumption.attributes.getAttributes({ query: {}, hideTechnical: false });
        expect(attributes.value).toHaveLength(3);
    });

    test("should create new attributes", async function () {
        const attributesBeforeCreate = await sender.consumption.attributes.getAttributes({});
        const nrAttributesBeforeCreate = attributesBeforeCreate.value.length;

        const timestamp = DateTime.utc().toString();
        const creationParams: CreateAttributeRequest = {
            content: {
                "@type": "IdentityAttribute",
                value: { "@type": "DisplayName", value: "ADisplayName" },
                owner: sender.address
            }
        };

        const createAttributeResult = await sender.consumption.attributes.createAttribute(creationParams);
        expect(createAttributeResult).toBeSuccessful();
        const attribute = createAttributeResult.value;
        expect(attribute.createdAt.substring(0, 10)).toStrictEqual(timestamp.substring(0, 10));
        expect(attribute.content).toMatchObject(creationParams.content);

        const attributesAfterCreate = (await sender.consumption.attributes.getAttributes({})).value;
        const nrAttributesAfterCreate = attributesAfterCreate.length;
        expect(nrAttributesAfterCreate).toBe(nrAttributesBeforeCreate + 1);

        await expect(sender.eventBus).toHavePublished(AttributeCreatedEvent);
    });

    test("should create LocalAttributes for each property of a complex Identity Attribute", async function () {
        const attributesBeforeCreate = await sender.consumption.attributes.getAttributes({});
        const nrAttributesBeforeCreate = attributesBeforeCreate.value.length;

        const timestamp = DateTime.utc().toString();
        const creationParams: CreateAttributeRequest = {
            content: {
                "@type": "IdentityAttribute",
                value: {
                    "@type": "StreetAddress",
                    recipient: "ARecipient",
                    street: "AStreet",
                    houseNo: "AHouseNo",
                    zipCode: "AZipCode",
                    city: "ACity",
                    country: "DE"
                },
                owner: sender.address
            }
        };

        const createAttributeResult = await sender.consumption.attributes.createAttribute(creationParams);
        expect(createAttributeResult).toBeSuccessful();

        const attribute = createAttributeResult.value;
        expect(attribute.createdAt.substring(0, 10)).toStrictEqual(timestamp.substring(0, 10));
        expect(attribute.content).toMatchObject(creationParams.content);

        const childAttributes = (
            await sender.consumption.attributes.getAttributes({
                query: {
                    parentId: createAttributeResult.value.id
                }
            })
        ).value;

        expect(childAttributes).toHaveLength(5);
        expect(childAttributes[0].content.value["@type"]).toBe("Street");
        expect((childAttributes[0].content.value as StreetJSON).value).toBe("AStreet");
        expect(childAttributes[1].content.value["@type"]).toBe("HouseNumber");
        expect((childAttributes[1].content.value as HouseNumberJSON).value).toBe("AHouseNo");
        expect(childAttributes[2].content.value["@type"]).toBe("ZipCode");
        expect((childAttributes[2].content.value as ZipCodeJSON).value).toBe("AZipCode");
        expect(childAttributes[3].content.value["@type"]).toBe("City");
        expect((childAttributes[3].content.value as CityJSON).value).toBe("ACity");
        expect(childAttributes[4].content.value["@type"]).toBe("Country");
        expect((childAttributes[4].content.value as CountryJSON).value).toBe("DE");

        const attributesAfterCreate = (await sender.consumption.attributes.getAttributes({})).value;
        const nrAttributesAfterCreate = attributesAfterCreate.length;
        expect(nrAttributesAfterCreate).toBe(nrAttributesBeforeCreate + 6);
    });

    test("should trigger an AttributeCreatedEvent for each created child Attribute of a complex Attribute", async function () {
        const creationParams: CreateAttributeRequest = {
            content: {
                "@type": "IdentityAttribute",
                value: {
                    "@type": "StreetAddress",
                    recipient: "ARecipient",
                    street: "AStreet",
                    houseNo: "AHouseNo",
                    zipCode: "AZipCode",
                    city: "ACity",
                    country: "DE"
                },
                owner: sender.address
            }
        };

        const response = await sender.consumption.attributes.createAttribute(creationParams);
        expect(response).toBeSuccessful();

        await expect(sender.eventBus).toHavePublished(AttributeCreatedEvent, (e) => e.data.content.value["@type"] === "StreetAddress");
        await expect(sender.eventBus).toHavePublished(AttributeCreatedEvent, (e) => e.data.content.value["@type"] === "Street");
        await expect(sender.eventBus).toHavePublished(AttributeCreatedEvent, (e) => e.data.content.value["@type"] === "HouseNumber");
        await expect(sender.eventBus).toHavePublished(AttributeCreatedEvent, (e) => e.data.content.value["@type"] === "ZipCode");
        await expect(sender.eventBus).toHavePublished(AttributeCreatedEvent, (e) => e.data.content.value["@type"] === "City");
        await expect(sender.eventBus).toHavePublished(AttributeCreatedEvent, (e) => e.data.content.value["@type"] === "Country");
    });

    test("should allow to delete an attribute", async () => {
        const attributes = await sender.consumption.attributes.getAttributes({});
        const nrAttributesBeforeDelete = attributes.value.length;
        await sender.consumption.attributes.deleteAttribute({ id: attributes.value[0].id });

        const attributesAfterDelete = await sender.consumption.attributes.getAttributes({});
        const nrAttributesAfterDelete = attributesAfterDelete.value.length;
        expect(nrAttributesAfterDelete).toBe(nrAttributesBeforeDelete - 1);

        const attributesJSON = attributesAfterDelete.value.map((v) => v.id.toString());
        expect(attributesJSON).not.toContain(attributes.value[0]?.id.toString());
    });

    test("should allow to succeed an attribute", async () => {
        const displayNameParams: CreateAttributeRequest = {
            content: {
                "@type": "IdentityAttribute",
                value: {
                    "@type": "DisplayName",
                    value: "ADisplayName"
                },
                owner: sender.address
            }
        };

        const successorDate = CoreDate.utc();

        const attribute = await sender.consumption.attributes.createAttribute(displayNameParams);
        const attributeId = attribute.value.id;
        const createSuccessorParams: SucceedAttributeRequest = {
            successorContent: {
                "@type": "IdentityAttribute",
                value: {
                    "@type": "DisplayName",
                    value: "ANewDisplayName"
                },
                owner: sender.address,
                validFrom: successorDate.toString()
            },
            succeeds: attributeId
        };
        const successor = await sender.consumption.attributes.succeedAttribute(createSuccessorParams);
        const successorId = successor.value.id;
        const succeededAttribute = await sender.consumption.attributes.getAttribute({ id: attributeId });
        expect(succeededAttribute.value.content.validTo).toBe(successorDate.subtract(1).toISOString());

        const succeessorAttribute = await sender.consumption.attributes.getAttribute({ id: successorId });
        expect(succeessorAttribute.value.content.validFrom).toBe(successorDate.toISOString());

        const allAttributes = await sender.consumption.attributes.getAttributes({});
        const allAttributesJSON = allAttributes.value.map((v) => v.id);
        expect(allAttributesJSON).toContain(succeededAttribute.value.id);

        const currentAttributes = await sender.consumption.attributes.getAttributes({ onlyValid: true });
        const currentAttributesJSON = currentAttributes.value.map((v) => v.id);
        expect(currentAttributesJSON).not.toContain(succeededAttribute.value.id);
        expect(currentAttributesJSON).toContain(succeessorAttribute.value.id);
    });

    test("should allow to create a shared copy", async function () {
        const nationalityParams: CreateAttributeRequest = {
            content: {
                "@type": "IdentityAttribute",
                value: {
                    "@type": "Nationality",
                    value: "DE"
                },
                owner: sender.address
            }
        };
        const attribute = await sender.consumption.attributes.createAttribute(nationalityParams);

        const peer = "id1A35CharacterLongAddressXXXXXXXXX";
        const requestReference = "REQIDXXXXXXXXXXXXXXX";
        const createSharedAttributesParams: CreateSharedAttributeCopyRequest = {
            attributeId: attribute.value.id,
            peer: peer,
            requestReference: requestReference
        };

        const sharedNationality = await sender.consumption.attributes.createSharedAttributeCopy(createSharedAttributesParams);
        expect(sharedNationality).toBeSuccessful();
        const sharedNationalityAttribute = sharedNationality.value;
        expect(sharedNationalityAttribute.content).toMatchObject(nationalityParams.content);
        expect(sharedNationalityAttribute.shareInfo?.peer).toBe(peer);
    });

    test("should return only shared copy on sharedToPeer request", async function () {
        const nationalityParams: CreateAttributeRequest = {
            content: {
                "@type": "IdentityAttribute",
                value: {
                    "@type": "Nationality",
                    value: "DE"
                },
                owner: sender.address
            }
        };
        const attribute = await sender.consumption.attributes.createAttribute(nationalityParams);

        const peer = "id1A35CharacterLongAddressXXXXXXXXX";
        const requestReference = "REQIDXXXXXXXXXXXXXXX";
        const createSharedAttributesParams: CreateSharedAttributeCopyRequest = {
            attributeId: attribute.value.id,
            peer: peer,
            requestReference: requestReference
        };

        await sender.consumption.attributes.createSharedAttributeCopy(createSharedAttributesParams);

        const sharedToPeerAttributeResult = await sender.consumption.attributes.getSharedToPeerAttributes({ peer });
        expect(sharedToPeerAttributeResult).toBeSuccessful();
        expect(sharedToPeerAttributeResult.value).toHaveLength(1);

        const sharedNationalityAttribute = sharedToPeerAttributeResult.value[0];
        expect(sharedNationalityAttribute.content).toMatchObject(nationalityParams.content);
        expect(sharedNationalityAttribute.shareInfo?.peer).toBe(peer);
    });

    test("should hide technical shared to peer attributes when hideTechnical=true", async () => {
        const nationalityParams: CreateAttributeRequest = {
            content: {
                "@type": "RelationshipAttribute",
                key: "a key",
                confidentiality: RelationshipAttributeConfidentiality.Public,
                value: {
                    "@type": "ProprietaryString",
                    value: "a String",
                    title: "a title"
                },
                owner: sender.address,
                isTechnical: true
            }
        };

        const attribute = await sender.consumption.attributes.createAttribute(nationalityParams);

        const peer = "id1A35CharacterLongAddressXXXXXXXXX";
        const requestReference = "REQIDXXXXXXXXXXXXXXX";
        const createSharedAttributesParams: CreateSharedAttributeCopyRequest = {
            attributeId: attribute.value.id,
            peer: peer,
            requestReference: requestReference
        };

        await sender.consumption.attributes.createSharedAttributeCopy(createSharedAttributesParams);

        const sharedToPeerAttributeResult = await sender.consumption.attributes.getSharedToPeerAttributes({ peer, hideTechnical: true });
        expect(sharedToPeerAttributeResult.value).toHaveLength(0);
    });

    test("should return technical shared to peer attributes when hideTechnical=false", async () => {
        const nationalityParams: CreateAttributeRequest = {
            content: {
                "@type": "RelationshipAttribute",
                key: "a key",
                confidentiality: RelationshipAttributeConfidentiality.Public,
                value: {
                    "@type": "ProprietaryString",
                    value: "a String",
                    title: "a title"
                },
                owner: sender.address,
                isTechnical: true
            }
        };

        const attribute = await sender.consumption.attributes.createAttribute(nationalityParams);

        const peer = "id1A35CharacterLongAddressXXXXXXXXX";
        const requestReference = "REQIDXXXXXXXXXXXXXXX";
        const createSharedAttributesParams: CreateSharedAttributeCopyRequest = {
            attributeId: attribute.value.id,
            peer: peer,
            requestReference: requestReference
        };

        await sender.consumption.attributes.createSharedAttributeCopy(createSharedAttributesParams);

        const sharedToPeerAttributeResult = await sender.consumption.attributes.getSharedToPeerAttributes({ peer, hideTechnical: false });
        expect(sharedToPeerAttributeResult.value).toHaveLength(1);
    });

    test("should allow to update an attribute", async () => {
        const address = await sender.consumption.attributes.createAttribute({
            content: {
                "@type": "IdentityAttribute",
                value: {
                    "@type": "StreetAddress",
                    recipient: "ARecipient",
                    street: "AStreet",
                    houseNo: "AHouseNo",
                    zipCode: "AZipCode",
                    city: "ACity",
                    country: "DE"
                },
                validTo: CoreDate.utc().toString(),
                owner: sender.address
            }
        });

        const updateParams: UpdateAttributeRequest = {
            id: address.value.id,
            content: {
                "@type": "IdentityAttribute",
                value: {
                    "@type": "StreetAddress",
                    recipient: "ANewRecipient",
                    street: "ANewStreet",
                    houseNo: "ANewHouseNo",
                    zipCode: "ANewZipCode",
                    city: "ANewCity",
                    country: "DE"
                },
                validTo: CoreDate.utc().toString(),
                owner: sender.address
            }
        };
        const newAddress = await sender.consumption.attributes.updateAttribute(updateParams);
        expect(newAddress).toBeSuccessful();
        const newAddressAttribute = newAddress.value;
        expect(newAddressAttribute.content).toMatchObject(updateParams.content);
    });

    test("should allow to get an attribute by id", async function () {
        const attribute = await sender.consumption.attributes.createAttribute({
            content: {
                "@type": "IdentityAttribute",
                value: {
                    "@type": "Nationality",
                    value: "DE"
                },
                owner: sender.address
            }
        });

        const receivedAttribute = await sender.consumption.attributes.getAttribute({ id: attribute.value.id });
        expect(receivedAttribute).toBeSuccessful();
        expect(receivedAttribute).toStrictEqual(attribute);
    });

    test("should allow to get an attribute by type", async function () {
        const attribute = await sender.consumption.attributes.createAttribute({
            content: {
                "@type": "IdentityAttribute",
                value: {
                    "@type": "EMailAddress",
                    value: "a.mailaddress@provider.com"
                },
                owner: sender.address
            }
        });

        const receivedAttributes = await sender.consumption.attributes.getAttributes({
            query: { "content.value.@type": "EMailAddress" }
        });
        expect(receivedAttributes).toBeSuccessful();
        expect(receivedAttributes.value).toHaveLength(1);
        expect(receivedAttributes.value[0]).toStrictEqual(attribute.value);
    });

    test("should allow to execute an identityAttributeQuery", async function () {
        const identityAttribute = await sender.consumption.attributes.createAttribute({
            content: {
                "@type": "IdentityAttribute",
                value: {
                    "@type": "PhoneNumber",
                    value: "012345678910"
                },
                owner: sender.address
            }
        });
        expect(identityAttribute).toBeSuccessful();

        const relationshipAttribute = await sender.consumption.attributes.createAttribute({
            content: {
                "@type": "RelationshipAttribute",
                value: {
                    "@type": "ProprietaryString",
                    title: "aTitle",
                    value: "aProprietaryStringValue"
                },
                key: "phone",
                confidentiality: "protected" as RelationshipAttributeConfidentiality,
                owner: sender.address
            }
        });
        expect(relationshipAttribute).toBeSuccessful();

        const receivedAttributes = await sender.consumption.attributes.executeIdentityAttributeQuery({ query: { valueType: "PhoneNumber" } });
        expect(receivedAttributes).toBeSuccessful();
        expect(receivedAttributes.value).toHaveLength(1);
        const attributeIds = receivedAttributes.value.map((v) => v.id);
        expect(attributeIds).not.toContain(relationshipAttribute.value.id);
        expect(attributeIds).toContain(identityAttribute.value.id);
        expect(receivedAttributes.value[0]).toStrictEqual(identityAttribute.value);
    });

    test("should allow to execute a relationshipAttributeQuery", async function () {
        const relationshipAttribute = await sender.consumption.attributes.createAttribute({
            content: {
                "@type": "RelationshipAttribute",
                value: {
                    "@type": "ProprietaryString",
                    title: "aTitle",
                    value: "aProprietaryStringValue"
                },
                key: "website",
                confidentiality: RelationshipAttributeConfidentiality.Protected,
                owner: sender.address
            }
        });
        expect(relationshipAttribute).toBeSuccessful();

        const receivedAttribute = await sender.consumption.attributes.executeRelationshipAttributeQuery({
            query: {
                "@type": "RelationshipAttributeQuery",
                key: "website",
                owner: sender.address,
                attributeCreationHints: { valueType: "ProprietaryString", title: "AnAttributeHint", confidentiality: RelationshipAttributeConfidentiality.Protected }
            }
        });
        expect(receivedAttribute).toBeSuccessful();
        expect(receivedAttribute.value).toStrictEqual(relationshipAttribute.value);
    });

    test("should allow to execute a thirdPartyRelationshipAttributeQuery", async function () {
        await exchangeAndAcceptRequestByMessage(
            sender,
            recipient,
            {
                peer: recipient.address,
                content: {
                    items: [
                        {
                            "@type": "CreateAttributeRequestItem",
                            attribute: {
                                "@type": "RelationshipAttribute",
                                value: {
                                    "@type": "ProprietaryString",
                                    title: "aTitle",
                                    value: "aProprietaryStringValue"
                                },
                                key: "website",
                                confidentiality: RelationshipAttributeConfidentiality.Public,
                                owner: sender.address
                            },
                            mustBeAccepted: true
                        }
                    ]
                }
            },
            [{ accept: true }]
        );

        const receivedAttribute = await recipient.consumption.attributes.executeThirdPartyRelationshipAttributeQuery({
            query: {
                "@type": "ThirdPartyRelationshipAttributeQuery",
                key: "website",
                owner: sender.address,
                thirdParty: [sender.address]
            }
        });
        expect(receivedAttribute).toBeSuccessful();
        expect(receivedAttribute.value).toHaveLength(1);
    });

    test("should allow to share an attribute", async function () {
        const identityAttribute = await sender.consumption.attributes.createAttribute({
            content: {
                "@type": "IdentityAttribute",
                value: {
                    "@type": "PhoneNumber",
                    value: "012345678910"
                },
                owner: sender.address
            }
        });
        expect(identityAttribute).toBeSuccessful();

        const shareAttributeResult = await sender.consumption.attributes.shareAttribute({
            attributeId: identityAttribute.value.id,
            peer: recipient.address
        });
        expect(shareAttributeResult).toBeSuccessful();

        await sender.eventBus.waitForEvent(OutgoingRequestStatusChangedEvent, (e) => e.data.newStatus === LocalRequestStatus.Open);

        await syncUntilHasMessages(recipient.transport);

        const requestId = shareAttributeResult.value.id;

        const event = await recipient.eventBus.waitForEvent(IncomingRequestReceivedEvent);
        expect(event.data.id).toBe(requestId);

        const acceptRequestResult = await recipient.consumption.incomingRequests.accept({ requestId, items: [{ accept: true }] });
        expect(acceptRequestResult).toBeSuccessful();

        await recipient.eventBus.waitForEvent(IncomingRequestStatusChangedEvent, (e) => e.data.newStatus === LocalRequestStatus.Completed);

        const recipientAttributes = await recipient.consumption.attributes.getPeerAttributes({ peer: sender.address });

        const attributeContents = recipientAttributes.value.map((v) => v.content);
        expect(attributeContents).toContainEqual(identityAttribute.value.content);
    });

    test("should hide technical peer attributes when hideTechnical=true", async () => {
        const relationshipAttribute = await sender.consumption.attributes.createAttribute({
            content: {
                "@type": "RelationshipAttribute",
                key: "a key",
                confidentiality: RelationshipAttributeConfidentiality.Public,
                value: {
                    "@type": "ProprietaryString",
                    value: "a String",
                    title: "a title"
                },
                owner: sender.address,
                isTechnical: true
            }
        });
        expect(relationshipAttribute).toBeSuccessful();

        const shareAttributeResult = await sender.consumption.attributes.shareAttribute({
            attributeId: relationshipAttribute.value.id,
            peer: recipient.address
        });
        expect(shareAttributeResult).toBeSuccessful();

        await sender.eventBus.waitForEvent(OutgoingRequestStatusChangedEvent, (e) => e.data.newStatus === LocalRequestStatus.Open);

        await syncUntilHasMessages(recipient.transport);

        const requestId = shareAttributeResult.value.id;

        const event = await recipient.eventBus.waitForEvent(IncomingRequestReceivedEvent);
        expect(event.data.id).toBe(requestId);

        const acceptRequestResult = await recipient.consumption.incomingRequests.accept({ requestId, items: [{ accept: true }] });
        expect(acceptRequestResult).toBeSuccessful();

        await recipient.eventBus.waitForEvent(IncomingRequestStatusChangedEvent, (e) => e.data.newStatus === LocalRequestStatus.Completed);

        const recipientAttributes = await recipient.consumption.attributes.getPeerAttributes({ peer: sender.address, hideTechnical: true });

        expect(recipientAttributes.value).toHaveLength(0);
    });

    test("should return technical peer attributes when hideTechnical=false", async () => {
        const relationshipAttribute = await sender.consumption.attributes.createAttribute({
            content: {
                "@type": "RelationshipAttribute",
                key: "a key",
                confidentiality: RelationshipAttributeConfidentiality.Public,
                value: {
                    "@type": "ProprietaryString",
                    value: "a String",
                    title: "a title"
                },
                owner: sender.address,
                isTechnical: true
            }
        });
        expect(relationshipAttribute).toBeSuccessful();

        const shareAttributeResult = await sender.consumption.attributes.shareAttribute({
            attributeId: relationshipAttribute.value.id,
            peer: recipient.address
        });
        expect(shareAttributeResult).toBeSuccessful();

        await sender.eventBus.waitForEvent(OutgoingRequestStatusChangedEvent, (e) => e.data.newStatus === LocalRequestStatus.Open);

        await syncUntilHasMessages(recipient.transport);

        const requestId = shareAttributeResult.value.id;

        const event = await recipient.eventBus.waitForEvent(IncomingRequestReceivedEvent);
        expect(event.data.id).toBe(requestId);

        const acceptRequestResult = await recipient.consumption.incomingRequests.accept({ requestId, items: [{ accept: true }] });
        expect(acceptRequestResult).toBeSuccessful();

        await recipient.eventBus.waitForEvent(IncomingRequestStatusChangedEvent, (e) => e.data.newStatus === LocalRequestStatus.Completed);

        const recipientAttributes = await recipient.consumption.attributes.getPeerAttributes({ peer: sender.address, hideTechnical: false });

        expect(recipientAttributes.value).toHaveLength(1);
    });
});
