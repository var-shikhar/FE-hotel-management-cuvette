import { startTransition, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { showToast } from "../lib/utils"
import {
  TOrderType,
  usePostNewBookingMutation,
} from "../redux/slice/menu-slice"
import {
  clearItems,
  decrementItem,
  deleteItem,
  incrementItem,
} from "../redux/slice/selectedItem-slice"
import { RootState } from "../redux/store"

type TType = {
  id: string
  type: TOrderType
}

const OrderType: TType[] = [
  { id: "1", type: "Dine-in" },
  { id: "2", type: "Take-Away" },
]

const useOrderConfirmation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selectedItems = useSelector((state: RootState) => state.selectedItem)
  const [postNewOrder, { isLoading }] = usePostNewBookingMutation()

  const [modalToggle, setModalToggle] = useState(false)
  const [mode, setMode] = useState<"Address" | "Detail" | "Instruction">(
    "Detail"
  )
  const [orderDetails, setOrderDetails] = useState({
    clientName: "",
    clientPhone: "",
    cookingInstructions: "",
    deliveryCharges: 50,
    total: 0,
    location: "",
    tax: 0,
    preprationTime: 0,
  })
  const [activeType, setActiveType] = useState<TOrderType>("Dine-in")
  const [searchInput, setSearchInput] = useState("")

  const filteredMenu = useMemo(() => {
    let tempList = [...(selectedItems ?? [])]
    if (searchInput !== "")
      tempList = tempList.filter((it) =>
        it.title.toLowerCase().includes(searchInput.toLowerCase())
      )

    return tempList
  }, [selectedItems, searchInput])

  useEffect(() => {
    let value = false
    let newMode = "Detail"
    if (orderDetails.clientName === "" || orderDetails.clientPhone === "") {
      value = true
      newMode = "Detail"
    }

    setModalToggle(value)
    setMode(newMode as "Address" | "Detail" | "Instruction")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let total = 0
    let tax = 0
    let preprationTime = 0
    selectedItems?.forEach((it) => {
      total += it.price * it.quantity
      tax += it.tax * it.quantity
      preprationTime += it.preparationTime * it.quantity
    })
    setOrderDetails((prev) => ({
      ...prev,
      total,
      tax,
      preprationTime,
    }))
  }, [selectedItems])

  const handleSearchInput = (value: string) => setSearchInput(value)
  const handleOrderType = (type: TOrderType) => {
    if (type === "Take-Away" && orderDetails.location === "") {
      setModalToggle(true)
      setMode("Address")
    }
    setActiveType(type)
  }
  const handleMenuUpdate = (
    type: "remove" | "increment" | "decrement",
    itemID: string
  ) => {
    switch (type) {
      case "remove":
        dispatch(deleteItem(itemID))
        break

      case "increment":
        dispatch(incrementItem(itemID))
        break

      case "decrement":
        dispatch(decrementItem(itemID))
        break

      default:
        break
    }
  }

  const handleModalToggle = (mode: "Address" | "Detail" | "Instruction") => {
    startTransition(() => {
      setModalToggle(true)
      setMode(mode)
    })
  }

  const handleOrderDetails = (key: string, value: string) => {
    startTransition(() => {
      setOrderDetails((prev) => ({
        ...prev,
        [key]: value,
      }))
    })
  }

  const handleNewOrder = async () => {
    try {
      if (
        orderDetails.clientName === "" ||
        orderDetails.clientPhone === "" ||
        selectedItems?.length <= 0
      ) {
        showToast("Please fill all the details", "error")
        return
      }
      await postNewOrder({
        clientName: orderDetails.clientName,
        clientPhone: orderDetails.clientPhone,
        itemJSON: selectedItems ?? [],
        cookingInstructions: orderDetails.cookingInstructions,
        deliveryCharges: orderDetails.deliveryCharges,
        total: orderDetails.total,
        location: orderDetails.location,
        orderType: activeType,
      }).unwrap()
      showToast("Order placed successfully", "success")
    } catch (err) {
      console.log(err)
    } finally {
      dispatch(clearItems())
      setOrderDetails((prev) => ({
        ...prev,
        clientName: "",
        clientPhone: "",
        cookingInstructions: "",
        deliveryCharges: 50,
        location: "",
      }))
      navigate(-1)
    }
  }

  return {
    searchInput,
    handleSearchInput,
    filteredMenu,
    handleMenuUpdate,
    activeType,
    OrderType,
    handleOrderType,
    modalToggle,
    setModalToggle,
    mode,
    orderDetails,
    handleModalToggle,
    handleOrderDetails,
    isLoading,
    handleNewOrder,
  }
}

export default useOrderConfirmation
