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
