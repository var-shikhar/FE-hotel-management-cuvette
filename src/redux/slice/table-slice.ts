import { createApi } from "@reduxjs/toolkit/query/react"
import { ROUTES } from "../../lib/route"
import { baseQueryWithInterceptor } from "../../services/rtkService"
import { TCommonBEResponse } from "../../types/common"

export type TTable = {
  tableID: string
  tableData: {
    tableDataID: string
    tableName: string
    tableNo: number
    totalChairs: number
    isAvailable: boolean
  }[]
}

export type TBaseForm = {
  tableName: string
  tableNo: number
  totalChairs: number
}

export type TTableForm = TBaseForm & {
  tableID: string
  tableDataID: string
}

const tableAPI = createApi({
  baseQuery: baseQueryWithInterceptor,
  reducerPath: "table",
  tagTypes: ["TableList"],
  endpoints: (builder) => ({
    // Get Table-List
    getTableList: builder.query<TTable, void>({
      query: () => ROUTES.CommonTableRoute,
      providesTags: ["TableList"],
    }),
    // Add New Table
    postNewTable: builder.mutation<TCommonBEResponse, TBaseForm>({
      query: (data) => ({
        url: ROUTES.CommonTableRoute,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["TableList"],
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const tempId = crypto.randomUUID()
        const addResult = dispatch(
          tableAPI.util.updateQueryData("getTableList", undefined, (draft) => {
            draft.tableData.push({
              tableDataID: tempId,
              tableName: data.tableName,
              tableNo: data.tableNo,
              totalChairs: data.totalChairs,
              isAvailable: true,
            })
          })
        )

        try {
          await queryFulfilled
          // Force Refetch
          dispatch(
            tableAPI.endpoints.getTableList.initiate(undefined, {
              forceRefetch: true,
            })
          )
        } catch {
          addResult.undo()
        }
      },
    }),
    // Put Table Details
    putTableDetail: builder.mutation<TCommonBEResponse, TTableForm>({
      query: (data) => ({
        url: ROUTES.CommonTableRoute,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["TableList"],
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const updateResult = dispatch(
          tableAPI.util.updateQueryData("getTableList", undefined, (draft) => {
            const foundTable = draft.tableData.find(
              (table) => table.tableDataID === data.tableDataID
            )
            if (foundTable) {
              foundTable.tableName = data.tableName
              foundTable.tableNo = data.tableNo
              foundTable.totalChairs = data.totalChairs
            }
          })
        )

        try {
          await queryFulfilled
          // Force Refetch
          dispatch(
            tableAPI.endpoints.getTableList.initiate(undefined, {
              forceRefetch: true,
            })
          )
        } catch {
          updateResult.undo()
        }
      },
    }),
    // Delete Table
    deleteTable: builder.mutation<
      TCommonBEResponse,
      { tableID: string; tableDocID: string }
    >({
      query: (data) => ({
        url: `${ROUTES.CommonTableRoute}/${data.tableID}/${data.tableDocID}`,
        method: "DELETE",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),

      invalidatesTags: ["TableList"],
    }),
  }),
})

export const {
  useGetTableListQuery,
  usePostNewTableMutation,
  usePutTableDetailMutation,
  useDeleteTableMutation,
} = tableAPI

export default tableAPI
