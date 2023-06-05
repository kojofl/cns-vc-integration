import { serialize, type, validate } from "@js-soft/ts-serval"
import { ICoreDate } from "@nmshd/transport"
import nameOf from "easy-tsnameof";
import { ValueHints } from "../../hints";
import { AbstractComplexValue, IAbstractComplexValue } from "../../AbstractComplexValue";

export interface VerifiableCredentialJSON extends AbstractComplexValue {
    "@type": "VerifiableCredential"
    "@context": string | string[],
    id?: string,
    type: string | string[],
    issuer: string,
    validFrom: string,
    expirationDate?: string,
    credentialSubject: CredentialSubject,
    proof: Proof
}

type CredentialSubject = Record<string, any>;

interface Proof {
    type: string,
    created: string,
    proofPurpose: string,
    verificationMethod: string,
    jws?: string,
    [key: string]: any,
}

export interface IVerifiableCredential extends IAbstractComplexValue {
    "@context": string | string[],
    id?: string,
    type: string | string[],
    issuer: string,
    validFrom: ICoreDate,
    expirationDate?: ICoreDate,
    credentialSubject: CredentialSubject,
    proof: Proof
}

@type("VerifiableCredential")
export class VerifiableCredential extends AbstractComplexValue implements IVerifiableCredential {
    public static readonly propertyNames = nameOf<VerifiableCredential, never>()

    @serialize()
    @validate({
        customValidator: (v: string | string[]) => {
            const arr = typeof v === "string" ? [v] : v;
            if (!arr.some((el) => el === "https://www.w3.org/ns/credentials/v2" || el === "https://www.w3.org/ns/credentials/v1")) {
                return "The @context attribute of a verifibale credential has to be either https://www.w3.org/ns/credentials/v1 or https://www.w3.org/ns/credentials/v2";
            }
            return undefined
        } 
    })
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public "@context": string | string[];
    public id?: string;
    public expirationDate?: ICoreDate;

    @serialize()
    @validate()
    public type: string | string[];

    @serialize()
    @validate({ regExp: new RegExp("^did:(\\w+):.+") })
    public issuer: string;

    @serialize()
    @validate()
    public validFrom: ICoreDate;

    @serialize()
    @validate()
    public credentialSubject: CredentialSubject;

    @serialize()
    @validate()
    public proof: Proof;

    public static from(
        value: IVerifiableCredential
    ): VerifiableCredential {
        return this.fromAny(value)
    }

    public static get valueHints(): ValueHints {
        return new ValueHints()
    }

    public override toJSON(
        verbose?: boolean | undefined,
        serializeAsString?: boolean | undefined
    ): VerifiableCredentialJSON {
        return super.toJSON(verbose, serializeAsString) as VerifiableCredentialJSON
    }
}
