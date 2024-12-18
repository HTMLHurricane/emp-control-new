import { api } from '@/shared';
import {
    IBranch,
    IBranchPost,
    IBranchPatch,
    IBranchResponse,
    IBranchesInfo,
} from '../model/types';
import { IResponse } from '@/shared/types/Types';

export const branchApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllBranches: builder.query<IBranch[], void>({
            query: () => ({
                url: 'branches',
                method: 'GET',
            }),
            providesTags: ['branch'],
        }),
        getBranchesInfo: builder.query<IBranchesInfo[], string>({
            query: (date) => ({
                url: `branches/get_branches_info?date=${date}`,
                method: 'GET',
            }),
            providesTags: ['branch'],
        }),
        getActiveBranches: builder.query<IBranch, void>({
            query: () => ({
                url: 'branches/get_active',
                method: 'GET',
            }),
            providesTags: ['branch'],
        }),
        createBranch: builder.mutation<IResponse['message'], IBranchPost>({
            query: (body) => ({
                url: 'branches',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['branch'],
        }),
        updateBranch: builder.mutation<IBranch, IBranchPatch>({
            query: ({ id, ...body }) => ({
                url: `branches/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['branch'],
        }),
        deleteBranch: builder.mutation<IBranchResponse, number>({
            query: (id) => ({
                url: `branches/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['branch'],
        }),
    }),
});

export const {
    useGetAllBranchesQuery,
    useCreateBranchMutation,
    useDeleteBranchMutation,
    useUpdateBranchMutation,
    useGetBranchesInfoQuery,
} = branchApi;
