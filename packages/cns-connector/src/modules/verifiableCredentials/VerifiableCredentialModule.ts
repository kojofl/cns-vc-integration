import { ConnectorRuntimeModule, ConnectorRuntimeModuleConfiguration } from "../../ConnectorRuntimeModule";
import { CoreBuffer } from "@nmshd/crypto";
import { DeviceSecretType } from "@nmshd/transport";
import { HttpMethod } from "../../infrastructure";

export interface VerifiableCredentialModuleConfig extends ConnectorRuntimeModuleConfiguration {}

export default class VerifiableCredential extends ConnectorRuntimeModule<VerifiableCredentialModuleConfig> {
    private identityPublicKey: string;
    private identityPrivateKey: string;

    public async init(): Promise<void> {
        // content: IdentityAttributeJSON | RelationshipAttributeJSON;
        // subjectDid: string;
        // publicKey: string,
        // privateKey: string,
        this.runtime.infrastructure.httpServer.addEndpoint(HttpMethod.Post, "/signVC", false, async (_req, res) => {
            const vc = await this.runtime.consumptionServices.attributes.createVerifiableCredential({
                content: { alumniOf: "Example University" },
                subjectDid: "did:key:test"
            });
            console.log(vc);
            res.status(201).send(vc);
        });

        this.runtime.infrastructure.httpServer.addEndpoint(HttpMethod.Post, "/test", false, async (_req, res) => {
            const address = (await this.runtime.transportServices.account.getIdentityInfo()).value.address;
        });
    }

    public start(): void | Promise<void> {
        /* Nothing to do */
    }
    public stop(): void | Promise<void> {
        /* Nothing to do */
    }
}
