import { baseApi } from "../../Apis/baseApi";



const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/login',
                method: "POST",
                body: userInfo,
            })
        }),
        registation: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/registration',
                method: "POST",
                body: userInfo,
            })
        })
    })
})

export const { useLoginMutation, useRegistationMutation } = authApi