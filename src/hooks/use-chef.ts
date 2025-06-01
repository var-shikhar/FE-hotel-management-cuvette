/**
 * useTeamHook – Custom hook for managing team members in a team management context.
 *
 * - Fetches the list of members and provides functionality for sorting, filtering, and handling different modes (edit, delete, create).
 * - Handles user selection, modal toggling, and deletion of members.
 * - Provides helper functions for navigation, sorting, and updating team data.
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
