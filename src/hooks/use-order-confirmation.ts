/**
 * useOrderConfirmation – Custom hook to manage order confirmation flow in a food ordering app.
 *
 * Responsibilities:
 * - Manage selected items and filter them by search input.
 * - Handle order type selection (Dine-in or Take-Away) with validation.
 * - Maintain order details state (client info, instructions, delivery charges, totals, location, tax, preparation time).
 * - Calculate totals, tax, and preparation time dynamically based on selected items.
 * - Manage modal visibility and mode (Address, Detail, Instruction).
 * - Provide functions to update item quantities in the cart (increment, decrement, remove).
 * - Handle order submission through API mutation, including input validation and post-submission cleanup.
 * - Navigate back on successful order placement.
 *
 * Returns:
 * - searchInput: Current search string for filtering selected items.
 * - handleSearchInput: Function to update search input state.
 * - filteredMenu: Selected items filtered by search input.
 * - handleMenuUpdate: Function to modify item quantities or remove items.
 * - activeType: Currently selected order type.
 * - OrderType: Available order types array.
 * - handleOrderType: Function to set active order type with validation.
 * - modalToggle: Boolean controlling visibility of modal.
 * - setModalToggle: Setter for modal visibility state.
 * - mode: Current modal mode (Address, Detail, Instruction).
 * - orderDetails: Object holding client/order related details.
 * - handleModalToggle: Function to toggle modal visibility and mode.
 * - handleOrderDetails: Function to update order details fields.
 * - isLoading: Boolean indicating if order submission is in progress.
 * - handleNewOrder: Async function to validate and submit the new order.
 */

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
