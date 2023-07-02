import { IncomingRequestStatusChangedEvent, LocalRequestStatus } from "@nmshd/consumption";
import { RequestVerifiableAttributeRequestItem, ShareAttributeRequestItem } from "@nmshd/content";
import assert from "assert";
import { IncomingRequestReceivedEvent, OutgoingRequestStatusChangedEvent } from "../../src";
import { ensureActiveRelationship, RuntimeServiceProvider, syncUntilHasMessages, TestRuntimeServices } from "../lib";
import { send } from "process";

const runtimeServiceProvider = new RuntimeServiceProvider();

let sender: TestRuntimeServices;
let recipient: TestRuntimeServices;
let id: string;

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

describe("VC", () => {
    beforeEach(async function () {
        const result = await sender.consumption.attributes.createAttribute({
            content: {
                "@type": "IdentityAttribute",
                value: {
                    "@type": "BirthDate",
                    day: 23,
                    month: 11,
                    year: 1998
                },
                owner: sender.address
            }
        });
        id = result.value.id;
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

    test("Request verifiable attribute user story", async function () {
        const identityAttribute = await sender.consumption.attributes.getAttribute({
            id
        });

        const createRequestParams = {
            peer: recipient.address,
            content: {
                items: [
                    ShareAttributeRequestItem.from({
                        attribute: identityAttribute.value.content,
                        sourceAttributeId: identityAttribute.value.id,
                        mustBeAccepted: true
                    })
                ]
            }
        };

        const params = {
            content: {
                items: [
                    RequestVerifiableAttributeRequestItem.from({
                        attribute: identityAttribute.value.content,
                        did: "did:key:ebfeb1f712ebc6f1c276e12ec21",
                        mustBeAccepted: true
                    })
                ]
            },
            peer: recipient.address
        };

        const canCreateRequestResult = await sender.consumption.outgoingRequests.canCreate(params as any);

        expect(canCreateRequestResult).toBeSuccessful();

        const requestedAttributeResult = await sender.consumption.outgoingRequests.create(params as any);

        expect(requestedAttributeResult).toBeSuccessful();

        const result = await sender.transport.messages.sendMessage({
            content: requestedAttributeResult.value.content,
            recipients: [recipient.address]
        });

        expect(result).toBeSuccessful();

        await sender.eventBus.waitForEvent(OutgoingRequestStatusChangedEvent, (e) => e.data.newStatus === LocalRequestStatus.Open);
        await syncUntilHasMessages(recipient.transport);

        const requestId = requestedAttributeResult.value.id;

        const event = await recipient.eventBus.waitForEvent(IncomingRequestReceivedEvent);
        expect(event.data.id).toBe(requestId);

        const acceptResult = await recipient.consumption.incomingRequests.accept({
            requestId: event.data.id,
            items: [
                {
                    accept: true
                }
            ]
        });

        expect(acceptResult).toBeSuccessful();

        console.log((acceptResult.value.response?.content.items[0] as any).attribute);

        await recipient.eventBus.waitForEvent(IncomingRequestStatusChangedEvent, (e) => e.data.newStatus === LocalRequestStatus.Decided);

        const validation = await sender.consumption.attributes.verifyVerifiableCredential({
            attribute: (acceptResult.value.response?.content.items[0] as any).attribute
        });

        expect(validation).toBeSuccessful();

        expect(validation.value.success).toBeTruthy();
    });
});

function buildCredential(data: any, subjectDid: string, publicKey: string) {
    const now = new Date().toJSON();
    const issuanceDate = `${now.substring(0, now.length - 5)}Z`;
    const type = data["@type"];
    console.log(data);
    delete data["@type"];
    const credentialSubject: any = {};
    credentialSubject[`${type}`] = { ...data };
    credentialSubject["id"] = subjectDid;
    return {
        "@context": ["https://www.w3.org/2018/credentials/v1", "https://www.w3.org/2018/credentials/examples/v1", "https://enmeshed.eu/schema"],
        type: ["VerifiableCredential"],
        issuer: `did:key:${publicKey}`,
        issuanceDate,
        credentialSubject
    };
}
