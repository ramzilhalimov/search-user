import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skypro-music-api.skyeng.tech/',
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: 'user/login/',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: { email, password },
      }),
    }),
  }),
})

export const { useLoginUserMutation } = authApi
