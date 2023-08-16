import { serialize, validate } from "@js-soft/ts-serval"
import nameOf from "easy-tsnameof"
import {
    AbstractComplexValue,
    AbstractComplexValueJSON,
    IAbstractComplexValue
} from "../../../attributes/AbstractComplexValue"
import { RenderHints, RenderHintsEditType, RenderHintsTechnicalType, ValueHints } from "../../../attributes/hints"
import { IdentityAttribute, IdentityAttributeJSON, IIdentityAttribute } from "../../IdentityAttribute"

export interface AbstractIdentityDescriptorJSON extends AbstractComplexValueJSON {
    attributes?: IdentityAttributeJSON[]
}

export interface IAbstractIdentityDescriptor extends IAbstractComplexValue {
    attributes?: IIdentityAttribute[]
}

export abstract class AbstractIdentityDescriptor extends AbstractComplexValue implements IAbstractIdentityDescriptor {
    public static readonly propertyNames: any = nameOf<AbstractIdentityDescriptor, never>()

    @serialize()
    @validate({ nullable: true })
    public attributes?: IdentityAttribute[]

    public static get valueHints(): ValueHints {
        return ValueHints.from({
            propertyHints: {
                [this.propertyNames.attributes.$path]: ValueHints.from({})
            }
        })
    }

    public static override get renderHints(): RenderHints {
        return super.renderHints.copyWith({
            propertyHints: {
                [this.propertyNames.attributes.$path]: RenderHints.from({
                    editType: RenderHintsEditType.Complex,
                    technicalType: RenderHintsTechnicalType.Object
                })
            }
        })
    }
}
