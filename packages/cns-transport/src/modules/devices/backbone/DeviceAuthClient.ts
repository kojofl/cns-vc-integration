import { RESTClientAuthenticate, RESTClientLogDirective } from "../../../core"
import { ClientResult } from "../../../core/backbone/ClientResult"
import { BackbonePostDevicesRequest, BackbonePostDevicesResponse } from "./BackbonePostDevices"

export interface BackbonePutDevicesPasswordRequest {
    oldPassword: string
    newPassword: string
}

export interface BackbonePutDevicesPushNotificationRequest {
    platform: string
    handle: string
    installationId: string
}

export class DeviceAuthClient extends RESTClientAuthenticate {
    protected override _logDirective = RESTClientLogDirective.LogResponse

    public async changeDevicePassword(input: BackbonePutDevicesPasswordRequest): Promise<ClientResult<void>> {
        return await this.put<void>("/api/v1/Devices/Self/Password", input, {})
    }

    public async createDevice(value: BackbonePostDevicesRequest): Promise<ClientResult<BackbonePostDevicesResponse>> {
        return await this.post<BackbonePostDevicesResponse>("/api/v1/Devices", value, {})
    }

    public async registerPushNotificationToken(
        input: BackbonePutDevicesPushNotificationRequest
    ): Promise<ClientResult<void>> {
        return await this.put<void>("/api/v1/Devices/Self/PushNotifications", input)
    }
}
