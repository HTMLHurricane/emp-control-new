import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBranchPatch, IBranchSliceState } from '../types';

const currentDate = new Date();

const initialState: IBranchSliceState = {
    isCreatingBranch: false,
    isUpdatingBranch: false,
    branchForm: null,
    branchDate: currentDate.toISOString().split('T')[0],
};

const BranchSlice = createSlice({
    name: 'Branch',
    initialState,
    reducers: {
        setIsCreatingBranch(state, { payload }: PayloadAction<boolean>) {
            state.isCreatingBranch = payload;
        },
        setIsUpdatingBranch(state, { payload }: PayloadAction<boolean>) {
            state.isUpdatingBranch = payload;
        },
        setBranchForm(state, { payload }: PayloadAction<IBranchPatch>) {
            state.branchForm = payload;
        },
        setBranchDate(state, { payload }: PayloadAction<string>) {
            state.branchDate = payload;
        },
    },
});
export const { reducer, actions } = BranchSlice;
