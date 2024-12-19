import { api } from '@/shared';
import {
    IAttendanceClientParams,
    IClientAttendance,
    ITopClientDetail,
    ITopClients,
    ITopClientsParams,
} from '../models/types';
import { IData, IResponse } from '@/shared/types/Types';

export const clientApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTopClients: build.query<ITopClients[], ITopClientsParams>({
            query: (params) => ({
                url: 'clients/top_client',
                params,
            }),
            providesTags: ['client'],
        }),
        getTopClientById: build.query<ITopClientDetail, string | undefined>({
            query: (id) => ({
                url: `clients/get_client_by_id?client_id=${id}`,
            }),
            providesTags: ['client'],
        }),
        getClientAttendances: build.query<
            IData<IClientAttendance[]>,
            IAttendanceClientParams
        >({
            query: (params) => ({
                url: 'client_attendances/get_by_client_id',
                params,
            }),
            providesTags: ['client'],
        }),
        deleteClient: build.mutation<IResponse['detail'], number>({
            query: (id) => ({
                url: `clients/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['client'],
        }),
    }),
});

export const {
    useGetTopClientsQuery,
    useGetTopClientByIdQuery,
    useGetClientAttendancesQuery,
    useDeleteClientMutation,
} = clientApi;
