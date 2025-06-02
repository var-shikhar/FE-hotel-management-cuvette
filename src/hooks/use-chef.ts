/**
 * useChefHook – A custom hook for managing chef data in a team or kitchen management system.
 *
 * Features:
 * - Fetches the list of chefs using Redux Toolkit Query and provides real-time loading status.
 * - Supports sorting the chef list alphabetically (ascending/descending).
 * - Handles user interactions including:
 *    - Selecting a chef with a specific mode (Delete or Create)
 *    - Toggling modal visibility
 *    - Creating a new chef entry
 *    - Deleting an existing chef
 * - Exposes necessary state and handlers for integration with UI components:
 *    - Modal state and toggle
 *    - Input state for new chef name
 *    - Loading states for both deletion and creation
 *    - Selected mode and selected chef ID
 *
 * Returns:
 * - filteredList: The sorted chef list
 * - handleSort: Function to toggle sort order
 * - handleSelectChef: Function to select a chef and trigger a modal with the specified mode
 * - handleToggle: Function to open/close the modal
 * - handleDelete: Function to delete a selected chef
 * - handleAddChef: Function to add a new chef
 * - isLoading, isDeleting, isCreating: Flags for API call loading states
 * - modalToggle, setModalToggle: Modal state and setter
 * - inputName, setInputName: Input field state for new chef's name
 * - mode: Current mode ("Delete" or "Create")
 */

import { startTransition, useMemo, useState } from "react"
import { showToast } from "../lib/utils"
import {
  useDeleteChefMutation,
  useGetChefListQuery,
  usePostNewChefMutation,
} from "../redux/slice/chef-slice"

type TModeType = "Delete" | "Create"

const useChefHook = () => {
  const { data: chefList, isLoading } = useGetChefListQuery()
  const [deleteFunction, { isLoading: isDeleting }] = useDeleteChefMutation()
  const [createFunction, { isLoading: isCreating }] = usePostNewChefMutation()

  const [modalToggle, setModalToggle] = useState(false)
  const [selectedChef, setSelectedChef] = useState<string | null>(null)
  const [inputName, setInputName] = useState("")
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc")
  const [mode, setMode] = useState<TModeType | null>(null)

  // Filter and Sort the List
  const filteredList = useMemo(() => {
    let tempList = [...(chefList ?? [])]

    tempList = tempList?.sort((a, b) => {
      if (sortBy === "asc") return a.chefName.localeCompare(b.chefName)
      return b.chefName.localeCompare(a.chefName)
    })

    return tempList
  }, [chefList, sortBy])

  // Handle Sorting
  function handleSort() {
    startTransition(() => {
      setSortBy((prev) => (prev === "asc" ? "desc" : "asc"))
    })
  }

  // Handle Chef Selection
  function handleSelectChef(id: string, mode: TModeType) {
    startTransition(() => {
      setSelectedChef(id)
      setMode(mode)
      setModalToggle(true)
    })
  }

  // Handle Toggle
  function handleToggle() {
    setModalToggle((prev) => !prev)
  }

  // Handle Deletion
  async function handleDelete() {
    try {
      if (!selectedChef) {
        showToast("Chef not selected", "warning")
        return
      }
      await deleteFunction({ id: selectedChef }).unwrap()
      showToast("Chef deleted successfully", "success")
    } catch (error) {
      console.error("Error deleting chef:", error)
    } finally {
      setModalToggle(false)
    }
  }

  // Handle Add Chef
  async function handleAddChef() {
    if (inputName.trim() === "") {
      showToast("Please enter chef name", "warning")
      return
    }
    try {
      await createFunction({ name: inputName }).unwrap()
      showToast("Chef added successfully", "success")
    } catch (error) {
      console.error("Error adding chef:", error)
    } finally {
      setModalToggle(false)
      setInputName("")
    }
  }

  return {
    filteredList,
    handleSort,
    handleSelectChef,
    handleToggle,
    handleDelete,
    isLoading,
    isDeleting,
    modalToggle,
    setModalToggle,
    inputName,
    setInputName,
    mode,
    handleAddChef,
    isCreating,
  }
}

export default useChefHook
