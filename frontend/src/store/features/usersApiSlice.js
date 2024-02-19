import { apiSlice } from "./apiSlice";
const USER_URL = "api/user";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register:builder.mutation({
            query:(data) => ({
        url:`${USER_URL}/register`,
        method:"POST",
        body:data,
        })
        }),
        login:builder.mutation({
            query:(data) => ({
        url:`${USER_URL}/login`,
        method:"POST",
        body:data,
        })
        }),
        logout:builder.mutation({
            query:() => ({
            url:`${USER_URL}/logout`,
            method:"POST",
            })
        }),
        updateProfile:builder.mutation({
            query:(data) => ({
        url:`${USER_URL}/profile`,
        method:"PATCH",
        body:data,
        })
        }),
        // getUsers: builder.query({
        //     query: () => USER_URL,
        // }),
    }),
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateProfileMutation } = usersApiSlice