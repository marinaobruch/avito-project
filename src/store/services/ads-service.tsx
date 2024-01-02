import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICommemtRequest, IDeleteImgRequest, IPatchAd, IPostAdv, IPostComment, IPostImgInAdv, IToken, IUserLogin, IUserPatch, IUserReg, IUserRequest } from "interface/api-interface";
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
            providesTags: ['Ads'],
        }),
        getAdById: build.query<IRequestAds, number>({
            query: (id: number) => `/ads/${id}`,
            providesTags: ['Ads'],
        }),
        getAdByUserId: build.query<IRequestAds[], number>({
            query: (userId) => `/ads?user_id=${userId}`,
            providesTags: ['Ads'],
        }),
        getUserAds: build.query<IRequestAds[], string>({
            query: () => '/ads/me',
            providesTags: ['Ads']
        }),
        postAdv: build.mutation<IRequestAds, IPostAdv>({
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
            }),
            invalidatesTags: ['Ads'],
        }),
        patchAdv: build.mutation<IRequestAds, IPatchAd>({
            query: ({ id, body }) => ({
                headers: {
                    'content-type': 'application/json'
                },
                url: `ads/${id}`,
                method: 'PATCH',
                body: {
                    title: body.title,
                    description: body.description,
                    price: Number(body.price),
                },
            }),
            invalidatesTags: ['Ads'],
        }),
        deleteAdv: build.mutation<string, number>({
            query: (id) => ({
                url: `ads/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Ads'],
          }),
    // IMAGES
        postImgInAdv: build.mutation<IRequestAds, IPostImgInAdv>({
            query: ({id, body}) => ({
                url: `ads/${id}/image`,
                method: 'POST',
                body: body,
                invalidatesTags: ['Ads'],
            }),
            invalidatesTags: ['Ads'],
        }),
        deleteImg: build.mutation<IRequestAds ,IDeleteImgRequest>({
            query: ({ id, file_url}) => ({
                // url: `ads/${id}/image/file_url=${file_url}`,
                url: `ads/${id}/image`,
                params: `file_url=${file_url}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Ads'],
    }),
    //COMMENTS
        getComments: build.mutation<ICommemtRequest, number>({
            query: (id) => ({
                headers: {
                'content-type': 'application/json'
                },
                url: `ads/${id}/comments`,
                method: 'GET',
            }),
        }),
        postComment: build.mutation<ICommemtRequest, IPostComment>({
            query: ({id, body}) => ({
                headers: {
                'content-type': 'application/json'
                },
                url: `ads/${id}/comments`,
                method: 'POST',
                body: {
                    text: body
                },
            }),
            invalidatesTags: ['Comments'],
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
        postLogin: build.mutation<IToken, IUserLogin>({
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
        
    // USER
        getAllUsers: build.query<IUserRequest[], string>({
            query: () => '/user/all',
            providesTags: ['Users'],
        }), 
        getCurrentUser: build.query<IUserRequest, string>({
            query: () => '/user',
            providesTags: ['Users'],
        }),  
        patchUser: build.mutation<IUserRequest, IUserPatch>({
            query: (body) => ({
                headers: {
                'content-type': 'application/json'
                },
                url: '/user',
                method: `PATCH`,
                body: {
                    name: body.name,
                    surname: body.surname,
                    city: body.city,
                    phone: body.phone,
                },
            }),
            invalidatesTags: ['Users'],
        }),
        postImgUser: build.mutation<IUserRequest, object>({
            query: (formData: object) => ({
              url: 'user/avatar',
              method: 'POST',
              body: formData,
            }),
            invalidatesTags: ['Users'],
          }),
    })
})

export const {
    useGetAllAdsQuery,
    useGetAdByIdQuery,
    useGetAdByUserIdQuery,
    useGetUserAdsQuery,
    usePostAdvMutation,
    usePatchAdvMutation,
    useDeleteAdvMutation,
    useDeleteImgMutation,

    usePostRegMutation,
    usePostLoginMutation,

    useGetAllUsersQuery,
    useGetCurrentUserQuery,
    usePatchUserMutation,

    usePostImgUserMutation,
    usePostImgInAdvMutation,

    useGetCommentsMutation,
    usePostCommentMutation,
} = avitoApi;