import buildQueryString from "../../../utils/buildQueryString";
import { baseApi } from "../../Apis/baseApi";


const gadgetsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addGadgets: build.mutation({
            query: (gadgetsData) => ({
                url: "/gadget/add",
                method: "POST",
                body: gadgetsData
            })
        }),
        getGadgets: build.query({
            query: (query) => {
                const queryString = buildQueryString(query);
                return {
                    url: `/gadget?${queryString && queryString}`,
                    method: 'GET',
                };
            },

        }),
        updateGadgets: build.mutation({
            query: ({ id, payload }) => (
                {
                    url: `/gadget/${id}`,
                    method: "PATCH",
                    body: payload
                }
            )
        }),
        getSingleGadgets: build.query({
            query: (id) => ({
                url: `/gadget/${id}`,
                method: 'GET'
            })
        }),
        deleteSingleGadgets: build.mutation({
            query: (id) => ({
                url: `/gadget/${id}`,
                method: "DELETE"
            })
        })
    })
})

export const { useAddGadgetsMutation, useGetGadgetsQuery, useGetSingleGadgetsQuery, useUpdateGadgetsMutation, useDeleteSingleGadgetsMutation } = gadgetsApi