import { Result } from "@js-soft/ts-utils";
import { Inject } from "typescript-ioc";
import { FileDTO, TokenDTO } from "../../../types";
import {
    CreateQrCodeForFileRequest,
    CreateQrCodeForFileResponse,
    CreateQrCodeForFileUseCase,
    CreateTokenForFileRequest,
    CreateTokenForFileUseCase,
    CreateTokenQrCodeForFileRequest,
    CreateTokenQrCodeForFileResponse,
    CreateTokenQrCodeForFileUseCase,
    DownloadFileRequest,
    DownloadFileResponse,
    DownloadFileUseCase,
    GetFileRequest,
    GetFilesRequest,
    GetFilesUseCase,
    GetFileUseCase,
    GetOrLoadFileRequest,
    GetOrLoadFileUseCase,
    UploadOwnFileRequest,
    UploadOwnFileUseCase
} from "../../../useCases";

export class FilesFacade {
    public constructor(
        @Inject private readonly uploadOwnFileUseCase: UploadOwnFileUseCase,
        @Inject private readonly getOrLoadFileUseCase: GetOrLoadFileUseCase,
        @Inject private readonly getFilesUseCase: GetFilesUseCase,
        @Inject private readonly downloadFileUseCase: DownloadFileUseCase,
        @Inject private readonly getFileUseCase: GetFileUseCase,
        @Inject private readonly createQrCodeForFileUseCase: CreateQrCodeForFileUseCase,
        @Inject private readonly createTokenForFileUseCase: CreateTokenForFileUseCase,
        @Inject private readonly createTokenQrCodeForFileUseCase: CreateTokenQrCodeForFileUseCase
    ) {}

    public async getFiles(request: GetFilesRequest): Promise<Result<FileDTO[]>> {
        return await this.getFilesUseCase.execute(request);
    }

    public async getOrLoadFile(request: GetOrLoadFileRequest): Promise<Result<FileDTO>> {
        return await this.getOrLoadFileUseCase.execute(request);
    }

    public async downloadFile(request: DownloadFileRequest): Promise<Result<DownloadFileResponse>> {
        return await this.downloadFileUseCase.execute(request);
    }

    public async getFile(request: GetFileRequest): Promise<Result<FileDTO>> {
        return await this.getFileUseCase.execute(request);
    }

    public async uploadOwnFile(request: UploadOwnFileRequest): Promise<Result<FileDTO>> {
        return await this.uploadOwnFileUseCase.execute(request);
    }

    public async createQrCodeForFile(request: CreateQrCodeForFileRequest): Promise<Result<CreateQrCodeForFileResponse>> {
        return await this.createQrCodeForFileUseCase.execute(request);
    }

    public async createTokenForFile(request: CreateTokenForFileRequest): Promise<Result<TokenDTO>> {
        return await this.createTokenForFileUseCase.execute(request);
    }

    public async createTokenQrCodeForFile(request: CreateTokenQrCodeForFileRequest): Promise<Result<CreateTokenQrCodeForFileResponse>> {
        return await this.createTokenQrCodeForFileUseCase.execute(request);
    }
}
