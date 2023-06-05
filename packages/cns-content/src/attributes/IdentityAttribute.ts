import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttribute, AbstractAttributeJSON, IAbstractAttribute } from "./AbstractAttribute"
import { AttributeValues } from "./AttributeValueTypes"

export interface IdentityAttributeJSON<
    TValueJSONInterface extends AttributeValues.Identity.Json = AttributeValues.Identity.Json
> extends AbstractAttributeJSON {
    "@type": "IdentityAttribute"
    value: TValueJSONInterface
    tags?: string[]
}

export interface IIdentityAttribute<
    TValueInterface extends AttributeValues.Identity.Interface = AttributeValues.Identity.Interface
> extends IAbstractAttribute {
    value: TValueInterface
    tags?: string[]
}

@type("IdentityAttribute")
export class IdentityAttribute<TValueClass extends AttributeValues.Identity.Class = AttributeValues.Identity.Class>
    extends AbstractAttribute
    implements IIdentityAttribute<TValueClass>
{
    @serialize({ unionTypes: AttributeValues.Identity.CLASSES })
    @validate()
    public value: TValueClass

    @serialize({ type: String })
    @validate({ nullable: true, customValidator: IdentityAttribute.validateTags })
    public tags?: string[]

    public static from<
        TValueClass extends AttributeValues.Identity.Class = AttributeValues.Identity.Class,
        TValueInterface extends AttributeValues.Identity.Interface = AttributeValues.Identity.Interface,
        TValueJSONInterface extends AttributeValues.Identity.Json = AttributeValues.Identity.Json
    >(
        value: IIdentityAttribute<TValueInterface> | Omit<IdentityAttributeJSON<TValueJSONInterface>, "@type">
    ): IdentityAttribute<TValueClass> {
        return this.fromAny(value) as IdentityAttribute<TValueClass>
    }

    public override toJSON(
        verbose?: boolean | undefined,
        serializeAsString?: boolean | undefined
    ): IdentityAttributeJSON {
        return super.toJSON(verbose, serializeAsString) as IdentityAttributeJSON
    }

    private static validateTags(tags: string[]) {
        if (tags.length > 20) {
            return "The maximum number of tags is 20."
        }

        if (tags.some((tag) => tag.length > 100)) {
            return "The maximum length of a tag is 100 characters."
        }

        return undefined
    }
}
