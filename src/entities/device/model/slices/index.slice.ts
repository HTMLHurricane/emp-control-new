import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDevicePatch, IDeviceSliceState } from '../types';

const initialState: IDeviceSliceState = {
    isCreatingDevice: false,
    isUpdatingDevice: false,
    deviceForm: null,
    deviceTablePage: 1,
    deviceTableLimit: 10,
};

const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setIsCreatingDevice(state, { payload }: PayloadAction<boolean>) {
            state.isCreatingDevice = payload;
        },
        setIsUpdatingDevice(state, { payload }: PayloadAction<boolean>) {
            state.isUpdatingDevice = payload;
        },
        setDeviceForm(state, { payload }: PayloadAction<IDevicePatch>) {
            state.deviceForm = payload;
        },
    },
});

export const { reducer, actions } = deviceSlice;
