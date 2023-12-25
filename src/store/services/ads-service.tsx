import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPostAdv, IUserImgPost, IUserLogin, IUserPatch, IUserReg, IUserRequest } from "interface/api-interface";
import { IRequestAds } from "interface/api-interface";
import { RootState } from "..";

export const avitoApi = createApi({
    reducerPath: 'avitoApi',
    tagTypes: ['Users', 'Comments', 'Ads'],
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
        //ADS
        getAllAds: build.query<IRequestAds[], number>({
            query: () => '/ads',
            providesTags: ['Ads']
        }),
        getAdById: build.query<IRequestAds, number>({
            query: (id: number) => `/ads/${id}`,
            providesTags: ['Ads']
        }),          
        postAdv: build.mutation<IPostAdv, IRequestAds>({
          query: (body: IPostAdv) => ({
            headers: {
              'content-type': 'application/json'
            },
            url: '/adstext',
            method: 'POST',
            body: {
              title: body.title,
              description: body.description,
              price: Number(body.price),
            },
            invalidatesTags: ['Ads']
          })
        }),
        deleteAdv: build.mutation<number, number>({
            query: (id) => ({
                url: `ads/${id}`,
                method: 'DELETE',
                invalidatesTags: ['Ads']
            })
          }),

        // AUTH/REG
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
        
        // USER/AUTH/REG
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

        // IMGES
        postImgUser: build.mutation<IUserImgPost, object>({
            query: (formData) => ({
                headers: {
                    'content-type': 'application/json',
                },
                url: 'user/avatar',
                method: 'POST',
                body: {
                    file: formData,
                },
                invalidatesTags: ['Users'],
            }),
          }),

          //COMMENTS
          getComments: build.mutation({
            query: (id) => ({
              headers: {
                'content-type': 'application/json'
              },
              url: `ads/${id}/comments`,
              method: 'GET',
            providesTags: ['Comments']
            })
          }),
          postComment: build.mutation({
            query: ({id, body}) => ({
              headers: {
                'content-type': 'application/json'
              },
              url: `ads/${id}/comments`,
              method: 'POST',
              body: JSON.stringify({
                text: body
              }),
              invalidatesTags: ['Comments'],
            }),
          }),
    })
})

export const {
    useGetAllAdsQuery,
    useGetAdByIdQuery,
    usePostAdvMutation,
    useDeleteAdvMutation,

    usePostRegMutation,
    usePostLoginMutation,

    useGetAllUsersQuery,
    useGetCurrentUserQuery,
    usePatchUserMutation,
    usePostImgUserMutation,

    usePostCommentMutation,
    useGetCommentsMutation,
} = avitoApi;