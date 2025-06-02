/**
 * useTableHook – Custom hook to manage table data and CRUD operations.
 *
 * Features:
 * - Fetches the list of tables and tracks loading state.
 * - Provides mutation functions for creating, updating, and deleting tables.
 * - Manages modal visibility and the current operation mode (Create, Edit, Delete).
 * - Maintains form state for table details including table name, number, and chair count.
 * - Handles input changes and form submission for adding and updating tables.
 * - Exposes loading states for all asynchronous operations.
 * - Shows toast notifications on success or failure of operations.
 *
 * Returns:
 * - tableList: Array of fetched table data.
 * - isLoading: Boolean indicating if the table list is loading.
 * - isDeleting: Boolean indicating if a delete operation is in progress.
 * - isCreating: Boolean indicating if a create operation is in progress.
 * - isUpdating: Boolean indicating if an update operation is in progress.
 * - mode: Current CRUD mode ('Create' | 'Edit' | 'Delete' | null).
 * - modalToggle: Boolean controlling modal visibility.
 * - setModalToggle: Function to toggle modal visibility.
 * - inputValues: Current form input values for table details.
 * - handleSelection: Function to select a table and set the CRUD mode.
 * - handleInputChange: Handler for updating form input values.
 * - handleDelete: Async function to delete the selected table.
 * - handleAddTable: Async function to create a new table.
 * - handleUpdateTable: Async function to update an existing table.
 */

import React, { startTransition, useState } from "react"
import { showToast } from "../lib/utils"
import {
  TBaseForm,
  useDeleteTableMutation,
  useGetTableListQuery,
  usePostNewTableMutation,
  usePutTableDetailMutation,
} from "../redux/slice/table-slice"

const useTableHook = () => {
  const { data: tableList, isLoading } = useGetTableListQuery()
  const [deleteFunction, { isLoading: isDeleting }] = useDeleteTableMutation()
  const [createFunction, { isLoading: isCreating }] = usePostNewTableMutation()
  const [updateFunction, { isLoading: isUpdating }] =
    usePutTableDetailMutation()

  const [mode, setMode] = useState<null | "Delete" | "Create" | "Edit">(null)
  const [modalToggle, setModalToggle] = useState(false)
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [inputValues, setInputValues] = useState<TBaseForm>({
    tableName: "Table name",
    tableNo: (tableList?.tableData?.length ?? 0) + 1,
    totalChairs: 3,
  })

  // Handle Input Change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Handle Selection
  function handleSelection(id: string, mode: "Delete" | "Create" | "Edit") {
    const inputData = {
      tableName: "Table name",
      tableNo: (tableList?.tableData?.length ?? 0) + 1,
      totalChairs: 3,
    }
    if (mode === "Edit" && id) {
      const foundItem = tableList?.tableData?.find(
        (item) => item.tableDataID === id
      )
      if (foundItem) {
        inputData.tableName = foundItem.tableName
        inputData.tableNo = foundItem.tableNo
        inputData.totalChairs = foundItem.totalChairs
      }
    }
    startTransition(() => {
      setMode(mode)
      setSelectedTable(id)
      setModalToggle(!modalToggle)
      setInputValues(inputData)
    })
  }

  // Handle Deletion
  async function handleDelete() {
    try {
      if (!selectedTable || !tableList?.tableID) {
        showToast("Table not selected", "warning")
        return
      }
      await deleteFunction({
        tableID: tableList.tableID,
        tableDocID: selectedTable,
      }).unwrap()
      showToast("Table deleted successfully", "success")
    } catch (error) {
      console.error("Error deleting chef:", error)
    } finally {
      setSelectedTable(null)
      setModalToggle(false)
    }
  }
  // Handle Addition
  async function handleAddTable() {
    if (
      !inputValues ||
      !inputValues.tableName ||
      !inputValues.tableNo ||
      !inputValues.totalChairs
    ) {
      showToast("Please fill table details first", "warning")
      return
    }
    try {
      await createFunction({ ...inputValues }).unwrap()
      showToast("Table added successfully", "success")
    } catch (error) {
      console.error("Error adding Table:", error)
    } finally {
      setInputValues({
        tableName: "Table name",
        tableNo: (tableList?.tableData?.length ?? 0) + 1,
        totalChairs: 3,
      })
      setModalToggle(false)
    }
  }
  // Handle Updation
  async function handleUpdateTable() {
    if (
      !selectedTable ||
      !tableList?.tableID ||
      !inputValues ||
      !inputValues.tableName ||
      !inputValues.tableNo ||
      !inputValues.totalChairs
    ) {
      showToast("Please fill table details first", "warning")
      return
    }
    try {
      await updateFunction({
        ...inputValues,
        tableDataID: selectedTable,
        tableID: tableList.tableID,
      }).unwrap()
      showToast("Table updated successfully", "success")
    } catch (error) {
      console.error("Error adding Table:", error)
    } finally {
      setInputValues({
        tableName: "Table name",
        tableNo: (tableList?.tableData?.length ?? 0) + 1,
        totalChairs: 3,
      })
      setModalToggle(false)
    }
  }

  return {
    handleSelection,
    handleDelete,
    isLoading,
    isDeleting,
    tableList,
    handleAddTable,
    isCreating,
    isUpdating,
    mode,
    modalToggle,
    setModalToggle,
    inputValues,
    handleInputChange,
    handleUpdateTable,
  }
}

export default useTableHook
