import { IdName } from '@/shared/types/Types';

export interface ISchedule extends IdName {
    work_hours: IScheduleDay[];
}

export interface IScheduleDay {
    day_of_week:
        | 'MONDAY'
        | 'TUESDAY'
        | 'WEDNESDAY'
        | 'THURSDAY'
        | 'FRIDAY'
        | 'SATURDAY'
        | 'SUNDAY';
    id: number;
    schedule_id: number;
    status: 'WORK' | 'REST';
    start_time: string | null;
    end_time: string | null;
}

export type IScheduleDayPost = Omit<IScheduleDay, 'id' | 'schedule_id'>;

export type ISchedulePost = {
    organization_id: number;
    work_hours: IScheduleDayPost[];
} & Omit<ISchedule, 'id' | 'work_hours'>;

export type ISchedulePatch = Omit<ISchedulePost, 'organization_id'> & IdName;

export interface IScheduleSliceState {
    isCreatingSchedule: boolean;
    isUpdatingSchedule: boolean;
    scheduleForm: ISchedulePatch | null;
    scheduleTablePage: number;
    scheduleTableLimit: number;
}
