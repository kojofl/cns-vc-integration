import { Result } from "@js-soft/ts-utils";
import { Inject } from "typescript-ioc";
import { LocalAttributeDTO, LocalRequestDTO } from "../../../types";
import {
    CreateAttributeRequest,
    CreateAttributeUseCase,
    CreateVerifiableCredentialRequest,
    CreateVerifiableCredentialUseCase,
    CreateSharedAttributeCopyRequest,
    CreateSharedAttributeCopyUseCase,
    DeleteAttributeRequest,
    DeleteAttributeUseCase,
    ExecuteIdentityAttributeQueryRequest,
    ExecuteIdentityAttributeQueryUseCase,
    ExecuteRelationshipAttributeQueryRequest,
    ExecuteRelationshipAttributeQueryUseCase,
    ExecuteThirdPartyRelationshipAttributeQueryRequest,
    ExecuteThirdPartyRelationshipAttributeQueryUseCase,
    GetAttributeRequest,
    GetAttributesRequest,
    GetAttributesUseCase,
    GetAttributeUseCase,
    GetPeerAttributesRequest,
    GetPeerAttributesUseCase,
    GetSharedToPeerAttributesRequest,
    GetSharedToPeerAttributesUseCase,
    ShareAttributeRequest,
    ShareAttributeUseCase,
    SucceedAttributeRequest,
    SucceedAttributeUseCase,
    UpdateAttributeRequest,
    UpdateAttributeUseCase,
    CreateVerifiableAttributeRequest,
    CreateVerifiableAttributeUseCase,
    VerifyVerifiableCredentialRequest,
    VerifyVerifiableCredentialUseCase
} from "../../../useCases";

export class AttributesFacade {
    public constructor(
        @Inject private readonly createAttributeUseCase: CreateAttributeUseCase,
        @Inject private readonly createSharedAttributeCopyUseCase: CreateSharedAttributeCopyUseCase,
        @Inject private readonly createVerifiableCredentialUseCase: CreateVerifiableCredentialUseCase,
        @Inject private readonly createVerifiableAttributeUseCase: CreateVerifiableAttributeUseCase,
        @Inject private readonly verifyVerifiableAttributeUseCase: VerifyVerifiableCredentialUseCase,
        @Inject private readonly deleteAttributeUseCase: DeleteAttributeUseCase,
        @Inject private readonly getPeerAttributesUseCase: GetPeerAttributesUseCase,
        @Inject private readonly getSharedToPeerAttributesUseCase: GetSharedToPeerAttributesUseCase,
        @Inject private readonly getAttributeUseCase: GetAttributeUseCase,
        @Inject private readonly getAttributesUseCase: GetAttributesUseCase,
        @Inject private readonly succeedAttributeUseCase: SucceedAttributeUseCase,
        @Inject private readonly updateAttributeUseCase: UpdateAttributeUseCase,
        @Inject private readonly executeIdentityAttributeQueryUseCase: ExecuteIdentityAttributeQueryUseCase,
        @Inject private readonly executeRelationshipAttributeQueryUseCase: ExecuteRelationshipAttributeQueryUseCase,
        @Inject private readonly executeThirdPartyRelationshipAttributeQueryUseCase: ExecuteThirdPartyRelationshipAttributeQueryUseCase,
        @Inject private readonly shareAttributeUseCase: ShareAttributeUseCase
    ) {}

    public async createAttribute(request: CreateAttributeRequest): Promise<Result<LocalAttributeDTO>> {
        return await this.createAttributeUseCase.execute(request);
    }

    public async createSharedAttributeCopy(request: CreateSharedAttributeCopyRequest): Promise<Result<LocalAttributeDTO>> {
        return await this.createSharedAttributeCopyUseCase.execute(request);
    }

    public async createVerifiableAttribute(request: CreateVerifiableAttributeRequest): Promise<Result<any>> {
        return await this.createVerifiableAttributeUseCase.execute(request);
    }

    public async createVerifiableCredential(request: CreateVerifiableCredentialRequest): Promise<Result<any>> {
        return await this.createVerifiableCredentialUseCase.execute(request);
    }

    public async verifyVerifiableCredential(request: VerifyVerifiableCredentialRequest): Promise<Result<any>> {
        return await this.verifyVerifiableAttributeUseCase.execute(request);
    }

    public async deleteAttribute(request: DeleteAttributeRequest): Promise<Result<void>> {
        return await this.deleteAttributeUseCase.execute(request);
    }

    public async getPeerAttributes(request: GetPeerAttributesRequest): Promise<Result<LocalAttributeDTO[]>> {
        return await this.getPeerAttributesUseCase.execute(request);
    }

    public async getSharedToPeerAttributes(request: GetSharedToPeerAttributesRequest): Promise<Result<LocalAttributeDTO[]>> {
        return await this.getSharedToPeerAttributesUseCase.execute(request);
    }

    public async getAttribute(request: GetAttributeRequest): Promise<Result<LocalAttributeDTO>> {
        return await this.getAttributeUseCase.execute(request);
    }

    public async getAttributes(request: GetAttributesRequest): Promise<Result<LocalAttributeDTO[]>> {
        return await this.getAttributesUseCase.execute(request);
    }

    public async executeIdentityAttributeQuery(request: ExecuteIdentityAttributeQueryRequest): Promise<Result<LocalAttributeDTO[]>> {
        return await this.executeIdentityAttributeQueryUseCase.execute(request);
    }

    public async executeRelationshipAttributeQuery(request: ExecuteRelationshipAttributeQueryRequest): Promise<Result<LocalAttributeDTO>> {
        return await this.executeRelationshipAttributeQueryUseCase.execute(request);
    }

    public async executeThirdPartyRelationshipAttributeQuery(request: ExecuteThirdPartyRelationshipAttributeQueryRequest): Promise<Result<LocalAttributeDTO[]>> {
        return await this.executeThirdPartyRelationshipAttributeQueryUseCase.execute(request);
    }

    public async succeedAttribute(request: SucceedAttributeRequest): Promise<Result<LocalAttributeDTO>> {
        return await this.succeedAttributeUseCase.execute(request);
    }

    public async updateAttribute(request: UpdateAttributeRequest): Promise<Result<LocalAttributeDTO>> {
        return await this.updateAttributeUseCase.execute(request);
    }

    public async shareAttribute(request: ShareAttributeRequest): Promise<Result<LocalRequestDTO>> {
        return await this.shareAttributeUseCase.execute(request);
    }
}
