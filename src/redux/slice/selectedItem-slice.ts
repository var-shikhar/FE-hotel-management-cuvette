import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type TSelectedItem = {
  itemId: string
  price: number
  quantity: number
  tax: number
  title: string
  image: string
  description: string
  preparationTime: number
}

const initialState: TSelectedItem[] = []
const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    addOrIncrementItem: (state, action: PayloadAction<TSelectedItem>) => {
      const existingItem = state.find(
        (item) => item.itemId === action.payload.itemId
      )
      if (existingItem) existingItem.quantity += 1
      else state.push({ ...action.payload, quantity: 1 })
    },
    incrementItem: (state, action: PayloadAction<string>) => {
      const item = state.find((i) => i.itemId === action.payload)
      if (item) item.quantity += 1
    },
    decrementItem: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((i) => i.itemId === action.payload)
      if (index !== -1) {
        if (state[index].quantity > 1) {
          state[index].quantity -= 1
        } else {
          state.splice(index, 1)
        }
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((i) => i.itemId === action.payload)
      if (index !== -1) state.splice(index, 1)
    },
    clearItems: () => initialState,
  },
})

export const {
  addOrIncrementItem,
  incrementItem,
  decrementItem,
  deleteItem,
  clearItems,
} = selectedItemsSlice.actions

export const selectedItemsReducer = selectedItemsSlice.reducer
