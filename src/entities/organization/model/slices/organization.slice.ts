import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrganizationSliceState } from '../types';
import { IdName } from '@/shared/types/Types';

const initialState: IOrganizationSliceState = {
    isCreatingOrganization: false,
    isUpdatingOrganization: false,
    organizationForm: null,
};

const organizationSlice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
        setIsCreatingOrganization(state, { payload }: PayloadAction<boolean>) {
            state.isCreatingOrganization = payload;
        },
        setIsUpdatingOrganization(state, { payload }: PayloadAction<boolean>) {
            state.isUpdatingOrganization = payload;
        },
        setOrganizationForm(state, { payload }: PayloadAction<IdName>) {
            state.organizationForm = payload;
        },
    },
});

export const { actions, reducer } = organizationSlice;
