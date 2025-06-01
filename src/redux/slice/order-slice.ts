import { createApi } from "@reduxjs/toolkit/query/react"
import { ROUTES } from "../../lib/route"
import { baseQueryWithInterceptor } from "../../services/rtkService"
import { TCommonBEResponse } from "../../types/common"

export type TOrder = {
  orderID: string
  orderNumber: string
  clientName: string
  clientPhone: string
  tableNo: string
  tableName: number
  assignedTime: string
  remainingTime: number
  orderType: string
  status: string
  pickupStatus: string
  instructions: string
  items: {
    itemName: string
    itemQuantity: number
  }[]
}

// WIP: Need to refetch after a few seconds...

const orderAPI = createApi({
  baseQuery: baseQueryWithInterceptor,
  reducerPath: "order",
  tagTypes: ["OrderList"],
  endpoints: (builder) => ({
    // Get Order-List
    getOrderList: builder.query<TOrder[], void>({
      query: () => ROUTES.CommonOrderRoute,
      providesTags: ["OrderList"],
    }),
    // Put Order Status
    putOrderStatus: builder.mutation<TCommonBEResponse, { id: string }>({
      query: (data) => ({
        url: `${ROUTES.CommonOrderRoute}/${data.id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["OrderList"],
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const updateResult = dispatch(
          orderAPI.util.updateQueryData("getOrderList", undefined, (draft) => {
            const foundOrder = draft.find((o) => o.orderID === data.id)
            if (foundOrder) {
              foundOrder.status = "Completed"
            }
          })
        )

        try {
          await queryFulfilled
          // Force Refetch
          dispatch(
            orderAPI.endpoints.getOrderList.initiate(undefined, {
              forceRefetch: true,
            })
          )
        } catch {
          updateResult.undo()
        }
      },
    }),
  }),
})

export const { useGetOrderListQuery, usePutOrderStatusMutation } = orderAPI

export default orderAPI
