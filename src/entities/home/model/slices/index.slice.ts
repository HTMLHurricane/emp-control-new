import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IHomeSliceInitState } from '../types';
import dayjs from 'dayjs';

const initialState: IHomeSliceInitState = {
    collapsed: false,
    homeDate: dayjs(),
    homeMonthData: dayjs(),
    branch: undefined,
    isNotComeModal: false,
    isLateModal: false,
    isComeModal: false,
    attendanceBranch: undefined,
};

const HomeSlice = createSlice({
    name: 'Branch',
    initialState,
    reducers: {
        setHomeDate(state, { payload }: PayloadAction<dayjs.Dayjs>) {
            state.homeDate = payload;
        },
        setHomeMonthDate(state, { payload }: PayloadAction<dayjs.Dayjs>) {
            state.homeMonthData = payload;
        },
        setBranch(state, { payload }: PayloadAction<number | undefined>) {
            state.branch = payload;
        },
        setIsNotComeModal(state, { payload }: PayloadAction<boolean>) {
            state.isNotComeModal = payload;
        },
        setIsLateModal(state, { payload }: PayloadAction<boolean>) {
            state.isLateModal = payload;
        },
        setIsComeModal(state, { payload }: PayloadAction<boolean>) {
            state.isComeModal = payload;
        },
        setAttendanceBranch(
            state,
            { payload }: PayloadAction<number | undefined>,
        ) {
            state.attendanceBranch = payload;
        },
        setCollapsed(state, { payload }: PayloadAction<boolean>) {
            state.collapsed = payload;
        },
    },
});
export const { reducer, actions } = HomeSlice;
