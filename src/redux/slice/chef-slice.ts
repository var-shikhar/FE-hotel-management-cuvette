import { createApi } from "@reduxjs/toolkit/query/react"
import { ROUTES } from "../../lib/route"
import { baseQueryWithInterceptor } from "../../services/rtkService"
import { TCommonBEResponse } from "../../types/common"

export type TChef = {
  chefId: string
  chefName: string
  isAdmin: boolean
  totalOrders: number
}

const chefAPI = createApi({
  baseQuery: baseQueryWithInterceptor,
  reducerPath: "chef",
  tagTypes: ["ChefList"],
  endpoints: (builder) => ({
    // Get Chef-List
    getChefList: builder.query<TChef[], void>({
      query: () => ROUTES.ChefRoute,
      providesTags: ["ChefList"],
    }),
    // Add New Chef
    postNewChef: builder.mutation<TCommonBEResponse, { name: string }>({
      query: (data) => ({
        url: ROUTES.ChefRoute,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["ChefList"],
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const tempId = crypto.randomUUID()
        const addResult = dispatch(
          chefAPI.util.updateQueryData("getChefList", undefined, (draft) => {
            draft.unshift({
              chefId: tempId,
              chefName: data.name,
              isAdmin: false,
              totalOrders: 0,
            })
          })
        )
        try {
          await queryFulfilled
          // Force Refetch
          dispatch(
            chefAPI.endpoints.getChefList.initiate(undefined, {
              forceRefetch: true,
            })
          )
        } catch {
          addResult.undo()
        }
      },
    }),
    // Delete Chef
    deleteChef: builder.mutation<TCommonBEResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${ROUTES.ChefRoute}/${id}`,
        method: "DELETE",
        body: { chefID: id },
        headers: {
          "Content-Type": "application/json",
        },
      }),

      invalidatesTags: ["ChefList"],
    }),
  }),
})

export const {
  useGetChefListQuery,
  usePostNewChefMutation,
  useDeleteChefMutation,
} = chefAPI

export default chefAPI
