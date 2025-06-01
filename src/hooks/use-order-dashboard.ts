/**
 * useTeamHook – Custom hook for managing team members in a team management context.
 *
 * - Fetches the list of members and provides functionality for sorting, filtering, and handling different modes (edit, delete, create).
 * - Handles user selection, modal toggling, and deletion of members.
 * - Provides helper functions for navigation, sorting, and updating team data.
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
