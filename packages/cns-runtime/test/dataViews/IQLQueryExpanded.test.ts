import { AbstractStringJSON, GivenName, IdentityAttribute, IQLQueryJSON, Surname } from "@nmshd/content";
import { CoreAddress } from "@nmshd/transport";
import { ConsumptionServices, DataViewExpander, LocalAttributeDTO, RepositoryAttributeDVO, TransportServices } from "../../src";
import { RuntimeServiceProvider } from "../lib";

const serviceProvider = new RuntimeServiceProvider();
let transportServices1: TransportServices;
let consumptionServices1: ConsumptionServices;
let expander1: DataViewExpander;

beforeAll(async () => {
    const runtimeServices = await serviceProvider.launch(1);
    transportServices1 = runtimeServices[0].transport;
    consumptionServices1 = runtimeServices[0].consumption;
    expander1 = runtimeServices[0].expander;
}, 30000);

afterAll(() => serviceProvider.stop());

describe("IQLQueryExpanded", () => {
    let transportService1Address: CoreAddress;
    const attributes: LocalAttributeDTO[] = [];

    beforeAll(async () => {
        transportService1Address = CoreAddress.from((await transportServices1.account.getIdentityInfo()).value.address);
        attributes.push(
            (
                await consumptionServices1.attributes.createAttribute({
                    content: IdentityAttribute.from<GivenName>({
                        owner: CoreAddress.from(transportService1Address),
                        value: GivenName.from("Hugo"),
                        tags: ["default"]
                    }).toJSON()
                })
            ).value
        );
        attributes.push(
            (
                await consumptionServices1.attributes.createAttribute({
                    content: IdentityAttribute.from<GivenName>({
                        owner: CoreAddress.from(transportService1Address),
                        value: GivenName.from("Egon")
                    }).toJSON()
                })
            ).value
        );
        attributes.push(
            (
                await consumptionServices1.attributes.createAttribute({
                    content: IdentityAttribute.from<GivenName>({
                        owner: CoreAddress.from(transportService1Address),
                        value: GivenName.from("Tester"),
                        tags: ["fake"]
                    }).toJSON()
                })
            ).value
        );
        attributes.push(
            (
                await consumptionServices1.attributes.createAttribute({
                    content: IdentityAttribute.from<Surname>({
                        owner: CoreAddress.from(transportService1Address),
                        value: Surname.from("Nachname"),
                        tags: ["fake"]
                    }).toJSON()
                })
            ).value
        );
    });

    test("check all GivenNames", async () => {
        const query: IQLQueryJSON = {
            "@type": "IQLQuery",
            queryString: "GivenName"
        };
        const expandedQuery = await expander1.processIQLQuery(query);
        expect(expandedQuery).toBeDefined();
        expect(expandedQuery.type).toBe("ProcessedIQLQueryDVO");
        expect(expandedQuery.name).toBe("i18n://dvo.attributeQuery.name.IQLQuery");
        expect(expandedQuery.description).toBe("i18n://dvo.attributeQuery.description.IQLQuery");
        expect(expandedQuery.valueType).toBe("GivenName");
        expect(expandedQuery.validFrom).toBeUndefined();
        expect(expandedQuery.validTo).toBeUndefined();
        expect(expandedQuery.renderHints!["@type"]).toBe("RenderHints");
        expect(expandedQuery.renderHints!.technicalType).toBe("String");
        expect(expandedQuery.renderHints!.editType).toBe("InputLike");
        expect(expandedQuery.valueHints!["@type"]).toBe("ValueHints");
        expect(expandedQuery.valueHints!.max).toBe(100);
        expect(expandedQuery.results).toHaveLength(3);

        let dvo: RepositoryAttributeDVO = expandedQuery.results[0];
        let attribute = attributes[0];
        expect(dvo).toBeDefined();
        expect(dvo.type).toBe("RepositoryAttributeDVO");
        expect(dvo.id).toStrictEqual(attribute.id);
        expect(dvo.name).toBe("i18n://dvo.attribute.name.GivenName");
        expect(dvo.description).toBe("i18n://dvo.attribute.description.GivenName");
        expect(dvo.date).toStrictEqual(attribute.createdAt);
        expect(dvo.content).toStrictEqual(attribute.content);
        const givenName = dvo.value as AbstractStringJSON;
        expect(givenName["@type"]).toBe("GivenName");
        expect(givenName.value).toBe("Hugo");
        expect(dvo.tags[0]).toBe("default");
        expect(dvo.createdAt).toStrictEqual(attribute.createdAt);
        expect(dvo.isOwn).toBe(true);
        expect(dvo.isValid).toBe(true);
        expect(dvo.sharedWith).toStrictEqual([]);
        expect(dvo.owner).toStrictEqual(attribute.content.owner);
        expect(dvo.renderHints["@type"]).toBe("RenderHints");
        expect(dvo.renderHints.technicalType).toBe("String");
        expect(dvo.renderHints.editType).toBe("InputLike");
        expect(dvo.valueHints["@type"]).toBe("ValueHints");
        expect(dvo.valueHints.max).toBe(100);

        dvo = expandedQuery.results[1];
        attribute = attributes[1];
        expect(dvo).toBeDefined();
        expect(dvo.type).toBe("RepositoryAttributeDVO");
        expect(dvo.id).toStrictEqual(attribute.id);
        expect(dvo.name).toBe("i18n://dvo.attribute.name.GivenName");
        expect(dvo.description).toBe("i18n://dvo.attribute.description.GivenName");
        expect(dvo.date).toStrictEqual(attribute.createdAt);
        expect(dvo.content).toStrictEqual(attribute.content);
        const value = dvo.value as AbstractStringJSON;
        expect(value["@type"]).toBe("GivenName");
        expect(value.value).toBe("Egon");
        expect(dvo.createdAt).toStrictEqual(attribute.createdAt);
        expect(dvo.isOwn).toBe(true);
        expect(dvo.isValid).toBe(true);
        expect(dvo.sharedWith).toStrictEqual([]);
        expect(dvo.owner).toStrictEqual(attribute.content.owner);
        expect(dvo.renderHints["@type"]).toBe("RenderHints");
        expect(dvo.renderHints.technicalType).toBe("String");
        expect(dvo.renderHints.editType).toBe("InputLike");
        expect(dvo.valueHints["@type"]).toBe("ValueHints");
        expect(dvo.valueHints.max).toBe(100);

        dvo = expandedQuery.results[2];
        attribute = attributes[2];
        expect(dvo).toBeDefined();
        expect(dvo.type).toBe("RepositoryAttributeDVO");
        expect(dvo.id).toStrictEqual(attribute.id);
        expect(dvo.name).toBe("i18n://dvo.attribute.name.GivenName");
        expect(dvo.description).toBe("i18n://dvo.attribute.description.GivenName");
        expect(dvo.date).toStrictEqual(attribute.createdAt);
        expect(dvo.content).toStrictEqual(attribute.content);
        const value3 = dvo.value as AbstractStringJSON;
        expect(value3["@type"]).toBe("GivenName");
        expect(value3.value).toBe("Tester");
        expect(dvo.tags[0]).toBe("fake");
        expect(dvo.createdAt).toStrictEqual(attribute.createdAt);
        expect(dvo.isOwn).toBe(true);
        expect(dvo.isValid).toBe(true);
        expect(dvo.sharedWith).toStrictEqual([]);
        expect(dvo.owner).toStrictEqual(attribute.content.owner);
        expect(dvo.renderHints["@type"]).toBe("RenderHints");
        expect(dvo.renderHints.technicalType).toBe("String");
        expect(dvo.renderHints.editType).toBe("InputLike");
        expect(dvo.valueHints["@type"]).toBe("ValueHints");
        expect(dvo.valueHints.max).toBe(100);
    });

    test("check only default GivenName", async () => {
        const query: IQLQueryJSON = {
            "@type": "IQLQuery",
            queryString: "GivenName && #default"
        };
        const expandedQuery = await expander1.processIQLQuery(query);
        expect(expandedQuery).toBeDefined();
        expect(expandedQuery.type).toBe("ProcessedIQLQueryDVO");
        expect(expandedQuery.name).toBe("i18n://dvo.attributeQuery.name.IQLQuery");
        expect(expandedQuery.description).toBe("i18n://dvo.attributeQuery.description.IQLQuery");
        expect(expandedQuery.valueType).toBe("GivenName");
        expect(expandedQuery.validFrom).toBeUndefined();
        expect(expandedQuery.validTo).toBeUndefined();
        expect(expandedQuery.renderHints!["@type"]).toBe("RenderHints");
        expect(expandedQuery.renderHints!.technicalType).toBe("String");
        expect(expandedQuery.renderHints!.editType).toBe("InputLike");
        expect(expandedQuery.valueHints!["@type"]).toBe("ValueHints");
        expect(expandedQuery.valueHints!.max).toBe(100);
        expect(expandedQuery.results).toHaveLength(1);

        const dvo: RepositoryAttributeDVO = expandedQuery.results[0];
        const attribute = attributes[0];
        expect(dvo).toBeDefined();
        expect(dvo.type).toBe("RepositoryAttributeDVO");
        expect(dvo.id).toStrictEqual(attribute.id);
        expect(dvo.name).toBe("i18n://dvo.attribute.name.GivenName");
        expect(dvo.description).toBe("i18n://dvo.attribute.description.GivenName");
        expect(dvo.date).toStrictEqual(attribute.createdAt);
        expect(dvo.content).toStrictEqual(attribute.content);
        const givenName = dvo.value as AbstractStringJSON;
        expect(givenName["@type"]).toBe("GivenName");
        expect(givenName.value).toBe("Hugo");
        expect(dvo.tags[0]).toBe("default");
        expect(dvo.createdAt).toStrictEqual(attribute.createdAt);
        expect(dvo.isOwn).toBe(true);
        expect(dvo.isValid).toBe(true);
        expect(dvo.sharedWith).toStrictEqual([]);
        expect(dvo.owner).toStrictEqual(attribute.content.owner);
        expect(dvo.renderHints["@type"]).toBe("RenderHints");
        expect(dvo.renderHints.technicalType).toBe("String");
        expect(dvo.renderHints.editType).toBe("InputLike");
        expect(dvo.valueHints["@type"]).toBe("ValueHints");
        expect(dvo.valueHints.max).toBe(100);
    });

    test("check only fake GivenName", async () => {
        const query: IQLQueryJSON = {
            "@type": "IQLQuery",
            queryString: "GivenName && #fake"
        };
        const expandedQuery = await expander1.processIQLQuery(query);
        expect(expandedQuery).toBeDefined();
        expect(expandedQuery.type).toBe("ProcessedIQLQueryDVO");
        expect(expandedQuery.name).toBe("i18n://dvo.attributeQuery.name.IQLQuery");
        expect(expandedQuery.description).toBe("i18n://dvo.attributeQuery.description.IQLQuery");
        expect(expandedQuery.valueType).toBe("GivenName");
        expect(expandedQuery.validFrom).toBeUndefined();
        expect(expandedQuery.validTo).toBeUndefined();
        expect(expandedQuery.renderHints!["@type"]).toBe("RenderHints");
        expect(expandedQuery.renderHints!.technicalType).toBe("String");
        expect(expandedQuery.renderHints!.editType).toBe("InputLike");
        expect(expandedQuery.valueHints!["@type"]).toBe("ValueHints");
        expect(expandedQuery.valueHints!.max).toBe(100);
        expect(expandedQuery.results).toHaveLength(1);

        const dvo: RepositoryAttributeDVO = expandedQuery.results[0];
        const attribute = attributes[2];
        expect(dvo).toBeDefined();
        expect(dvo.type).toBe("RepositoryAttributeDVO");
        expect(dvo.id).toStrictEqual(attribute.id);
        expect(dvo.name).toBe("i18n://dvo.attribute.name.GivenName");
        expect(dvo.description).toBe("i18n://dvo.attribute.description.GivenName");
        expect(dvo.date).toStrictEqual(attribute.createdAt);
        expect(dvo.content).toStrictEqual(attribute.content);
        const givenName = dvo.value as AbstractStringJSON;
        expect(givenName["@type"]).toBe("GivenName");
        expect(givenName.value).toBe("Tester");
        expect(dvo.tags[0]).toBe("fake");
        expect(dvo.createdAt).toStrictEqual(attribute.createdAt);
        expect(dvo.isOwn).toBe(true);
        expect(dvo.isValid).toBe(true);
        expect(dvo.sharedWith).toStrictEqual([]);
        expect(dvo.owner).toStrictEqual(attribute.content.owner);
        expect(dvo.renderHints["@type"]).toBe("RenderHints");
        expect(dvo.renderHints.technicalType).toBe("String");
        expect(dvo.renderHints.editType).toBe("InputLike");
        expect(dvo.valueHints["@type"]).toBe("ValueHints");
        expect(dvo.valueHints.max).toBe(100);
    });

    test("check all fake attributes", async () => {
        const query: IQLQueryJSON = {
            "@type": "IQLQuery",
            queryString: "#fake"
        };
        const expandedQuery = await expander1.processIQLQuery(query);
        expect(expandedQuery).toBeDefined();
        expect(expandedQuery.type).toBe("ProcessedIQLQueryDVO");
        expect(expandedQuery.name).toBe("i18n://dvo.attributeQuery.name.IQLQuery");
        expect(expandedQuery.description).toBe("i18n://dvo.attributeQuery.description.IQLQuery");
        expect(expandedQuery.valueType).toBeUndefined();
        expect(expandedQuery.validFrom).toBeUndefined();
        expect(expandedQuery.validTo).toBeUndefined();
        expect(expandedQuery.renderHints).toBeUndefined();
        expect(expandedQuery.valueHints).toBeUndefined();
        expect(expandedQuery.results).toHaveLength(2);

        let dvo: RepositoryAttributeDVO = expandedQuery.results[0];
        let attribute = attributes[2];
        expect(dvo).toBeDefined();
        expect(dvo.type).toBe("RepositoryAttributeDVO");
        expect(dvo.id).toStrictEqual(attribute.id);
        expect(dvo.name).toBe("i18n://dvo.attribute.name.GivenName");
        expect(dvo.description).toBe("i18n://dvo.attribute.description.GivenName");
        expect(dvo.date).toStrictEqual(attribute.createdAt);
        expect(dvo.content).toStrictEqual(attribute.content);
        const givenName = dvo.value as AbstractStringJSON;
        expect(givenName["@type"]).toBe("GivenName");
        expect(givenName.value).toBe("Tester");
        expect(dvo.tags[0]).toBe("fake");
        expect(dvo.createdAt).toStrictEqual(attribute.createdAt);
        expect(dvo.isOwn).toBe(true);
        expect(dvo.isValid).toBe(true);
        expect(dvo.sharedWith).toStrictEqual([]);
        expect(dvo.owner).toStrictEqual(attribute.content.owner);
        expect(dvo.renderHints["@type"]).toBe("RenderHints");
        expect(dvo.renderHints.technicalType).toBe("String");
        expect(dvo.renderHints.editType).toBe("InputLike");
        expect(dvo.valueHints["@type"]).toBe("ValueHints");
        expect(dvo.valueHints.max).toBe(100);

        dvo = expandedQuery.results[1];
        attribute = attributes[3];
        expect(dvo).toBeDefined();
        expect(dvo.type).toBe("RepositoryAttributeDVO");
        expect(dvo.id).toStrictEqual(attribute.id);
        expect(dvo.name).toBe("i18n://dvo.attribute.name.Surname");
        expect(dvo.description).toBe("i18n://dvo.attribute.description.Surname");
        expect(dvo.date).toStrictEqual(attribute.createdAt);
        expect(dvo.content).toStrictEqual(attribute.content);
        const value = dvo.value as AbstractStringJSON;
        expect(value["@type"]).toBe("Surname");
        expect(value.value).toBe("Nachname");
        expect(dvo.tags[0]).toBe("fake");
        expect(dvo.createdAt).toStrictEqual(attribute.createdAt);
        expect(dvo.isOwn).toBe(true);
        expect(dvo.isValid).toBe(true);
        expect(dvo.sharedWith).toStrictEqual([]);
        expect(dvo.owner).toStrictEqual(attribute.content.owner);
        expect(dvo.renderHints["@type"]).toBe("RenderHints");
        expect(dvo.renderHints.technicalType).toBe("String");
        expect(dvo.renderHints.editType).toBe("InputLike");
        expect(dvo.valueHints["@type"]).toBe("ValueHints");
        expect(dvo.valueHints.max).toBe(100);
    });
});
