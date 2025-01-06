import { IBranch } from '@/entities/branch/model/types';
import { ISchedule } from '@/entities/schedule/model/types';
import { IdName, IResponse } from '@/shared/types/Types';

interface IEmployeeBase {
    first_name: string;
    last_name: string;
    phone: string;
}

interface IEmployeeIdentifiers {
    id?: number;
    position_id: number;
    schedule_id: number;
    organization_id: number;
    branch_id: number;
}
export interface IEmployeeResponse extends Omit<IResponse, 'detail'> {
    data: IEmployee;
}
export interface IEmployee extends IEmployeeBase {
    id: number;
    full_name: string;
    first_image: IEmployeeImage;
    branch: IBranch;
    position: IdName;
    schedule: ISchedule;
    organization_id: number;
}

export interface IEmployeePost
    extends IEmployeeBase,
        Omit<IEmployeeIdentifiers, 'id'> {}
export interface IEmployeePatch
    extends IEmployeeBase,
        Omit<IEmployeeIdentifiers, 'organization_id'> {}

export interface IEmployeeImage {
    id: number;
    url: string;
    pose: string;
    det_score: number;
    person_type: string;
    person_id: number;
}

export interface IEmployeeImagePost {
    id: number | string;
    file: File;
}

export interface IEmployeeSliceState {
    isCreatingEmployee: boolean;
    isUpdatingEmployee: boolean;
    employeeForm: IEmployeePatch | null;
    employeeTablePage: number;
    employeeTableLimit: number;
}

export interface IEmployeeParams {
    branch_id?: number;
}
