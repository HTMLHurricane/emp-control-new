import { api } from '@/shared';
import {
    ClientData,
    IClientIntervalData,
    IClientIntervalParams,
    IClientParams,
    IPeakHoursClients,
} from '../model/types';

export const BranchAPI = api.injectEndpoints({
    endpoints: (build) => ({
        getClientsStatistic: build.query<ClientData, IClientParams>({
            query: (params) => ({
                url: 'clients/get_all_info',
                method: 'GET',
                params,
            }),
        }),
        getClientsByInterval: build.query<
            IClientIntervalData,
            IClientIntervalParams
        >({
            query: (params) => ({
                url: 'clients/get_all_info_interval',
                method: 'GET',
                params,
            }),
        }),
        getPeakHoursClients: build.query<
            IPeakHoursClients[],
            { start_time_str: string; end_time_str: string; branch_id: number }
        >({
            query: (params) => ({
                url: 'clients/get_clients_by_datetime_range',
                method: 'GET',
                params,
            }),
        }),
        getRegularClients: build.query<
            IPeakHoursClients[],
            { start_date_str: string; end_date_str: string; branch_id: number }
        >({
            query: (params) => ({
                url: `clients/get_regular_clients`,
                method: 'GET',
                params,
            }),
        }),
    }),
});

export const {
    useGetClientsStatisticQuery,
    useGetClientsByIntervalQuery,
    useGetPeakHoursClientsQuery,
    useGetRegularClientsQuery,
} = BranchAPI;
