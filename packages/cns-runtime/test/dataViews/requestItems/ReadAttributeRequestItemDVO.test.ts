import { AcceptReadAttributeRequestItemParametersWithNewAttributeJSON, LocalRequestStatus } from "@nmshd/consumption";
import { GivenNameJSON, IdentityAttributeQuery, ReadAttributeRequestItem } from "@nmshd/content";
import {
    ConsumptionServices,
    DataViewExpander,
    DecidableReadAttributeRequestItemDVO,
    IdentityAttributeQueryDVO,
    IncomingRequestStatusChangedEvent,
    MessageDTO,
    OutgoingRequestStatusChangedEvent,
    ProcessedIdentityAttributeQueryDVO,
    ReadAttributeAcceptResponseItemDVO,
    ReadAttributeRequestItemDVO,
    RequestMessageDVO,
    TransportServices
} from "../../../src";
import { establishRelationship, MockEventBus, RuntimeServiceProvider, sendMessage, syncUntilHasMessages } from "../../lib";

const serviceProvider = new RuntimeServiceProvider();
let transportServices1: TransportServices;
let transportServices2: TransportServices;
let expander1: DataViewExpander;
let expander2: DataViewExpander;
let consumptionServices1: ConsumptionServices;
let consumptionServices2: ConsumptionServices;
let eventBus1: MockEventBus;
let eventBus2: MockEventBus;
let senderMessage: MessageDTO;
let recipientMessage: MessageDTO;

beforeAll(async () => {
    const runtimeServices = await serviceProvider.launch(2, { enableRequestModule: true });
    transportServices1 = runtimeServices[0].transport;
    transportServices2 = runtimeServices[1].transport;
    expander1 = runtimeServices[0].expander;
    expander2 = runtimeServices[1].expander;
    consumptionServices1 = runtimeServices[0].consumption;
    consumptionServices2 = runtimeServices[1].consumption;
    eventBus1 = runtimeServices[0].eventBus;
    eventBus2 = runtimeServices[1].eventBus;
    await establishRelationship(transportServices1, transportServices2);
    // const senderAddress = (await transportServices1.account.getIdentityInfo()).value.address;
    const recipientAddress = (await transportServices2.account.getIdentityInfo()).value.address;

    await consumptionServices2.attributes.createAttribute({
        content: {
            "@type": "IdentityAttribute",
            owner: recipientAddress,
            value: {
                "@type": "GivenName",
                value: "Theodor"
            }
        }
    });

    const localRequest = await consumptionServices1.outgoingRequests.create({
        content: {
            items: [
                ReadAttributeRequestItem.from({
                    mustBeAccepted: true,

                    query: IdentityAttributeQuery.from({
                        valueType: "GivenName"
                    })
                }).toJSON()
            ]
        },
        peer: recipientAddress
    });

    senderMessage = await sendMessage(transportServices1, recipientAddress, localRequest.value.content);

    const messages = await syncUntilHasMessages(transportServices2, 1);
    if (messages.length < 1) {
        throw new Error("Not enough messages synced");
    }
    recipientMessage = messages[0];

    await eventBus2.waitForEvent(IncomingRequestStatusChangedEvent, (e) => e.data.newStatus === LocalRequestStatus.DecisionRequired);
}, 30000);

afterAll(() => serviceProvider.stop());

beforeEach(function () {
    eventBus1.reset();
    eventBus2.reset();
});

describe("ReadAttributeRequestItemDVO", () => {
    test("check the MessageDVO for the sender", async () => {
        const dto = senderMessage;
        const dvo = (await expander1.expandMessageDTO(senderMessage)) as RequestMessageDVO;
        expect(dvo).toBeDefined();
        expect(dvo.id).toBe(dto.id);
        expect(dvo.name).toBe("i18n://dvo.message.name");
        expect(dvo.type).toBe("RequestMessageDVO");
        expect(dvo.date).toBe(dto.createdAt);
        expect(dvo.request).toBeDefined();
        expect(dvo.request.isOwn).toBe(true);
        expect(dvo.request.status).toBe("Open");
        expect(dvo.request.statusText).toBe("i18n://dvo.localRequest.status.Open");
        expect(dvo.request.type).toBe("LocalRequestDVO");
        expect(dvo.request.content.type).toBe("RequestDVO");
        expect(dvo.request.content.items).toHaveLength(1);
        expect(dvo.request.isDecidable).toBe(false);
        const requestItemDVO = dvo.request.content.items[0] as ReadAttributeRequestItemDVO;
        expect(requestItemDVO.type).toBe("ReadAttributeRequestItemDVO");
        expect(requestItemDVO.isDecidable).toBe(false);
        expect(requestItemDVO.query).toBeDefined();
        expect(requestItemDVO.query.type).toBe("IdentityAttributeQueryDVO");
        const identityAttributeQueryDVO = requestItemDVO.query as IdentityAttributeQueryDVO;
        expect(identityAttributeQueryDVO.renderHints.technicalType).toBe("String");
        expect(identityAttributeQueryDVO.renderHints.editType).toBe("InputLike");
        expect(identityAttributeQueryDVO.valueHints.max).toBe(100);
        expect(requestItemDVO.mustBeAccepted).toBe(true);
    });

    test("check the MessageDVO for the recipient and accept it", async () => {
        const dto = recipientMessage;
        const dvo = (await expander2.expandMessageDTO(recipientMessage)) as RequestMessageDVO;
        expect(dvo).toBeDefined();
        expect(dvo.id).toBe(dto.id);
        expect(dvo.name).toBe("i18n://dvo.message.name");
        expect(dvo.type).toBe("RequestMessageDVO");
        expect(dvo.date).toBe(dto.createdAt);
        expect(dvo.request).toBeDefined();
        expect(dvo.request.isOwn).toBe(false);
        expect(dvo.request.status).toBe("DecisionRequired");
        expect(dvo.request.statusText).toBe("i18n://dvo.localRequest.status.DecisionRequired");
        expect(dvo.request.type).toBe("LocalRequestDVO");
        expect(dvo.request.content.type).toBe("RequestDVO");
        expect(dvo.request.content.items).toHaveLength(1);
        expect(dvo.request.isDecidable).toBe(true);
        const requestItemDVO = dvo.request.content.items[0] as DecidableReadAttributeRequestItemDVO;
        expect(requestItemDVO.type).toBe("DecidableReadAttributeRequestItemDVO");
        expect(requestItemDVO.isDecidable).toBe(true);
        expect(requestItemDVO.query).toBeDefined();
        expect(requestItemDVO.query.type).toBe("ProcessedIdentityAttributeQueryDVO");
        const identityAttributeQueryDVO = requestItemDVO.query as ProcessedIdentityAttributeQueryDVO;
        expect(identityAttributeQueryDVO.results).toHaveLength(1);
        expect(identityAttributeQueryDVO.renderHints.technicalType).toBe("String");
        expect(identityAttributeQueryDVO.renderHints.editType).toBe("InputLike");
        expect(identityAttributeQueryDVO.valueHints.max).toBe(100);
        expect(requestItemDVO.mustBeAccepted).toBe(true);
        const resultItem = identityAttributeQueryDVO.results[0];
        expect(resultItem.type).toBe("RepositoryAttributeDVO");
        expect(resultItem.content["@type"]).toBe("IdentityAttribute");
        expect(resultItem.content.value["@type"]).toBe("GivenName");
        expect((resultItem.content.value as GivenNameJSON).value).toBe("Theodor");

        const acceptResult = await consumptionServices2.incomingRequests.accept({
            requestId: dvo.request.id,
            items: [{ accept: true, newAttribute: resultItem.content } as AcceptReadAttributeRequestItemParametersWithNewAttributeJSON]
        });
        expect(acceptResult).toBeSuccessful();
    });

    test("check the MessageDVO for the recipient after acceptance", async () => {
        const dto = recipientMessage;
        const dvo = (await expander2.expandMessageDTO(recipientMessage)) as RequestMessageDVO;
        expect(dvo).toBeDefined();
        expect(dvo.id).toBe(dto.id);
        expect(dvo.name).toBe("i18n://dvo.message.name");
        expect(dvo.type).toBe("RequestMessageDVO");
        expect(dvo.date).toBe(dto.createdAt);
        expect(dvo.request).toBeDefined();
        expect(dvo.request.isOwn).toBe(false);
        expect(dvo.request.status).toBe("Decided");
        expect(dvo.request.statusText).toBe("i18n://dvo.localRequest.status.Decided");
        expect(dvo.request.type).toBe("LocalRequestDVO");
        expect(dvo.request.content.type).toBe("RequestDVO");
        expect(dvo.request.content.items).toHaveLength(1);
        expect(dvo.request.isDecidable).toBe(false);
        const requestItemDVO = dvo.request.content.items[0] as ReadAttributeRequestItemDVO;
        expect(requestItemDVO.type).toBe("ReadAttributeRequestItemDVO");
        expect(requestItemDVO.isDecidable).toBe(false);
        expect(requestItemDVO.query).toBeDefined();
        expect(requestItemDVO.query.type).toBe("IdentityAttributeQueryDVO");
        const identityAttributeQueryDVO = requestItemDVO.query as IdentityAttributeQueryDVO;
        expect(identityAttributeQueryDVO.renderHints.technicalType).toBe("String");
        expect(identityAttributeQueryDVO.renderHints.editType).toBe("InputLike");
        expect(identityAttributeQueryDVO.valueHints.max).toBe(100);
        expect(requestItemDVO.mustBeAccepted).toBe(true);

        const response = dvo.request.response;
        expect(response).toBeDefined();
        expect(response!.type).toBe("LocalResponseDVO");
        expect(response!.name).toBe("i18n://dvo.localResponse.name");
        expect(response!.date).toBeDefined();
        expect(response!.content.result).toBe("Accepted");
        expect(response!.content.items).toHaveLength(1);
        const responseItem = response!.content.items[0] as ReadAttributeAcceptResponseItemDVO;
        expect(responseItem.result).toBe("Accepted");
        expect(responseItem.type).toBe("ReadAttributeAcceptResponseItemDVO");
        expect(responseItem.attribute).toBeDefined();
        const recipientAddress = (await transportServices2.account.getIdentityInfo()).value.address;
        expect(responseItem.attribute.owner).toBe(recipientAddress);
        expect(responseItem.attribute.type).toBe("SharedToPeerAttributeDVO");
        expect(responseItem.attribute.content.value["@type"]).toBe("GivenName");
        expect((responseItem.attribute.content.value as GivenNameJSON).value).toBe("Theodor");
        expect(requestItemDVO.response).toStrictEqual(responseItem);

        const attributeResult = await consumptionServices2.attributes.getAttributes({
            query: { "content.value.@type": "GivenName", "shareInfo.peer": dvo.createdBy.id }
        });
        expect(attributeResult).toBeSuccessful();
        expect(attributeResult.value[0].id).toBeDefined();

        const displayName = attributeResult.value[0].content.value as GivenNameJSON;
        expect(displayName.value).toBe("Theodor");

        expect(responseItem.attributeId).toStrictEqual(attributeResult.value[0].id);
        expect(displayName.value).toStrictEqual((responseItem.attribute.content.value as GivenNameJSON).value);
    });

    test("check the MessageDVO for the sender after acceptance", async () => {
        await syncUntilHasMessages(transportServices1, 1);

        await eventBus1.waitForEvent(OutgoingRequestStatusChangedEvent);

        const dto = senderMessage;
        const dvo = (await expander1.expandMessageDTO(senderMessage)) as RequestMessageDVO;
        expect(dvo).toBeDefined();
        expect(dvo.id).toBe(dto.id);
        expect(dvo.name).toBe("i18n://dvo.message.name");
        expect(dvo.type).toBe("RequestMessageDVO");
        expect(dvo.date).toBe(dto.createdAt);
        expect(dvo.request).toBeDefined();
        expect(dvo.request.isOwn).toBe(true);
        expect(dvo.request.status).toBe("Completed");
        expect(dvo.request.statusText).toBe("i18n://dvo.localRequest.status.Completed");
        expect(dvo.request.type).toBe("LocalRequestDVO");
        expect(dvo.request.content.type).toBe("RequestDVO");
        expect(dvo.request.content.items).toHaveLength(1);
        expect(dvo.request.isDecidable).toBe(false);
        const requestItemDVO = dvo.request.content.items[0] as ReadAttributeRequestItemDVO;
        expect(requestItemDVO.type).toBe("ReadAttributeRequestItemDVO");
        expect(requestItemDVO.isDecidable).toBe(false);
        expect(requestItemDVO.query).toBeDefined();
        expect(requestItemDVO.query.type).toBe("IdentityAttributeQueryDVO");
        const identityAttributeQueryDVO = requestItemDVO.query as IdentityAttributeQueryDVO;
        expect(identityAttributeQueryDVO.renderHints.technicalType).toBe("String");
        expect(identityAttributeQueryDVO.renderHints.editType).toBe("InputLike");
        expect(identityAttributeQueryDVO.valueHints.max).toBe(100);
        expect(requestItemDVO.mustBeAccepted).toBe(true);
        const response = dvo.request.response;
        expect(response).toBeDefined();
        expect(response!.type).toBe("LocalResponseDVO");
        expect(response!.name).toBe("i18n://dvo.localResponse.name");
        expect(response!.date).toBeDefined();
        expect(response!.content.result).toBe("Accepted");
        expect(response!.content.items).toHaveLength(1);
        const responseItem = response!.content.items[0] as ReadAttributeAcceptResponseItemDVO;
        expect(responseItem.result).toBe("Accepted");
        expect(responseItem.type).toBe("ReadAttributeAcceptResponseItemDVO");
        expect(responseItem.attributeId).toBeDefined();
        expect(requestItemDVO.response).toStrictEqual(responseItem);

        const attributeResult = await consumptionServices1.attributes.getAttributes({
            query: { "content.value.@type": "GivenName", "shareInfo.peer": dvo.request.peer.id }
        });
        expect(attributeResult).toBeSuccessful();
        expect(attributeResult.value[0].id).toBeDefined();

        const givenName = attributeResult.value[0].content.value as GivenNameJSON;
        expect(givenName.value).toBe("Theodor");

        expect(responseItem.attributeId).toStrictEqual(attributeResult.value[0].id);
        expect(givenName.value).toStrictEqual((responseItem.attribute.content.value as GivenNameJSON).value);
    });
});
