import { api } from '@/shared';
import { IDailyAttendance, IAttendanceParams, ILastAttendance } from '../model';
import { IData, IPaginationParams } from '@/shared/types/Types';

export const HomeAPI = api.injectEndpoints({
    endpoints: (builder) => ({
        getLineData: builder.query<
            IData<IDailyAttendance[]>,
            IAttendanceParams
        >({
            query: (params) => ({
                url: 'daily_empl/get_employee_with_daily_attendance_by_date',
                params,
            }),
        }),
        getLastData: builder.query<IData<ILastAttendance[]>, IPaginationParams>(
            {
                query: (params) => ({
                    url: 'employee_attendances/last_employee_attendance',
                    params,
                }),
            },
        ),
        getAllClientsInfo: builder.query<
            { all_clinets: number; returning_clients: number },
            void
        >({
            query: () => ({
                url: 'clients/get_all_clients_info',
            }),
        }),
    }),
});

export const { useGetLastDataQuery, useGetLineDataQuery, useGetAllClientsInfoQuery } = HomeAPI;
