import { api } from '@/shared';
import { IdName, IResponse } from '@/shared/types/Types';
import { IRolePost } from '../model/types';

export const roleApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllRoles: builder.query<IdName[], void>({
            query: () => ({
                url: 'positions',
            }),
            providesTags: ['role'],
        }),
        createRole: builder.mutation<IResponse['message'], IRolePost>({
            query: (body) => ({
                url: 'positions',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['role'],
        }),
        updateRole: builder.mutation<IdName, IdName>({
            query: ({ id, ...body }) => ({
                url: `positions/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['role'],
        }),
        deleteRole: builder.mutation<IResponse['message'], number>({
            query: (id) => ({
                url: `positions/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['role'],
        }),
    }),
});

export const {
    useGetAllRolesQuery,
    useCreateRoleMutation,
    useDeleteRoleMutation,
    useUpdateRoleMutation,
} = roleApi;
