import { IBranch } from '@/entities/branch/model/types';
import { IdName } from '@/shared/types/Types';

export interface Device extends IdName {
    path: string;
    branch_id: number;
    organization_id: number;
    branch: IBranch;
    is_active: boolean;
}

export type IDevicePost = Omit<Device, 'branch' | 'is_active'>;
export interface IDevicePatch extends IdName {
    device_id: number;
    path: string;
    is_active: boolean;
}

export interface IDeviceSliceState {
    isCreatingDevice: boolean;
    isUpdatingDevice: boolean;
    deviceForm: IDevicePatch | null;
    deviceTablePage: number;
    deviceTableLimit: number;
}
