import { createApi } from "@reduxjs/toolkit/query/react"
import { ROUTES } from "../../lib/route"
import { baseQueryWithInterceptor } from "../../services/rtkService"
import { TChef } from "./chef-slice"
import { TTable } from "./table-slice"

export type TAnalytics = {
  totalChef: number
  totalRevenue: number
  totalOrder: number
  totalClient: number
  tableData: TTable["tableData"]
  chefList: TChef[]
}

const dashboardAPI = createApi({
  baseQuery: baseQueryWithInterceptor,
  reducerPath: "dashboard",
  tagTypes: ["Dashbaord"],
  endpoints: (builder) => ({
    // Get Dashboard Analytics
    getDashbaordAnalytics: builder.query<TAnalytics, void>({
      query: () => ROUTES.DashboardRoute,
      providesTags: ["Dashbaord"],
    }),
  }),
})

export const { useGetDashbaordAnalyticsQuery } = dashboardAPI
export default dashboardAPI
