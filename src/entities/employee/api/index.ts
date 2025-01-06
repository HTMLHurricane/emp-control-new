import { api } from '@/shared';
import {
    IEmployee,
    IEmployeeImage,
    IEmployeeImagePost,
    IEmployeeParams,
    IEmployeePatch,
    IEmployeePost,
    IEmployeeResponse,
} from '../model/types';
import { IResponse } from '@/shared/types/Types';

export const EmployeeAPI = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllEmployees: builder.query<IEmployee[], IEmployeeParams>({
            query: (params) => ({
                url: 'employees/get_employee_by_branch',
                params,
            }),
            providesTags: ['employee'],
        }),
        createEmployee: builder.mutation<IEmployeeResponse, IEmployeePost>({
            query: (body) => ({
                url: 'employees',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['employee'],
        }),
        setEmployeeImage: builder.mutation<IEmployeeImage, IEmployeeImagePost>({
            query: ({ id, file }) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: `employees/add_image?employee_id=${id}`,
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['employee', 'employee_info'],
        }),
        updateEmployee: builder.mutation<IResponse['message'], IEmployeePatch>({
            query: ({ id, ...body }) => ({
                url: `employees/update?employee_id=${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['employee'],
        }),
        deleteEmployee: builder.mutation<IResponse['message'], number>({
            query: (id) => ({
                url: `employees/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['employee', 'employee_info'],
        }),
    }),
});

export const {
    useGetAllEmployeesQuery,
    useCreateEmployeeMutation,
    useDeleteEmployeeMutation,
    useUpdateEmployeeMutation,
    useSetEmployeeImageMutation,
} = EmployeeAPI;
