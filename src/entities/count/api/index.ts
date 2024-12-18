import { api } from '@/shared';
import {
    ClientData,
    IClientIntervalData,
    IClientIntervalParams,
    IClientParams,
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
    }),
});

export const { useGetClientsStatisticQuery, useGetClientsByIntervalQuery } = BranchAPI;
