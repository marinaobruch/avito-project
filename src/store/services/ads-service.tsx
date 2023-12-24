import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "interface/api-interface";
import { IRequestAds } from "interface/api-interface";


export const avitoApi = createApi({
    reducerPath: 'avitoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8090',
        // tagTypes: ['Ads'],
        // prepareHeaders: (headers, {getState}) => {
        //     const token = getState().token.accessToken;

        //     if (token) {
        //         headers.set("authorization", `Bearer ${token}`);
        //       }
        
        //       return headers;
        // },
    }),

    endpoints: (build) => ({
        getAllAds: build.query<IRequestAds[], number>({
            query: () => '/ads'
        }),
        getAdById: build.query<IRequestAds, number>({
            query: (id: number) => `/ads/${id}`
        }),

        postReg: build.mutation<IUser, IUser>({
            query: (body) => ({
                headers: {
                    'content-type': 'application/json',
                  },
                  url: 'auth/register',
                  method: 'POST',
                  body: {
                    email: body.email,
                    password: body.password,
                    name: body.name,
                    surname: body.surname,
                    city: body.city,
                  }
            })
        }),
        postLogin: build.mutation({
            query: (body) => ({
              headers: {
                'content-type': 'application/json',
              },
              url: 'auth/login',
              method: 'POST',
              body: {
                email: body.email,
                password: body.password,
              }
            }),
          }),
    })
})

export const {
    useGetAllAdsQuery,
    useGetAdByIdQuery,

    usePostRegMutation,
    usePostLoginMutation,
} = avitoApi;