import { api } from '@/shared';
import { IAuthData, IAuthForm, IUser } from '../model/types/index.types';

export const AuthAPI = api.injectEndpoints({
    endpoints: (builder) => ({
        checkUser: builder.query<IUser, string>({
            query: (token) => ({
                url: 'users/users/me',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        login: builder.mutation<IAuthData, IAuthForm>({
            query: ({ username, password }) => {
                const dataForm = new FormData();
                dataForm.append('username', username);
                dataForm.append('password', password);
                return {
                    url: 'users/get_token',
                    method: 'POST',
                    body: dataForm,
                };
            },
        }),
    }),
});

export const { useLoginMutation, useCheckUserQuery } = AuthAPI;
