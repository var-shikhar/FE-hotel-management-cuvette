import { createApi } from "@reduxjs/toolkit/query/react"
import { ROUTES } from "../../lib/route"
import { baseQueryWithInterceptor } from "../../services/rtkService"
import { TCommonBEResponse } from "../../types/common"
import { TSelectedItem } from "./selectedItem-slice"

export type TOrderType = "Dine-in" | "Take-Away"
export type TMenu = {
  id: string
  title: string
  price: number
  image: string
  description: string
  preparationTime: number
  tax: number
  categoryId: string
}
export type TCategory = {
  id: string
  title: string
  icon: string
}

export type TMenuList = {
  category: TCategory[]
  menu: TMenu[]
}

// Booking Schema
type TBooking = {
  clientName: string
  clientPhone: string
  itemJSON: TSelectedItem[]
  cookingInstructions: string
  deliveryCharges: number
  total: number
  location: string
  orderType: TOrderType
}

const menuAPI = createApi({
  baseQuery: baseQueryWithInterceptor,
  reducerPath: "menu",
  tagTypes: ["MenuList"],
  endpoints: (builder) => ({
    // Get Menu List
    getMenuList: builder.query<TMenuList, void>({
      query: () => ROUTES.MenuRoute,
      providesTags: ["MenuList"],
    }),

    postNewBooking: builder.mutation<TCommonBEResponse, TBooking>({
      query: (data) => ({
        url: ROUTES.BookingRoute,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["MenuList"],
    }),
  }),
})

export const { useGetMenuListQuery, usePostNewBookingMutation } = menuAPI
export default menuAPI
