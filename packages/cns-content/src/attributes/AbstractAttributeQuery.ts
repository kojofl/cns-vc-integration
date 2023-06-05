import { serialize, validate } from "@js-soft/ts-serval"
import { CoreDate, CoreSerializable, ICoreDate, ICoreSerializable } from "@nmshd/transport"
import { ContentJSON } from "../ContentJSON"

export interface AbstractAttributeQueryJSON extends ContentJSON {
    validFrom?: string
    validTo?: string
}

export interface IAbstractAttributeQuery extends ICoreSerializable {
    validFrom?: ICoreDate
    validTo?: ICoreDate
}

export abstract class AbstractAttributeQuery extends CoreSerializable implements IAbstractAttributeQuery {
    @serialize()
    @validate({ nullable: true })
    public validFrom?: CoreDate

    @serialize()
    @validate({ nullable: true })
    public validTo?: CoreDate
}
