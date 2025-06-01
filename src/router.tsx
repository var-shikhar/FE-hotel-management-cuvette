import { lazy } from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"
import AuthWrapper from "./pages/privateRoutes"

// Import Pages Dynamically (Lazy Loading for Better Performance)
const PUBLIC_ERROR_PAGE = lazy(() => import("./pages/public-error"))
const PRIVATE_ERROR_PAGE = lazy(() => import("./pages/private-error"))
const DASHBOARD_LAYOUT = lazy(() => import("./pages/layout"))
const PUBLIC_LAYOUT = lazy(() => import("./pages/public-layout"))
const DASHBOARD_PAGE = lazy(() => import("./pages/dashboard"))
const TABLE_PAGE = lazy(() => import("./pages/tables"))
const ORDER_PAGE = lazy(() => import("./pages/order"))
const MENU_PAGE = lazy(() => import("./pages/menu"))
const BOOKING_CONFIRMATION = lazy(() => import("./pages/booking-confirmation"))
const CHEF_PAGE = lazy(() => import("./pages/chef"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthWrapper element={<DASHBOARD_LAYOUT />} desktopOnly />,
    errorElement: <PRIVATE_ERROR_PAGE />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <AuthWrapper element={<DASHBOARD_PAGE />} desktopOnly />,
      },
      {
        path: "manage/table",
        element: <AuthWrapper element={<TABLE_PAGE />} desktopOnly />,
      },
      {
        path: "manage/orders",
        element: <AuthWrapper element={<ORDER_PAGE />} desktopOnly />,
      },
      {
        path: "manage/chef",
        element: <AuthWrapper element={<CHEF_PAGE />} desktopOnly />,
      },
      {
        path: "manage/menu",
        element: <AuthWrapper element={<MENU_PAGE />} desktopOnly />,
      },
      {
        path: "manage/booking-confirmation",
        element: <AuthWrapper element={<BOOKING_CONFIRMATION />} desktopOnly />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthWrapper element={<PUBLIC_LAYOUT />} mobileOnly />,
    children: [
      {
        path: "menu",
        element: <AuthWrapper element={<MENU_PAGE />} mobileOnly />,
      },
      {
        path: "booking-confirmation",
        element: <AuthWrapper element={<BOOKING_CONFIRMATION />} mobileOnly />,
      },
    ],
  },
  // Public error and fallback
  // { path: "/404", element: <PUBLIC_ERROR_PAGE /> },
  // { path: "*", element: <Navigate to="/404" replace /> },
])

export default router
