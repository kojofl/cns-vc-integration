import { ApplicationError } from "@js-soft/ts-utils";
import { Base64ForIdPrefix } from "./Base64ForIdPrefix";

class General {
    public unknown(message: string, data?: any) {
        return new ApplicationError("error.runtime.unknown", message, data);
    }

    public alreadyInitialized() {
        return new ApplicationError("error.runtime.alreadyInitialized", "The runtime is already initialized. The init method can only be executed once.");
    }

    public notInitialized() {
        return new ApplicationError("error.runtime.notInitialized", "The runtime is not initialized. You must run init before you can start or stop the runtime.");
    }

    public alreadyStarted() {
        return new ApplicationError("error.runtime.alreadyStarted", "The runtime is already started. You should stop it first for a restart.");
    }

    public notStarted() {
        return new ApplicationError("error.runtime.notStarted", "The runtime is not started. You can only stop the runtime if you executed start before.");
    }

    public recordNotFound(entityName?: string | Function): ApplicationError {
        return this.recordNotFoundWithMessage(`${entityName instanceof Function ? entityName.name : entityName} not found. Make sure the ID exists and the record is not expired.`);
    }

    public recordNotFoundWithMessage(message: string): ApplicationError {
        return new ApplicationError("error.runtime.recordNotFound", message);
    }

    public invalidPropertyValue(message: string): ApplicationError {
        return new ApplicationError("error.runtime.validation.invalidPropertyValue", message);
    }

    public invalidPayload(message?: string): ApplicationError {
        return new ApplicationError("error.runtime.validation.invalidPayload", message ?? "The given combination of properties in the payload is not supported.");
    }

    public notSupported(message: string) {
        return new ApplicationError("error.runtime.notSupported", message);
    }

    public invalidTokenContent() {
        return new ApplicationError("error.runtime.invalidTokenContent", "The given token has an invalid content for this route.");
    }

    public cacheEmpty(entityName: string | Function, id: string) {
        return new ApplicationError("error.runtime.cacheEmpty", `The cache of ${entityName instanceof Function ? entityName.name : entityName} with id '${id}' is empty.`);
    }
}

class Serval {
    public unknownType(message: string) {
        return new ApplicationError("error.runtime.unknownType", message);
    }

    public general(message: string) {
        return new ApplicationError("error.runtime.servalError", message);
    }

    public requestDeserialization(message: string) {
        return new ApplicationError("error.runtime.requestDeserialization", message);
    }
}

class Files {
    public invalidReference(reference: string): ApplicationError {
        return new ApplicationError(
            "error.runtime.files.invalidReference",
            `The given reference '${reference}' is not valid. The reference for a file must start with '${Base64ForIdPrefix.Token}' or '${Base64ForIdPrefix.File}'.`
        );
    }
}

class RelationshipTemplates {
    public cannotCreateTokenForPeerTemplate(): ApplicationError {
        return new ApplicationError("error.runtime.relationshipTemplates.cannotCreateTokenForPeerTemplate", "You cannot create a token for a peer template.");
    }

    public cannotCreateQRCodeForPeerTemplate(): ApplicationError {
        return new ApplicationError("error.runtime.relationshipTemplates.cannotCreateQRCodeForPeerTemplate", "You cannot create a QRCode for a peer template.");
    }

    public invalidReference(reference: string): ApplicationError {
        return new ApplicationError(
            "error.runtime.relationshipTemplates.invalidReference",
            `The given reference '${reference}' is not valid. The reference for a relationship template must start with '${Base64ForIdPrefix.Token}' or '${Base64ForIdPrefix.RelationshipTemplate}'.`
        );
    }
}

class Messages {
    public fileNotFoundInMessage(attachmentId: string) {
        return new ApplicationError("error.runtime.messages.fileNotFoundInMessage", `The requested file '${attachmentId}' was not found in the given message.`);
    }
}

class Startup {
    public noActiveAccount(): ApplicationError {
        return new ApplicationError("error.runtime.startup.noActiveAccount", "No AccountController could be found. You might have to login first.");
    }

    public noActiveConsumptionController(): ApplicationError {
        return new ApplicationError("error.runtime.startup.noActiveConsumptionController", "No ConsumptionController could be found. You might have to login first.");
    }

    public noActiveExpander(): ApplicationError {
        return new ApplicationError("error.runtime.startup.noActiveExpander", "No DataViewExpander could be found. You might have to login first.");
    }
}

class Challenges {
    public invalidSignature(): ApplicationError {
        return new ApplicationError("error.runtime.challenges.invalidSignature", "The signature is invalid.");
    }

    public invalidChallengeString(): ApplicationError {
        return new ApplicationError("error.runtime.challenges.invalidChallenge", "The challengeString is invalid.");
    }
}

export class RuntimeErrors {
    public static readonly general = new General();
    public static readonly serval = new Serval();
    public static readonly startup = new Startup();
    public static readonly files = new Files();
    public static readonly relationshipTemplates = new RelationshipTemplates();
    public static readonly messages = new Messages();
    public static readonly challenges = new Challenges();
}
