import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUserImgPost, IUserLogin, IUserPatch, IUserReg, IUserRequest } from "interface/api-interface";
import { IRequestAds } from "interface/api-interface";
import { RootState } from "..";

export const avitoApi = createApi({
    reducerPath: 'avitoApi',
    tagTypes: ['Users'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8090',
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).token.access_token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers;
          },
    }),
    endpoints: (build) => ({
        getAllAds: build.query<IRequestAds[], number>({
            query: () => '/ads'
        }),
        getAdById: build.query<IRequestAds, number>({
            query: (id: number) => `/ads/${id}`
        }),

        postReg: build.mutation<IUserReg, IUserReg>({
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
        postLogin: build.mutation<IUserLogin, IUserLogin>({
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
        
        getAllUsers: build.query<IUserRequest[], string>({
            query: () => '/user/all',
            providesTags: ['Users']
        }), 

        getCurrentUser: build.query<IUserRequest, string>({
            query: () => '/user',
            providesTags: ['Users']
        }),  
        patchUser: build.mutation<IUserPatch, IUserPatch>({
        query: (body) => ({
            headers: {
            'content-type': 'application/json'
            },
            url: '/user',
            method: `PATCH`,
            body: JSON.stringify({
                name: body.name,
                surname: body.surname,
                city: body.city,
                phone: body.phone,
            }),
            invalidatesTags: ['Users'],
            })
        }),
        postImgUser: build.mutation<IUserImgPost, string>({
            query: (body) => ({
                headers: {
                    'content-type': 'application/json',
                },
                url: 'user/avatar',
                method: 'POST',
                body: {
                    file: body,
                },
                invalidatesTags: ['Users'],
            }),
          }),


          postComment: build.mutation({
            query: ({id, body}) => ({
              headers: {
                'content-type': 'application/json'
              },
              url: `ads/${id}/comments`,
              method: 'POST',
              body: JSON.stringify({
                text: body.text
              })
            }),
          }),
          getComments: build.mutation({
            query: (id) => ({
              headers: {
                'content-type': 'application/json'
              },
              url: `ads/${id}/comments`,
              method: 'GET',
            })
          }),
    })
})

export const {
    useGetAllAdsQuery,
    useGetAdByIdQuery,

    usePostRegMutation,
    usePostLoginMutation,

    useGetAllUsersQuery,
    useGetCurrentUserQuery,
    usePatchUserMutation,
    usePostImgUserMutation,

    usePostCommentMutation,
    useGetCommentsMutation,
} = avitoApi;