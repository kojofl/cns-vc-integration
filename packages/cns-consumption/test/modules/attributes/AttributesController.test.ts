import {
    AttributeCreatedEvent,
    AttributeDeletedEvent,
    AttributeSucceededEvent,
    ConsumptionController,
    ICreateLocalAttributeParams,
    ICreatePeerLocalAttributeParams,
    ICreateSharedLocalAttributeCopyParams,
    ISucceedLocalAttributeParams,
    LocalAttribute,
    SharedAttributeCopyCreatedEvent
} from "@nmshd/consumption"
import {
    City,
    Country,
    EMailAddress,
    HouseNumber,
    IdentityAttribute,
    IIdentityAttributeQuery,
    IRelationshipAttributeQuery,
    Nationality,
    PhoneNumber,
    RelationshipAttribute,
    RelationshipAttributeConfidentiality,
    Street,
    ZipCode
} from "@nmshd/content"
import { AccountController, CoreAddress, CoreDate, CoreError, CoreId, Transport } from "@nmshd/transport"
import { expect } from "chai"
import { IntegrationTest } from "../../core/IntegrationTest"
import { TestUtil } from "../../core/TestUtil"
import { MockEventBus } from "../MockEventBus"

export class AttributesControllerTest extends IntegrationTest {
    public run(): void {
        const that = this
        const mockEventBus = new MockEventBus()

        describe("AttributesController", function () {
            const transport = new Transport(that.connection, that.config, mockEventBus, that.loggerFactory)

            let consumptionController: ConsumptionController
            let testAccount: AccountController

            this.timeout(150000)

            before(async function () {
                await TestUtil.clearAccounts(that.connection)

                await transport.init()

                const account = (await TestUtil.provideAccounts(transport, 1))[0]
                ;({ accountController: testAccount, consumptionController } = account)
            })

            beforeEach(async function () {
                const emailParams: ICreateLocalAttributeParams = {
                    content: IdentityAttribute.from({
                        value: EMailAddress.from({
                            value: "my@email.address"
                        }),
                        owner: CoreAddress.from("address")
                    })
                }

                const phoneParams: ICreateLocalAttributeParams = {
                    content: IdentityAttribute.from({
                        value: PhoneNumber.from({
                            value: "000000000"
                        }),
                        owner: CoreAddress.from("address")
                    })
                }
                await consumptionController.attributes.createLocalAttribute(emailParams)
                await consumptionController.attributes.createLocalAttribute(phoneParams)

                mockEventBus.clearPublishedEvents()
            })

            after(async function () {
                await testAccount.close()
            })

            afterEach(async function () {
                const attributes = await consumptionController.attributes.getLocalAttributes()

                for (const attribute of attributes) {
                    await consumptionController.attributes.deleteAttribute(attribute)
                }
            })

            it("should list all attributes", async function () {
                const attributes = await consumptionController.attributes.getLocalAttributes()
                expect(attributes).to.be.of.length(2)
            })

            it("should create new attributes", async function () {
                const attributesBeforeCreate = await consumptionController.attributes.getLocalAttributes()
                const nrAttributesBeforeCreate = attributesBeforeCreate.length

                const birthDateParams: ICreateLocalAttributeParams = {
                    content: IdentityAttribute.from({
                        value: {
                            "@type": "DisplayName",
                            value: "ADisplayName"
                        },
                        owner: CoreAddress.from("address")
                    })
                }

                const birthDate = await consumptionController.attributes.createLocalAttribute(birthDateParams)
                expect(birthDate).instanceOf(LocalAttribute)
                expect(birthDate.content).instanceOf(IdentityAttribute)

                const attributesAfterCreate = await consumptionController.attributes.getLocalAttributes()
                const nrAttributesAfterCreate = attributesAfterCreate.length
                expect(nrAttributesAfterCreate).to.equal(nrAttributesBeforeCreate + 1)

                mockEventBus.expectPublishedEvents(AttributeCreatedEvent)
            }).timeout(15000)

            it("should create LocalAttributes for each property of a complex Identity Attribute", async function () {
                const attributesBeforeCreate = await consumptionController.attributes.getLocalAttributes()
                const nrAttributesBeforeCreate = attributesBeforeCreate.length

                const identityAttribute = IdentityAttribute.from({
                    value: {
                        "@type": "StreetAddress",
                        recipient: "ARecipient",
                        street: "AStreet",
                        houseNo: "AHouseNo",
                        zipCode: "AZipCode",
                        city: "ACity",
                        country: "DE"
                    },
                    validTo: CoreDate.utc(),
                    owner: CoreAddress.from("address")
                })

                const address = await consumptionController.attributes.createLocalAttribute({
                    content: identityAttribute
                })

                expect(address).instanceOf(LocalAttribute)
                expect(address.content).instanceOf(IdentityAttribute)

                const childAttributes = await consumptionController.attributes.getLocalAttributes({
                    parentId: address.id.toString()
                })
                expect(childAttributes).to.have.length(5)
                expect(childAttributes[0].content.value).to.be.instanceOf(Street)
                expect(childAttributes[1].content.value).to.be.instanceOf(HouseNumber)
                expect(childAttributes[2].content.value).to.be.instanceOf(ZipCode)
                expect(childAttributes[3].content.value).to.be.instanceOf(City)
                expect(childAttributes[4].content.value).to.be.instanceOf(Country)

                const attributesAfterCreate = await consumptionController.attributes.getLocalAttributes()
                const nrAttributesAfterCreate = attributesAfterCreate.length
                expect(nrAttributesAfterCreate).equals(nrAttributesBeforeCreate + 6)
            }).timeout(15000)

            it("should trigger an AttributeCreatedEvent for each created child Attribute of a complex Attribute", async function () {
                await consumptionController.attributes.getLocalAttributes()

                const identityAttribute = IdentityAttribute.from({
                    value: {
                        "@type": "StreetAddress",
                        recipient: "ARecipient",
                        street: "AStreet",
                        houseNo: "AHouseNo",
                        zipCode: "AZipCode",
                        city: "ACity",
                        country: "DE"
                    },
                    validTo: CoreDate.utc(),
                    owner: CoreAddress.from("address")
                })

                await consumptionController.attributes.createLocalAttribute({ content: identityAttribute })

                mockEventBus.expectPublishedEvents(
                    AttributeCreatedEvent,
                    AttributeCreatedEvent,
                    AttributeCreatedEvent,
                    AttributeCreatedEvent,
                    AttributeCreatedEvent,
                    AttributeCreatedEvent
                )
            }).timeout(15000)

            it("should delete an attribute", async function () {
                const attributes = await consumptionController.attributes.getLocalAttributes()
                const nrAttributesBeforeDelete = attributes.length
                await consumptionController.attributes.deleteAttribute(attributes[0])

                const attributesAfterDelete = await consumptionController.attributes.getLocalAttributes()
                const nrAttributesAfterDelete = attributesAfterDelete.length
                expect(nrAttributesAfterDelete).equals(nrAttributesBeforeDelete - 1)

                const attributesJSON = attributesAfterDelete.map((v) => v.id.toString())
                expect(attributesJSON).not.to.include(attributes[0]?.id.toString())

                mockEventBus.expectLastPublishedEvent(AttributeDeletedEvent)
            })

            it("should succeed attributes", async function () {
                const displayNameParams: ICreateLocalAttributeParams = {
                    content: IdentityAttribute.from({
                        value: {
                            "@type": "DisplayName",
                            value: "ADisplayName"
                        },
                        owner: CoreAddress.from("address")
                    })
                }

                const successorDate = CoreDate.utc()
                const displayNameSuccessor = IdentityAttribute.from({
                    value: {
                        "@type": "DisplayName",
                        value: "ANewDisplayName"
                    },
                    owner: CoreAddress.from("address"),
                    validFrom: successorDate
                })

                const attribute = await consumptionController.attributes.createLocalAttribute(displayNameParams)
                const createSuccessorParams: ISucceedLocalAttributeParams = {
                    successorContent: displayNameSuccessor,
                    succeeds: attribute.id
                }
                const successor = await consumptionController.attributes.succeedLocalAttribute(createSuccessorParams)
                const succeededAttribute = await consumptionController.attributes.getLocalAttribute(attribute.id)
                expect(succeededAttribute?.content.validTo?.toISOString()).to.equal(
                    successorDate.subtract(1).toISOString()
                )

                const succeessorAttribute = await consumptionController.attributes.getLocalAttribute(successor.id)
                expect(succeessorAttribute?.content.validFrom?.toISOString()).to.equal(successorDate.toISOString())

                const allAttributes = await consumptionController.attributes.getLocalAttributes()
                const allAttributesJSON = allAttributes.map((v) => v.id.toString())
                expect(allAttributesJSON).to.include(succeededAttribute?.id.toString())

                const currentAttributes = consumptionController.attributes.filterCurrent(allAttributes)
                const currentAttributesJSON = currentAttributes.map((v) => v.id.toString())
                expect(currentAttributesJSON).to.not.include(succeededAttribute?.id.toString())
                expect(currentAttributesJSON).to.include(succeessorAttribute?.id.toString())

                mockEventBus.expectLastPublishedEvent(AttributeSucceededEvent)
            })

            it("should throw when trying to succeed an Attribute with a parent", async function () {
                const originalContent = IdentityAttribute.from({
                    value: {
                        "@type": "StreetAddress",
                        recipient: "ARecipient",
                        street: "AStreet",
                        houseNo: "AHouseNo",
                        zipCode: "AZipCode",
                        city: "ACity",
                        country: "DE"
                    },
                    validTo: CoreDate.utc(),
                    owner: CoreAddress.from("address")
                })

                const localParentAttribute = await consumptionController.attributes.createLocalAttribute({
                    content: originalContent
                })

                const localStreetAttribute = (
                    await consumptionController.attributes.getLocalAttributes({
                        parentId: localParentAttribute.id.toString(),
                        "content.value.@type": "Street"
                    })
                )[0]

                const streetSuccessorContent = IdentityAttribute.from({
                    value: {
                        "@type": "Street",
                        value: "ANewStreet"
                    },
                    owner: CoreAddress.from("address"),
                    validFrom: CoreDate.utc()
                })

                const createSuccessorParams: ISucceedLocalAttributeParams = {
                    successorContent: streetSuccessorContent,
                    succeeds: localStreetAttribute.id
                }
                await TestUtil.expectThrowsAsync(
                    consumptionController.attributes.succeedLocalAttribute(createSuccessorParams),
                    (e) =>
                        e instanceof CoreError &&
                        e.code === "error.consumption.attributes.cannotSucceedAttributesWithAParent"
                )
            })

            it("should allow to create a share attribute copy", async function () {
                const nationalityParams: ICreateLocalAttributeParams = {
                    content: IdentityAttribute.from({
                        value: {
                            "@type": "Nationality",
                            value: "DE"
                        },
                        owner: testAccount.identity.address
                    })
                }
                const nationalityAttribute = await consumptionController.attributes.createLocalAttribute(
                    nationalityParams
                )

                const peer = CoreAddress.from("address")
                const createSharedAttributesParams: ICreateSharedLocalAttributeCopyParams = {
                    sourceAttributeId: nationalityAttribute.id,
                    peer: peer,
                    requestReference: CoreId.from("requestId")
                }

                const sharedNationalityAttribute =
                    await consumptionController.attributes.createSharedLocalAttributeCopy(createSharedAttributesParams)
                expect(sharedNationalityAttribute).instanceOf(LocalAttribute)
                expect(sharedNationalityAttribute.shareInfo?.peer).to.deep.equal(peer)

                mockEventBus.expectLastPublishedEvent(SharedAttributeCopyCreatedEvent)
            })

            it("should allow to query public relationship attributes", async function () {
                const relationshipAttributeParams: ICreateLocalAttributeParams = {
                    content: RelationshipAttribute.from({
                        key: "customerId",
                        value: {
                            "@type": "ProprietaryString",
                            value: "0815",
                            title: "Customer ID"
                        },
                        owner: testAccount.identity.address,
                        confidentiality: RelationshipAttributeConfidentiality.Public
                    })
                }
                await consumptionController.attributes.createLocalAttribute(relationshipAttributeParams)

                const query: IRelationshipAttributeQuery = {
                    key: "customerId",
                    owner: testAccount.identity.address,
                    attributeCreationHints: {
                        valueType: "ProprietaryString",
                        title: "someHintTitle",
                        confidentiality: "public" as RelationshipAttributeConfidentiality
                    }
                }

                const attribute = await consumptionController.attributes.executeRelationshipAttributeQuery(query)
                expect(attribute).to.exist
                expect(attribute!.content).to.be.instanceOf(RelationshipAttribute)
                expect((attribute!.content as RelationshipAttribute).key).to.equal("customerId")
            })

            it("should allow to query protected relationship attributes", async function () {
                const relationshipAttributeParams: ICreateLocalAttributeParams = {
                    content: RelationshipAttribute.from({
                        key: "customerId",
                        value: {
                            "@type": "ProprietaryString",
                            value: "0815",
                            title: "Customer ID"
                        },
                        owner: testAccount.identity.address,
                        confidentiality: RelationshipAttributeConfidentiality.Protected
                    })
                }
                await consumptionController.attributes.createLocalAttribute(relationshipAttributeParams)

                const query: IRelationshipAttributeQuery = {
                    key: "customerId",
                    owner: testAccount.identity.address,
                    attributeCreationHints: {
                        valueType: "ProprietaryString",
                        title: "someHintTitle",
                        confidentiality: RelationshipAttributeConfidentiality.Protected
                    }
                }

                const attribute = await consumptionController.attributes.executeRelationshipAttributeQuery(query)
                expect(attribute).to.exist
                expect(attribute!.content).to.be.instanceOf(RelationshipAttribute)
                expect((attribute!.content as RelationshipAttribute).key).to.equal("customerId")
            })

            it("should not allow to query private relationship attributes", async function () {
                const relationshipAttributeParams: ICreateLocalAttributeParams = {
                    content: RelationshipAttribute.from({
                        key: "customerId",
                        value: {
                            "@type": "ProprietaryString",
                            value: "0815",
                            title: "Customer ID"
                        },
                        owner: testAccount.identity.address,
                        confidentiality: RelationshipAttributeConfidentiality.Private
                    })
                }
                await consumptionController.attributes.createLocalAttribute(relationshipAttributeParams)

                const query: IRelationshipAttributeQuery = {
                    key: "customerId",
                    owner: testAccount.identity.address,
                    attributeCreationHints: {
                        valueType: "ProprietaryString",
                        title: "someHintTitle",
                        confidentiality: RelationshipAttributeConfidentiality.Private
                    }
                }

                const attribute = await consumptionController.attributes.executeRelationshipAttributeQuery(query)
                expect(attribute).to.not.exist
            })

            it("should query relationship attributes using the ThirdPartyRelationshipAttributeQuery", async function () {
                const relationshipAttribute = await consumptionController.attributes.createPeerLocalAttribute({
                    content: RelationshipAttribute.from({
                        key: "customerId",
                        value: {
                            "@type": "ProprietaryString",
                            value: "0815",
                            title: "Customer ID"
                        },
                        owner: testAccount.identity.address,
                        confidentiality: RelationshipAttributeConfidentiality.Protected
                    }),
                    peer: CoreAddress.from("peerAddress"),
                    requestReference: CoreId.from("requestId")
                })

                const attributes = await consumptionController.attributes.executeThirdPartyRelationshipAttributeQuery({
                    key: "customerId",
                    owner: testAccount.identity.address,
                    thirdParty: [CoreAddress.from("peerAddress")]
                })
                expect(attributes).to.have.lengthOf(1)
                expect(attributes[0].id.toString()).to.equal(relationshipAttribute.id.toString())
            })

            it("should not query relationship attributes with confidentiality set to `Private` using the ThirdPartyRelationshipAttributeQuery", async function () {
                await consumptionController.attributes.createPeerLocalAttribute({
                    content: RelationshipAttribute.from({
                        key: "customerId",
                        value: {
                            "@type": "ProprietaryString",
                            value: "0815",
                            title: "Customer ID"
                        },
                        owner: testAccount.identity.address,
                        confidentiality: RelationshipAttributeConfidentiality.Private
                    }),
                    peer: CoreAddress.from("peerAddress"),
                    requestReference: CoreId.from("requestId")
                })

                const attributes = await consumptionController.attributes.executeThirdPartyRelationshipAttributeQuery({
                    key: "customerId",
                    owner: testAccount.identity.address,
                    thirdParty: [CoreAddress.from("peerAddress")]
                })
                expect(attributes).to.have.lengthOf(0)
            })

            it("should not query relationship attributes with not matching key using the ThirdPartyRelationshipAttributeQuery", async function () {
                await consumptionController.attributes.createPeerLocalAttribute({
                    content: RelationshipAttribute.from({
                        key: "customerId",
                        value: {
                            "@type": "ProprietaryString",
                            value: "0815",
                            title: "Customer ID"
                        },
                        owner: testAccount.identity.address,
                        confidentiality: RelationshipAttributeConfidentiality.Private
                    }),
                    peer: CoreAddress.from("peerAddress"),
                    requestReference: CoreId.from("requestId")
                })

                const attributes = await consumptionController.attributes.executeThirdPartyRelationshipAttributeQuery({
                    key: "notMatchingKey",
                    owner: testAccount.identity.address,
                    thirdParty: [CoreAddress.from("peerAddress")]
                })
                expect(attributes).to.have.lengthOf(0)
            })

            it("should allow to query identity attributes", async function () {
                const identityAttributeParams: ICreateLocalAttributeParams = {
                    content: IdentityAttribute.from({
                        value: {
                            "@type": "Nationality",
                            value: "DE"
                        },
                        owner: testAccount.identity.address
                    })
                }
                const identityAttribute = await consumptionController.attributes.createLocalAttribute(
                    identityAttributeParams
                )

                const relationshipAttributeParams: ICreateLocalAttributeParams = {
                    content: RelationshipAttribute.from({
                        key: "customerId",
                        value: {
                            "@type": "ProprietaryString",
                            value: "0815",
                            title: "Customer Id"
                        },
                        owner: testAccount.identity.address,
                        confidentiality: "public" as RelationshipAttributeConfidentiality
                    })
                }
                const relationshipAttribute = await consumptionController.attributes.createLocalAttribute(
                    relationshipAttributeParams
                )

                const query: IIdentityAttributeQuery = {
                    valueType: "Nationality"
                }

                const attributes = await consumptionController.attributes.executeIdentityAttributeQuery(query)
                const attributesId = attributes.map((v) => v.id.toString())
                expect(attributesId).to.not.include(relationshipAttribute.id.toString())
                expect(attributesId).to.include(identityAttribute.id.toString())
            })

            it("should only return repository attributes on IdentityAttributeQuery", async function () {
                const identityAttributeParams: ICreateLocalAttributeParams = {
                    content: IdentityAttribute.from({
                        value: {
                            "@type": "DisplayName",
                            value: "Dis Play"
                        },
                        owner: testAccount.identity.address
                    })
                }
                const identityAttribute = await consumptionController.attributes.createLocalAttribute(
                    identityAttributeParams
                )

                const relationshipAttributeParams: ICreateLocalAttributeParams = {
                    content: RelationshipAttribute.from({
                        key: "displayName",
                        value: {
                            "@type": "ProprietaryString",
                            title: "A Title",
                            value: "DE"
                        },
                        owner: testAccount.identity.address,
                        confidentiality: "public" as RelationshipAttributeConfidentiality
                    })
                }
                const relationshipAttribute = await consumptionController.attributes.createLocalAttribute(
                    relationshipAttributeParams
                )

                const peerAttributeParams: ICreateLocalAttributeParams = {
                    content: IdentityAttribute.from({
                        value: {
                            "@type": "DisplayName",
                            value: "DE"
                        },
                        owner: CoreAddress.from("peer")
                    })
                }
                const peerAttribute = await consumptionController.attributes.createLocalAttribute(peerAttributeParams)

                const sentAttribute = await consumptionController.attributes.createSharedLocalAttributeCopy({
                    peer: CoreAddress.from("peer"),
                    requestReference: CoreId.from("ref"),
                    sourceAttributeId: identityAttribute.id
                })

                const receivedAttribute = await consumptionController.attributes.createSharedLocalAttributeCopy({
                    peer: CoreAddress.from("peer"),
                    requestReference: CoreId.from("ref2"),
                    sourceAttributeId: peerAttribute.id,
                    attributeId: CoreId.from("attr1")
                })

                const query: IIdentityAttributeQuery = {
                    valueType: "DisplayName"
                }

                const attributes = await consumptionController.attributes.executeIdentityAttributeQuery(query)
                const attributesId = attributes.map((v) => v.id.toString())
                expect(attributes).to.be.of.length(1)
                expect(attributesId).to.not.include(relationshipAttribute.id.toString())
                expect(attributesId).to.not.include(peerAttribute.id.toString())
                expect(attributesId).to.not.include(sentAttribute.id.toString())
                expect(attributesId).to.not.include(receivedAttribute.id.toString())
                expect(attributesId).to.include(identityAttribute.id.toString())
            })

            it("should allow to create an attribute shared by a peer", async function () {
                const attribute: ICreateLocalAttributeParams = {
                    content: IdentityAttribute.from({
                        value: {
                            "@type": "Nationality",
                            value: "DE"
                        },
                        owner: CoreAddress.from("address")
                    })
                }
                const localAttribute = await consumptionController.attributes.createLocalAttribute(attribute)
                const createPeerAttributeParams: ICreatePeerLocalAttributeParams = {
                    id: localAttribute.id,
                    content: attribute.content,
                    requestReference: CoreId.from("requestId"),
                    peer: CoreAddress.from("address")
                }
                const peerLocalAttribute = await consumptionController.attributes.createPeerLocalAttribute(
                    createPeerAttributeParams
                )
                expect(peerLocalAttribute.content.toJSON()).deep.equals(localAttribute.content.toJSON())
                expect(peerLocalAttribute.content.value).instanceOf(Nationality)
                expect(createPeerAttributeParams.id).equals(localAttribute.id)
                expect(createPeerAttributeParams.peer.address).equals(CoreAddress.from("address").toString())
                expect(createPeerAttributeParams.requestReference.toString()).equals(
                    CoreId.from("requestId").toString()
                )

                mockEventBus.expectLastPublishedEvent(AttributeCreatedEvent)
            })

            describe("hideTechnical", function () {
                beforeEach(async function () {
                    await consumptionController.attributes.createLocalAttribute({
                        content: RelationshipAttribute.from({
                            key: "notTechnical",
                            value: {
                                "@type": "ProprietaryString",
                                value: "0815",
                                title: "Customer ID"
                            },
                            isTechnical: false,
                            owner: testAccount.identity.address,
                            confidentiality: RelationshipAttributeConfidentiality.Public
                        })
                    })

                    await consumptionController.attributes.createLocalAttribute({
                        content: RelationshipAttribute.from({
                            key: "isTechnicalNotDefined",
                            value: {
                                "@type": "ProprietaryString",
                                value: "0815",
                                title: "Customer ID"
                            },
                            owner: testAccount.identity.address,
                            confidentiality: RelationshipAttributeConfidentiality.Public
                        })
                    })

                    await consumptionController.attributes.createLocalAttribute({
                        content: RelationshipAttribute.from({
                            key: "technical",
                            value: {
                                "@type": "ProprietaryString",
                                value: "0815",
                                title: "Customer ID"
                            },
                            isTechnical: true,
                            owner: testAccount.identity.address,
                            confidentiality: RelationshipAttributeConfidentiality.Public
                        })
                    })
                })

                it("should hide technical attributes when no query is given", async function () {
                    const attributes = await consumptionController.attributes.getLocalAttributes(undefined, true)
                    expect(attributes.length).to.equal(4)
                })

                it("should hide technical attributes when empty query is given", async function () {
                    const attributes = await consumptionController.attributes.getLocalAttributes({}, true)
                    expect(attributes.length).to.equal(4)
                })
            })
        })
    }
}
