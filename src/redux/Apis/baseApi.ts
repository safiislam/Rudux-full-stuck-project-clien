import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    // credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        console.log(token);
        if (token) {
            headers.set('Authorization', `${token}`)
        }
        return headers
    }
})

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery,
    endpoints: () => ({})
})