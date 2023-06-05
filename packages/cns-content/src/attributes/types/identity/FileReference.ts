import { type } from "@js-soft/ts-serval"
import { AbstractStringJSON, IAbstractString } from "../AbstractString"
import { AbstractFileReference } from "../strings"

export interface FileReferenceJSON extends AbstractStringJSON {
    "@type": "FileReference"
}

export interface IFileReference extends IAbstractString {}

@type("FileReference")
export class FileReference extends AbstractFileReference implements IFileReference {
    public static from(value: IFileReference | Omit<FileReferenceJSON, "@type"> | string): FileReference {
        return this.fromAny(value)
    }

    public override toJSON(verbose?: boolean | undefined, serializeAsString?: boolean | undefined): FileReferenceJSON {
        return super.toJSON(verbose, serializeAsString) as FileReferenceJSON
    }
}
