import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TOKEN } from '@/shared';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_APP_API_URL,
        prepareHeaders(headers) {
            // headers.set('Content-Type', 'application/json');
            headers.set('Authorization', `Bearer ${TOKEN.get()}`);
            return headers;
        },
    }),
    refetchOnFocus: false,
    tagTypes: ['branch', 'role', 'employee', 'schedule', 'organization', 'device', 'employee_info', "client"],
    endpoints: (build) => ({
        default: build.query({
            query: () => 'default',
        }),
    }),
});
