import { serialize, type, validate } from "@js-soft/ts-serval"
import {
    IdentityAttribute,
    IdentityAttributeJSON,
    IIdentityAttribute,
    IRelationshipAttribute,
    RelationshipAttribute,
    RelationshipAttributeJSON
} from "@nmshd/content"
import {
    CoreAddress,
    CoreDate,
    CoreId,
    CoreSynchronizable,
    ICoreDate,
    ICoreId,
    ICoreSynchronizable
} from "@nmshd/transport"
import { nameof } from "ts-simple-nameof"
import { ConsumptionIds } from "../../../consumption"
import {
    ILocalAttributeShareInfo,
    LocalAttributeShareInfo,
    LocalAttributeShareInfoJSON
} from "./LocalAttributeShareInfo"

export interface LocalAttributeJSON {
    content: IdentityAttributeJSON | RelationshipAttributeJSON
    createdAt: string
    succeeds: string
    succeededBy: string
    shareInfo: LocalAttributeShareInfoJSON
    parentId?: string
}

export interface ILocalAttribute extends ICoreSynchronizable {
    content: IIdentityAttribute | IRelationshipAttribute
    createdAt: ICoreDate
    succeeds?: ICoreId
    succeededBy?: ICoreId
    shareInfo?: ILocalAttributeShareInfo
    parentId?: ICoreId
}

@type("LocalAttribute")
export class LocalAttribute extends CoreSynchronizable implements ILocalAttribute {
    public override readonly technicalProperties = [
        "@type",
        "@context",
        nameof<LocalAttribute>((r) => r.createdAt),
        nameof<LocalAttribute>((r) => r.succeeds),
        nameof<LocalAttribute>((r) => r.succeededBy),
        nameof<LocalAttribute>((r) => r.shareInfo),
        nameof<LocalAttribute>((r) => r.parentId)
    ]

    public override readonly userdataProperties = [nameof<LocalAttribute>((r) => r.content)]

    @validate()
    @serialize({ unionTypes: [IdentityAttribute, RelationshipAttribute] })
    public content: IdentityAttribute | RelationshipAttribute

    @validate()
    @serialize()
    public createdAt: CoreDate

    @validate({ nullable: true })
    @serialize()
    public succeeds?: CoreId

    @validate({ nullable: true })
    @serialize()
    public succeededBy?: CoreId

    @validate({ nullable: true })
    @serialize()
    public shareInfo?: LocalAttributeShareInfo

    @validate({ nullable: true })
    @serialize()
    public parentId?: CoreId

    public isIdentityAttribute(): this is IdentityAttribute {
        return this.content instanceof IdentityAttribute
    }

    public isRelationshipAttribute(): this is RelationshipAttribute {
        return this.content instanceof RelationshipAttribute
    }

    public isOwnedBy(identity: CoreAddress): boolean {
        return this.content.owner.equals(identity)
    }

    public isRepositoryAttribute(): this is IdentityAttribute & { shareInfo: LocalAttributeShareInfo } {
        return this.isIdentityAttribute() && !this.isShared()
    }

    public isShared(): this is { shareInfo: LocalAttributeShareInfo } {
        return this.shareInfo !== undefined
    }

    public isSharedWith(address: CoreAddress): this is { shareInfo: LocalAttributeShareInfo } {
        if (!this.isShared()) {
            return false
        }

        return this.shareInfo.peer === address
    }

    public static from(value: ILocalAttribute): LocalAttribute {
        return this.fromAny(value)
    }

    public static async fromAttribute(
        content: IIdentityAttribute | IRelationshipAttribute,
        succeeds?: ICoreId,
        shareInfo?: ILocalAttributeShareInfo,
        id?: CoreId,
        parentId?: CoreId
    ): Promise<LocalAttribute> {
        return this.from({
            id: id ?? (await ConsumptionIds.attribute.generate()),
            createdAt: CoreDate.utc(),
            content,
            succeeds,
            shareInfo,
            parentId
        })
    }
}
