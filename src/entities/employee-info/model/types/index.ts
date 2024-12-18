import { Device } from '@/entities/device/model/types';
import { IPaginationParams } from '@/shared/types/Types';

export interface IDailyAttendanceById {
    employee_id: number;
    attendance_in: AttendanceEmployeeDetailsById;
    attendance_out: AttendanceEmployeeDetailsById;
    time_in: string;
    time_out: string;
    time_schedule_in: string;
    time_schedule_out: string;
    duration: string;
    late: string;
    early: string;
    created_at: string;
}

export interface AttendanceEmployeeDetailsById {
    employee_id: number;
    device_id: number;
    url: string;
    pose: string;
    score: number;
    date: string;
    id: number;
    organization_id: number;
    device: Device;
}

export interface IEmployeeParams extends IPaginationParams {
    employee_id: string | undefined;
}
