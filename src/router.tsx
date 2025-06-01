import { lazy } from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"
import AuthWrapper from "./pages/privateRoutes"

// Import Pages Dynamically (Lazy Loading for Better Performance)
const LANDING_PAGE = lazy(() => import("./pages/landing/landing"))
const PUBLIC_ERROR_PAGE = lazy(() => import("./pages/landing/public-error"))
const PRIVATE_ERROR_PAGE = lazy(() => import("./pages/landing/private-error"))
const PRIVACY_POLICY_PAGE = lazy(() => import("./pages/landing/privacy-poilcy"))
const TERMS_CONDITION_PAGE = lazy(
  () => import("./pages/landing/terms-condition")
)
const SIGN_IN_PAGE = lazy(() => import("./pages/auth/sign-in"))
const DASHBOARD_LAYOUT = lazy(() => import("./pages/dashboard/layout"))
const DASHBOARD_PAGE = lazy(() => import("./pages/dashboard/dashboard"))
const TABLE_PAGE = lazy(() => import("./pages/dashboard/tables"))
const ORDER_PAGE = lazy(() => import("./pages/dashboard/order"))
const MENU_PAGE = lazy(() => import("./pages/dashboard/menu"))
const BOOKING_CONFIRMATION = lazy(
  () => import("./pages/dashboard/booking-confirmation")
)
const CHEF_PAGE = lazy(() => import("./pages/dashboard/chef"))

const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    errorElement: <PUBLIC_ERROR_PAGE />,
    children: [
      { index: true, element: <LANDING_PAGE /> },
      { path: "privacy-policy", element: <PRIVACY_POLICY_PAGE /> },
      { path: "terms-and-conditions", element: <TERMS_CONDITION_PAGE /> },
      {
        path: "auth/sign-in",
        element: <AuthWrapper mode="Auth" element={<SIGN_IN_PAGE />} />,
      },
    ],
  },

  // Private Routes (Dashboard as Layout)
  {
    path: "/app",
    element: <AuthWrapper mode="Private" element={<DASHBOARD_LAYOUT />} />,
    errorElement: <PRIVATE_ERROR_PAGE />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DASHBOARD_PAGE />,
      },
      {
        path: "manage/table",
        element: <TABLE_PAGE />,
      },
      {
        path: "manage/orders",
        element: <ORDER_PAGE />,
      },
      {
        path: "manage/chef",
        element: <CHEF_PAGE />,
      },
      {
        path: "manage/menu",
        element: <MENU_PAGE />,
      },
      {
        path: "manage/booking-confirmation",
        element: <BOOKING_CONFIRMATION />,
      },
      {
        path: "menu",
        element: <MENU_PAGE />,
      },
      {
        path: "booking-confirmation",
        element: <BOOKING_CONFIRMATION />,
      },
    ],
  },

  // Error Pages
  { path: "/404", element: <PUBLIC_ERROR_PAGE /> },
  // Redirect unknown routes to home
  { path: "*", element: <Navigate to="/404" replace /> },
])

export default router
