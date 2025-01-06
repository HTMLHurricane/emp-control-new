import { IEmployee, IEmployeeImage } from '@/entities/employee/model/types';
import { api } from '@/shared';
import {
    AttendanceEmployeeDetailsById,
    IDailyAttendanceById,
    IEmployeeParams,
} from '../model';
import { IData, IResponse } from '@/shared/types/Types';

export const EmployeeAPI = api.injectEndpoints({
    endpoints: (build) => ({
        getEmployeeById: build.query<IEmployee, string | undefined>({
            query: (id) => ({
                url: `employees/get_by_id?employee_id=${id}`,
                method: 'GET',
            }),
            providesTags: ['employee_info'],
        }),
        getEmployeeImagesById: build.query<
            IData<IEmployeeImage[]>,
            IEmployeeParams
        >({
            query: (params) => ({
                url: 'images/get_images_by_employee_id',
                method: 'GET',
                params,
            }),
            providesTags: ['employee_info'],
        }),
        getDailyAttendanceById: build.query<
            IData<IDailyAttendanceById[]>,
            IEmployeeParams
        >({
            query: (params) => ({
                url: 'daily_empl/get_daily_attendance_by_id',
                method: 'GET',
                params,
            }),
        }),
        getEmployeeDeviceAttendancesById: build.query<
            IData<AttendanceEmployeeDetailsById[]>,
            IEmployeeParams
        >({
            query: (params) => ({
                url: 'employee_attendances/get_attendances_by_employee_id',
                method: 'GET',
                params,
            }),
        }),
        deleteImage: build.mutation<IResponse['message'], number>({
            query: (id) => ({
                url: `images/delete?image_id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['employee_info', 'client'],
        }),
    }),
});

export const {
    useGetEmployeeByIdQuery,
    useGetEmployeeImagesByIdQuery,
    useGetDailyAttendanceByIdQuery,
    useGetEmployeeDeviceAttendancesByIdQuery,
    useDeleteImageMutation,
} = EmployeeAPI;
