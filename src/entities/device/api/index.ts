import { api } from '@/shared';
import { Device, IDevicePatch, IDevicePost } from '../model/types';
import { IResponse } from '@/shared/types/Types';

export const deviceApi = api.injectEndpoints({
    endpoints: (build) => ({
        getDevices: build.query<Device[], void>({
            query: () => ({
                url: 'devices',
                method: 'GET',
            }),
            providesTags: ['device'],
        }),
        createDevice: build.mutation<IResponse['message'], IDevicePost>({
            query: (body) => ({
                url: 'devices',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['device'],
        }),
        updateDevice: build.mutation<IResponse['message'], IDevicePatch>({
            query: ({ device_id, ...body }) => ({
                url: `devices/${device_id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['device'],
        }),
        deleteDevice: build.mutation<IResponse['message'], number>({
            query: (id) => ({
                url: `devices/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['device'],
        }),
    }),
});
export const {
    useGetDevicesQuery,
    useCreateDeviceMutation,
    useUpdateDeviceMutation,
    useDeleteDeviceMutation,
} = deviceApi;
