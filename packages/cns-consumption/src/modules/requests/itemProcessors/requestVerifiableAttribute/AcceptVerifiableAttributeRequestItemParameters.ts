import { Serializable, serialize, type, validate, ValidationError } from "@js-soft/ts-serval"
import {
    IdentityAttribute,
    IdentityAttributeJSON,
    RelationshipAttribute,
    RelationshipAttributeJSON
} from "@nmshd/content"
import { CoreId } from "@nmshd/transport"
import { nameof } from "ts-simple-nameof"
import { ConsumptionError } from "../../../../consumption"
import { AcceptRequestItemParametersJSON } from "../../incoming/decide/AcceptRequestItemParameters"


export interface AcceptVerifiableAttributeRequestItemParametersJSON
    extends AcceptRequestItemParametersJSON {
    attribute: IdentityAttributeJSON | RelationshipAttributeJSON
}

@type("AcceptVerifiableAttributeRequestItemParameters")
export class AcceptVerifiableAttributeRequestItemParameters extends Serializable {

    @serialize({ unionTypes: [IdentityAttribute, RelationshipAttribute] })
    @validate({ nullable: true })
    public attribute: IdentityAttribute | RelationshipAttribute

    public static from(
        value: AcceptVerifiableAttributeRequestItemParametersJSON
    ): AcceptVerifiableAttributeRequestItemParameters {
        return this.fromAny(value)
    }

    protected static override postFrom<T extends Serializable>(value: T): T {
        if (!(value instanceof AcceptVerifiableAttributeRequestItemParameters)) {
            throw new ConsumptionError("this should never happen")
        }

        if (!value.attribute.proof) {
            throw new ValidationError(AcceptVerifiableAttributeRequestItemParameters.name,
                nameof<AcceptVerifiableAttributeRequestItemParameters>((x) => x.attribute),
                `You cannot respont to a ${AcceptVerifiableAttributeRequestItemParameters.name} with a ${nameof<AcceptVerifiableAttributeRequestItemParameters>((x) => x.attribute)} that is not verifiable`)
        }

        return value
    }
}
