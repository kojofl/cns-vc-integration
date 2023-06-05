import {
    IdentityAttributeQuery,
    RelationshipAttributeQuery,
    ThirdPartyRelationshipAttributeQuery
} from "@nmshd/content"
import { CoreAddress } from "@nmshd/transport"
import { CoreErrors } from "../../../../consumption"
import { ValidationResult } from "../ValidationResult"

export default function validateQuery(
    query: IdentityAttributeQuery | RelationshipAttributeQuery | ThirdPartyRelationshipAttributeQuery,
    sender: CoreAddress,
    recipient?: CoreAddress
): ValidationResult {
    if (query instanceof ThirdPartyRelationshipAttributeQuery) {
        for (const thirdParty of query.thirdParty) {
            const result = validateThirdParty(thirdParty, sender, recipient)
            if (result.isError()) return result
        }

        if (query.owner.equals(sender)) {
            return ValidationResult.error(
                CoreErrors.requests.invalidRequestItem("Cannot query own Attributes from a third party.")
            )
        }
    }

    return ValidationResult.success()
}

function validateThirdParty(thirdParty: CoreAddress, sender: CoreAddress, recipient?: CoreAddress): ValidationResult {
    if (thirdParty.equals(sender)) {
        return ValidationResult.error(
            CoreErrors.requests.invalidRequestItem("Cannot query an Attribute with the own address as third party.")
        )
    }

    if (thirdParty.equals(recipient)) {
        return ValidationResult.error(
            CoreErrors.requests.invalidRequestItem(
                "Cannot query an Attribute with the recipient's address as third party."
            )
        )
    }

    return ValidationResult.success()
}
