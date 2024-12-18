import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRoleSliceState } from '../types';
import { IdName } from '@/shared/types/Types';

const initialState: IRoleSliceState = {
    isCreatingRole: false,
    isUpdatingRole: false,
    roleForm: null,
    roleTableLimit: 10,
    roleTablePage: 1,
};

const RoleSlice = createSlice({
    name: 'Role',
    initialState,
    reducers: {
        setIsCreatingRole(state, { payload }: PayloadAction<boolean>) {
            state.isCreatingRole = payload;
        },
        setIsUpdatingRole(state, { payload }: PayloadAction<boolean>) {
            state.isUpdatingRole = payload;
        },
        setRoleForm(state, { payload }: PayloadAction<IdName>) {
            state.roleForm = payload;
        },
        setRoleTablePage(state, { payload }: PayloadAction<number>) {
            state.roleTablePage = payload;
        },
        setRoleTableLimit(state, { payload }: PayloadAction<number>) {
            state.roleTableLimit = payload;
        },
    },
});
export const { reducer, actions } = RoleSlice;
