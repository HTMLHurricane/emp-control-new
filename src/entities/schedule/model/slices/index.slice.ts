import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISchedule, IScheduleSliceState } from '../types';

const initialState: IScheduleSliceState = {
    isCreatingSchedule: false,
    isUpdatingSchedule: false,
    scheduleForm: null,
    scheduleTableLimit: 10,
    scheduleTablePage: 1,
};

const ScheduleSlice = createSlice({
    name: 'Schedule',
    initialState,
    reducers: {
        setIsCreatingSchedule(state, { payload }: PayloadAction<boolean>) {
            state.isCreatingSchedule = payload;
        },
        setIsUpdatingSchedule(state, { payload }: PayloadAction<boolean>) {
            state.isUpdatingSchedule = payload;
        },
        setScheduleForm(state, { payload }: PayloadAction<ISchedule>) {
            state.scheduleForm = payload;
        },
        setScheduleTablePage(state, { payload }: PayloadAction<number>) {
            state.scheduleTablePage = payload;
        },
        setScheduleTableLimit(state, { payload }: PayloadAction<number>) {
            state.scheduleTableLimit = payload;
        },
    },
});
export const { reducer, actions } = ScheduleSlice;
