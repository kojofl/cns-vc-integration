import { ApplicationError } from "@js-soft/ts-utils"
import { CoreError, CoreId } from "@nmshd/transport"

class Attributes {
    public cannotSucceedAttributesWithAParent(parentId: string | CoreId) {
        return new CoreError(
            "error.consumption.attributes.cannotSucceedAttributesWithAParent",
            `The Attribute you want to succeed has a parent (id: ${parentId.toString()}). You cannot succeed Attributes with a parent. Instead, succeed the parent, which will implicitly succeed all its children.`
        )
    }
}

class Requests {
    public unexpectedErrorDuringRequestItemProcessing(error: any) {
        return new CoreError(
            "error.consumption.requests.unexpectedErrorDuringRequestItemProcessing",
            error instanceof Error ? error.message : `Unknown error: '${JSON.stringify(error)}'`,
            undefined,
            undefined,
            error
        )
    }

    public servalErrorDuringRequestItemProcessing(error: any) {
        return new CoreError(
            "error.consumption.requests.servalErrorDuringRequestItemProcessing",
            error instanceof Error ? error.message : `Serval error: '${JSON.stringify(error)}'`,
            undefined,
            undefined,
            error
        )
    }

    public invalidRequestItem(message: string) {
        return new CoreError("error.consumption.requests.invalidRequestItem", message)
    }

    private static readonly _decideValidation = class {
        public invalidNumberOfItems(message: string) {
            return new ApplicationError("error.consumption.requests.decide.validation.invalidNumberOfItems", message)
        }

        public itemAcceptedButParentNotAccepted(message: string): ApplicationError {
            return new ApplicationError(
                "error.consumption.requests.decide.validation.itemAcceptedButParentNotAccepted",
                message
            )
        }

        public mustBeAcceptedItemNotAccepted(message: string): ApplicationError {
            return new ApplicationError(
                "error.consumption.requests.decide.validation.mustBeAcceptedItemNotAccepted",
                message
            )
        }

        public requestItemAnsweredAsRequestItemGroup(): ApplicationError {
            return new ApplicationError(
                "error.consumption.requests.decide.validation.requestItemAnsweredAsRequestItemGroup",
                "The RequestItem was answered as a RequestItemGroup."
            )
        }

        public requestItemGroupAnsweredAsRequestItem(): ApplicationError {
            return new ApplicationError(
                "error.consumption.requests.decide.validation.requestItemGroupAnsweredAsRequestItem",
                "The RequestItemGroup was answered as a RequestItem."
            )
        }
    }

    public readonly decideValidation = new Requests._decideValidation()
}

export class CoreErrors {
    public static attributes = new Attributes()
    public static requests = new Requests()
}
