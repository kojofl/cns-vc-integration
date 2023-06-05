import { SimpleLoggerFactory } from "@js-soft/simple-logger"
import { HintsInheritanceTest } from "./attributes/HintsInheritance.test"
import { IdentityAttributeTest } from "./attributes/IdentityAttribute.test"
import { IdentityAttributeQueryTest } from "./attributes/IdentityAttributeQuery.test"
import { RelationshipAttributeTest } from "./attributes/RelationshipAttribute.test"
import { RelationshipAttributeHintsTest } from "./attributes/RelationshipAttributeHints.test"
import { RenderHintsTest } from "./attributes/RenderHints.test"
import { ThirdPartyRelationshipAttributeQueryTest } from "./attributes/ThirdPartyRelationshipAttributeQuery.test"
import { ValueHintsTest } from "./attributes/ValueHints.test"
import { AddressValueTests } from "./attributeValues/AddressValueTests.test"
import { BirthValueTests } from "./attributeValues/BirthValueTests.test"
import { NameValueTests } from "./attributeValues/NameValueTests.test"
import { ProprietaryJSONTests } from "./attributeValues/ProprietaryJSON.test"
import { MailTest } from "./messages/Mail.test"
import { RequestTest } from "./requests/Request.test"
import { ResponseTest } from "./requests/Response.test"
import { ResponseWrapperTest } from "./requests/ResponseWrapper.test"

const loggerFactory = new SimpleLoggerFactory()

new ValueHintsTest(loggerFactory).run()
new RenderHintsTest(loggerFactory).run()
new HintsInheritanceTest(loggerFactory).run()
new MailTest(loggerFactory).run()
new RequestTest(loggerFactory).run()
new ResponseTest(loggerFactory).run()
new RelationshipAttributeTest(loggerFactory).run()
new IdentityAttributeTest(loggerFactory).run()
new IdentityAttributeQueryTest(loggerFactory).run()
new NameValueTests(loggerFactory).run()
new BirthValueTests(loggerFactory).run()
new AddressValueTests(loggerFactory).run()
new RelationshipAttributeHintsTest(loggerFactory).run()
new ProprietaryJSONTests(loggerFactory).run()
new ThirdPartyRelationshipAttributeQueryTest(loggerFactory).run()
new ResponseWrapperTest(loggerFactory).run()
