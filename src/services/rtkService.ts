// Common RTK Query Instance for the RTK Queries and Mutations
import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query"
import Cookies from "js-cookie"
import { showToast } from "../lib/utils"

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_BACKEND_URL,
  prepareHeaders: (headers) => {
    const accessToken = Cookies.get("access_token")
    const refreshToken = Cookies.get("refresh_token")

    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`)
    if (refreshToken) headers.set("x-refresh-token", refreshToken)
    return headers
  },
  credentials: "include",
})

export const baseQueryWithInterceptor = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions?: object
) => {
  try {
    const result = await baseQuery(args, api, extraOptions!)
    if (result.error) {
      const fetchedError = result.error as FetchBaseQueryError
      const errorMessage =
        (fetchedError.data as { message?: string })?.message ||
        "An error occurred"
      showToast(errorMessage, "error")
    }
    return result
  } catch (error) {
    const fetchError = error as FetchBaseQueryError
    const errorMessage =
      (fetchError.data as { message?: string })?.message || "An error occurred"
    showToast(errorMessage, "error")
    return Promise.reject(error)
  }
}
