import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRequestAds } from "interface/api-interface";


export const avitoApi = createApi({
    reducerPath: 'avitoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8090',
        tagTypes: ['Ads'],
        // prepareHeaders: (headers, {getState}) => {
        //     const token = getState().token.accessToken;

        //     if (token) {
        //         headers.set("authorization", `Bearer ${token}`);
        //       }
        
        //       return headers;
        // },
    }),

    endpoints: (builder) => ({
        getAllAds: builder.query<IRequestAds[], number>({
            query: () => '/ads'
        })
    })
})


export const {useGetAllAdsQuery} = avitoApi;