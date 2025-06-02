/**
 * useMenu – A custom hook for managing the menu system in a restaurant or food ordering context.
 *
 * Features:
 * - Fetches menu and category data using Redux Toolkit Query.
 * - Maintains and updates state for:
 *    - Active category selection
 *    - Search input for filtering menu items
 * - Dynamically filters menu items based on selected category and search input.
 * - Handles item updates in the selected cart using Redux actions:
 *    - Add a new item or increment its quantity
 *    - Increment quantity of an existing item
 *    - Decrement quantity of an existing item
 * - Determines if the "All" category exists and sets it as the default category.
 * - Handles navigation from the menu page to the booking confirmation page.
 *
 * Returns:
 * - searchInput: Current search input string
 * - handleSearchInput: Function to update search input
 * - isLoading: Boolean indicating if the menu data is still loading
 * - activeCategory: Currently selected category
 * - handleCategory: Function to change the active category
 * - filteredMenu: List of menu items filtered by category and search
 * - data: Full menu and category data
 * - selectedItems: Items selected for order/cart from Redux store
 * - handleMenuUpdate: Function to manage item updates (add, increment, decrement)
 * - handleNavigation: Function to navigate to booking confirmation page
 */

import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  TCategory,
  TMenu,
  useGetMenuListQuery,
} from "../redux/slice/menu-slice"
import {
  addOrIncrementItem,
  decrementItem,
  incrementItem,
} from "../redux/slice/selectedItem-slice"
import { RootState } from "../redux/store"
import { useNavigate } from "react-router-dom"

const useMenu = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectedItems = useSelector((state: RootState) => state.selectedItem)

  const { data, isLoading } = useGetMenuListQuery()
  const [activeCategory, setActiveCategory] = useState<TCategory | null>(null)
  const [searchInput, setSearchInput] = useState("")

  const AllCategory = useMemo(() => {
    const foundAll = data?.category.find((it) => it.title === "All")
    if (foundAll) setActiveCategory(foundAll)
    return foundAll
  }, [data])

  const filteredMenu = useMemo(() => {
    let tempList = [...(data?.menu ?? [])]
    if (activeCategory && activeCategory.id !== AllCategory?.id) {
      tempList = tempList.filter(
        (it) => it.categoryId.toString() === activeCategory.id.toString()
      )
    }
    if (searchInput !== "")
      tempList = tempList.filter((it) =>
        it.title.toLowerCase().includes(searchInput.toLowerCase())
      )

    return tempList
  }, [data, searchInput, activeCategory, AllCategory])

  const handleSearchInput = (value: string) => setSearchInput(value)
  const handleCategory = (cat: TCategory) => setActiveCategory(cat)

  const handleMenuUpdate = (
    type: "add" | "increment" | "decrement",
    item: TMenu
  ) => {
    switch (type) {
      case "add":
        dispatch(
          addOrIncrementItem({
            itemId: item.id,
            price: item.price,
            quantity: 1,
            tax: item.tax,
            title: item.title,
            image: item.image,
            description: item.description,
            preparationTime: item.preparationTime,
          })
        )
        break

      case "increment":
        dispatch(incrementItem(item.id))
        break

      case "decrement":
        dispatch(decrementItem(item.id))
        break

      default:
        break
    }
  }

  const handleNavigation = () => {
    const currentPath = window.location.pathname
    if (currentPath.includes("/menu")) {
      const newPath = currentPath.replace("/menu", "/booking-confirmation")
      navigate(newPath, { replace: true })
    } else {
      navigate("/booking-confirmation")
    }
  }

  return {
    searchInput,
    handleSearchInput,
    isLoading,
    activeCategory,
    handleCategory,
    filteredMenu,
    data,
    selectedItems,
    handleMenuUpdate,
    handleNavigation,
  }
}

export default useMenu
