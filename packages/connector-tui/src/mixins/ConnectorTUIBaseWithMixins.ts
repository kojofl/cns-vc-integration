import { ConnectorTUIBase } from "../ConnectorTUIBase"
import { AddAcceptPendingRelationships } from "./AddAcceptPendingRelationships"
import { AddAcceptPendingRequests } from "./AddAcceptPendingRequests"
import { AddExit } from "./AddExit"
import { AddRequestVerifiableAttribute } from "./AddRequestVerifiableAttribute"
import { AddGetAttributesOfRelationship } from "./AddGetAttributesOfRelationship"
import { AddSendMail } from "./AddSendMail"
import { AddSendRequestByMessage } from "./AddSendRequestByMessage"
import { AddShareRequestByTemplate } from "./AddShareRequestByTemplate"
import { AddCreateAndShowTemplate } from "./AddShowTemplate"
import { AddSync } from "./AddSync"
import { AddUploadFile } from "./AddUploadFile"
import { AddStartRelationship } from "./AddStartRelationship"
import { AddListIdentityAttributes } from "./AddListIdentityAttributes"
import { AddCreateIdentityAttributes } from "./AddCreateIdentityAttributes"

export class ConnectorTUIBaseWithMixins
    //
    extends AddExit(
        AddCreateIdentityAttributes(
            AddListIdentityAttributes(
                AddStartRelationship(
                    AddRequestVerifiableAttribute(
                        AddCreateAndShowTemplate(
                            AddAcceptPendingRelationships(
                                AddAcceptPendingRequests(
                                    AddGetAttributesOfRelationship(
                                        AddSendMail(
                                            AddSendRequestByMessage(
                                                AddShareRequestByTemplate(
                                                    AddSync(
                                                        AddUploadFile(
                                                            //
                                                            ConnectorTUIBase
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    ))
                            )
                        )
                    )
                )
            )
        )
    ) { }
