import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { ICommemtRequest, IDeleteImgRequest, IPatchAd, IPostAdv, IPostComment, IPostImgInAdv, IToken, IUserLogin, IUserPatch, IUserReg, IUserRequest } from "interface/api-interface";
import { IRequestAds } from "interface/api-interface";
import { clearTokens, setAccessToken, setRefreshToken } from "..";

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
    > = async (args, api, extraOptions) => {

    const baseQuery = fetchBaseQuery({
        baseUrl: 'http://localhost:8090',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('access_token')
            console.debug('Использую токен из стора', { token })
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    })

    const result = await baseQuery(args, api, extraOptions)
    console.debug('Результат первого запроса', { result })

    if (result?.error?.status !== 401) {
      return result
    }
  
    const forceLogout = () => {
    //   api.dispatch(clearTokens())
      console.debug('Принудительная авторизация!')
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('access_token');
      window.location.replace('/login')
    }
    const refresh = localStorage.getItem('refresh_token')
    console.debug('Данные пользователя в сторе', { refresh })

    if (!refresh) {
      return forceLogout()
    }
  
    const refreshResult = await baseQuery(
      {
        url: 'auth/login',
        method: 'PUT',
        body: {
          access_token: localStorage.getItem('access_token'),
          refresh_token: localStorage.getItem('refresh_token'),
        },
      },
      api,
      extraOptions,
    )
  
    if (!refreshResult.data.access_token) {
      return forceLogout()
    }

    console.debug('Результат запроса на обновление токена', { refreshResult })
  
    // api.dispatch(setAccessToken( refreshResult.data.access_token ))
    // api.dispatch(setRefreshToken( refreshResult.data.refresh_token ))

    localStorage.setItem("access_token", refreshResult.data.access_token)
    localStorage.setItem("refresh_token", refreshResult.data.refresh_token)
  
    const retryResult = await baseQuery(args, api, extraOptions)
  
    if (retryResult?.error?.status === 401) {
      return forceLogout()
    }
    
    console.debug('Повторный запрос завершился успешно')
    return retryResult
  }


export const avitoApi = createApi({
    reducerPath: 'avitoApi',
    tagTypes: ['Users', 'Comments', 'Ads'],
    baseQuery: baseQueryWithReauth,

    // baseQuery: fetchBaseQuery({
    //     baseUrl: 'http://localhost:8090',
    //     prepareHeaders: (headers) => {
    //         const token = localStorage.getItem('access_token')
    //         if (token) {
    //           headers.set('authorization', `Bearer ${token}`)
    //         }
    //         return headers;
    //       },
    // }),

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
                url: `ads/${id}/image?file_url=${file_url}`,
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