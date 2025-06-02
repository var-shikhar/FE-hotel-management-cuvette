/**
 * useOrderDashboard – Custom hook to manage the order dashboard state and actions.
 *
 * Features:
 * - Fetches the list of orders with automatic refetching on mount or argument changes.
 * - Provides a mutation function to update the status of an order.
 * - Exposes loading states for both fetching orders and updating an order.
 * - Contains a handler to update an order’s status with success and error notifications.
 *
 * Returns:
 * - orderList: Array of fetched orders.
 * - isLoading: Boolean indicating if orders are being fetched.
 * - isUpdating: Boolean indicating if an order status update is in progress.
 * - handleUpdateTable: Async function to update the status of an order by ID.
 */

import { showToast } from "../lib/utils"
import {
  useGetOrderListQuery,
  usePutOrderStatusMutation,
} from "../redux/slice/order-slice"

const useOrderDashboard = () => {
  const { data: orderList, isLoading } = useGetOrderListQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const [updateFunction, { isLoading: isUpdating }] =
    usePutOrderStatusMutation()

  // Handle Updation
  async function handleUpdateTable(id: string) {
    try {
      await updateFunction({
        id: id,
      }).unwrap()
      showToast("Table updated successfully", "success")
    } catch (error) {
      console.error("Error adding Table:", error)
    }
  }

  return {
    orderList,
    isLoading,
    isUpdating,
    handleUpdateTable,
  }
}

export default useOrderDashboard
