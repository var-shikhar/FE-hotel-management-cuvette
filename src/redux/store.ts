import { configureStore } from "@reduxjs/toolkit"
import chefAPI from "./slice/chef-slice"
import dashboardAPI from "./slice/dashboard-slice"
import menuAPI from "./slice/menu-slice"
import orderAPI from "./slice/order-slice"
import { selectedItemsReducer } from "./slice/selectedItem-slice"
import tableAPI from "./slice/table-slice"

export const store = configureStore({
  reducer: {
    selectedItem: selectedItemsReducer,
    [chefAPI.reducerPath]: chefAPI.reducer,
    [menuAPI.reducerPath]: menuAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    [tableAPI.reducerPath]: tableAPI.reducer,
    [dashboardAPI.reducerPath]: dashboardAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      chefAPI.middleware,
      menuAPI.middleware,
      orderAPI.middleware,
      tableAPI.middleware,
      dashboardAPI.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
