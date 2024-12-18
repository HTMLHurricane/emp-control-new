import { AttendanceEmployeeDetailsById } from '@/entities/employee-info/model';
import { IEmployee } from '@/entities/employee/model/types';
import { IPaginationParams } from '@/shared/types/Types';
import dayjs from 'dayjs';

export interface IDailyAttendance {
    id: number;
    full_name: string;
    position_name: string;
    branch_name: string;
    time_in: string;
    time_out: string;
    time_schedule_in: string;
    time_schedule_out: string;
}

export interface IAttendanceParams extends IPaginationParams {
    date: string | undefined;
    branch_id: number | undefined;
}

export interface ILastAttendance extends AttendanceEmployeeDetailsById {
    employee: IEmployee;
}

export interface IHomeSliceInitState {
    collapsed: boolean;
    homeDate: dayjs.Dayjs;
    homeMonthData: dayjs.Dayjs;
    branch: number | undefined;
    attendanceBranch: number | undefined;
    isNotComeModal: boolean;
    isLateModal: boolean;
    isComeModal: boolean;
}
