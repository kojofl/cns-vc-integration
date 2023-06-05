import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreId, ICoreId } from "@nmshd/transport"
import { AcceptResponseItem, AcceptResponseItemJSON, IAcceptResponseItem } from "../../response"

export interface SucceedAttributeAcceptResponseItemJSON extends AcceptResponseItemJSON {
    "@type": "SucceedAttributeAcceptResponseItem"
    attributeId: string
}

export interface ISucceedAttributeAcceptResponseItem extends IAcceptResponseItem {
    attributeId: ICoreId
}

@type("SucceedAttributeAcceptResponseItem")
export class SucceedAttributeAcceptResponseItem
    extends AcceptResponseItem
    implements ISucceedAttributeAcceptResponseItem
{
    @serialize()
    @validate()
    public attributeId: CoreId

    public static override from(
        value: ISucceedAttributeAcceptResponseItem | SucceedAttributeAcceptResponseItemJSON
    ): SucceedAttributeAcceptResponseItem {
        return this.fromAny(value)
    }

    public override toJSON(
        verbose?: boolean | undefined,
        serializeAsString?: boolean | undefined
    ): SucceedAttributeAcceptResponseItemJSON {
        return super.toJSON(verbose, serializeAsString) as SucceedAttributeAcceptResponseItemJSON
    }
}
