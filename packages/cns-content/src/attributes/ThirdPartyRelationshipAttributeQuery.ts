import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreAddress, ICoreAddress } from "@nmshd/transport"
import { AbstractAttributeQuery, AbstractAttributeQueryJSON, IAbstractAttributeQuery } from "./AbstractAttributeQuery"
export interface ThirdPartyRelationshipAttributeQueryJSON extends AbstractAttributeQueryJSON {
    "@type": "ThirdPartyRelationshipAttributeQuery"
    key: string
    owner: string
    thirdParty: string[]
}

export interface IThirdPartyRelationshipAttributeQuery extends IAbstractAttributeQuery {
    key: string
    owner: ICoreAddress
    thirdParty: ICoreAddress[]
}

@type("ThirdPartyRelationshipAttributeQuery")
export class ThirdPartyRelationshipAttributeQuery
    extends AbstractAttributeQuery
    implements IThirdPartyRelationshipAttributeQuery
{
    @serialize()
    @validate({ max: 100 })
    public key: string

    @serialize()
    @validate()
    public owner: CoreAddress

    @serialize({ type: CoreAddress })
    @validate({ customValidator: (v) => (v.length < 1 ? "may not be empty" : undefined) })
    public thirdParty: CoreAddress[]

    protected static override preFrom(value: any): any {
        if (typeof value.thirdParty === "string" || "address" in value.thirdParty) {
            value.thirdParty = [CoreAddress.from(value.thirdParty)]
        }

        return value
    }

    public static from(
        value: IThirdPartyRelationshipAttributeQuery | Omit<ThirdPartyRelationshipAttributeQueryJSON, "@type">
    ): ThirdPartyRelationshipAttributeQuery {
        return this.fromAny(value)
    }

    public override toJSON(
        verbose?: boolean | undefined,
        serializeAsString?: boolean | undefined
    ): ThirdPartyRelationshipAttributeQueryJSON {
        return super.toJSON(verbose, serializeAsString) as ThirdPartyRelationshipAttributeQueryJSON
    }
}
