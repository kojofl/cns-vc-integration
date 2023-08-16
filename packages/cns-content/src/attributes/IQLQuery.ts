import { serialize, type, validate } from "@js-soft/ts-serval"
import * as Iql from "@nmshd/iql"
import { AbstractAttributeQuery, AbstractAttributeQueryJSON, IAbstractAttributeQuery } from "./AbstractAttributeQuery"
export interface IQLQueryJSON extends AbstractAttributeQueryJSON {
    "@type": "IQLQuery"
    queryString: string
}

export interface IIQLQuery extends IAbstractAttributeQuery {
    queryString: string
}

@type("IQLQuery")
export class IQLQuery extends AbstractAttributeQuery implements IIQLQuery {
    @serialize()
    @validate({
        max: 4096,
        customValidator: (v) => {
            const result = Iql.validate(v)
            return !result.isValid
                ? `invalid IQL query at character offset ${result.error?.location.start.column}`
                : undefined
        }
    })
    public queryString: string

    public static from(value: IIQLQuery | Omit<IQLQueryJSON, "@type">): IQLQuery {
        return this.fromAny(value)
    }

    public override toJSON(verbose?: boolean | undefined, serializeAsString?: boolean | undefined): IQLQueryJSON {
        return super.toJSON(verbose, serializeAsString) as IQLQueryJSON
    }
}
