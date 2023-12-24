import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUserPatch, IUserRequest } from "interface/api-interface";
import { RootState } from "../store/store";

// const USER_TAG = { type: "Todos", id: "LIST" };

export const avitoUserApi = createApi({
    reducerPath: 'avitoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8090',
        // tagTypes: ["Ads"],
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).token.access_token

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers;
          },
    }),

    endpoints: (build) => ({
        getCurrentUser: build.query<IUserRequest, number>({
            query: () => '/user',
            // providesTags: (result = []) => [
            //     USER_TAG,
            //   ],
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
            // invalidatesTags: [USER_TAG],
        })
        }),
    })
})

export const {
    useGetCurrentUserQuery,
    usePatchUserMutation,
} = avitoUserApi;