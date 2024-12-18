import { api } from '@/shared';
import { IOrganizationPost } from '../model/types';
import { IdName, IResponse } from '@/shared/types/Types';

export const organizationApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createOrganization: builder.mutation<
            IResponse['message'],
            IOrganizationPost
        >({
            query: (body) => ({
                url: 'organizations',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['organization'],
        }),
        getOrganization: builder.query<IdName[], void>({
            query: () => ({
                url: 'organizations',
                method: 'GET',
            }),
            providesTags: ['organization'],
        }),
        updateOrganization: builder.mutation<IdName, IdName>({
            query: ({ id, ...body }) => ({
                url: `organizations/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['organization'],
        }),
        getOrganizationById: builder.query<IdName, number>({
            query: (id) => ({
                url: `organizations/${id}`,
                method: 'GET',
            }),
            providesTags: ['organization'],
        }),
        deleteOrganization: builder.mutation<IResponse['detail'], number>({
            query: (id) => ({
                url: `organizations/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['organization'],
        }),
    }),
});

export const {
    useCreateOrganizationMutation,
    useDeleteOrganizationMutation,
    useGetOrganizationByIdQuery,
    useGetOrganizationQuery,
    useUpdateOrganizationMutation,
} = organizationApi;
