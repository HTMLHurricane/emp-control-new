import { api } from '@/shared';
import { ISchedule, ISchedulePatch, ISchedulePost } from '../model/types';
import { IResponse } from '@/shared/types/Types';

export const scheduleApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllSchedules: builder.query<ISchedule[], void>({
            query: () => ({
                url: 'schedules',
                method: 'GET',
            }),
            providesTags: ['schedule'],
        }),
        createSchedule: builder.mutation<IResponse['message'], ISchedulePost>({
            query: (body) => ({
                url: 'schedules',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['schedule'],
        }),
        updateSchedule: builder.mutation<unknown, ISchedulePatch>({
            query: ({ id, ...body }) => ({
                url: `schedules/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['schedule'],
        }),
        deleteSchedule: builder.mutation<unknown, number>({
            query: (id) => ({
                url: `schedules/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['schedule'],
        }),
    }),
});

export const {
    useCreateScheduleMutation,
    useGetAllSchedulesQuery,
    useDeleteScheduleMutation,
    useUpdateScheduleMutation,
} = scheduleApi;
