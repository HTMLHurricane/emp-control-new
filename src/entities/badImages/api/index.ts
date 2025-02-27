import { api } from '@/shared';
import { BadImagesData } from '../model/types/types';
import { IResponse } from '@/shared/types/Types';

export const badImagesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getClientsBadImages: build.query<BadImagesData[], void>({
            query: () => ({
                url: 'bad_images/bad_image',
                method: 'GET',
            }),
            providesTags: ['bad_image'],
        }),
        deleteClientBadImage: build.mutation<IResponse['message'], number>({
            query: (id) => ({
                url: `bad_images/bad_image/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['bad_image'],
        }),
    }),
});

export const { useGetClientsBadImagesQuery, useDeleteClientBadImageMutation } =
    badImagesApi;
