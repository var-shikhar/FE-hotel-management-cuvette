// Common page for setting and managing all Project Routes

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL
export const ROUTES = {
  LoginRoute: `${BACKEND_URL}/auth/login`,
  LogoutRoute: `${BACKEND_URL}/auth/logout`,
  ChefRoute: `${BACKEND_URL}/auth/chef`,

  // Panel Routes
  DashboardRoute: `${BACKEND_URL}/admin/dashboard`,
  CommonOrderRoute: `${BACKEND_URL}/admin/order`,
  CommonTableRoute: `${BACKEND_URL}/admin/table`,

  MenuRoute: `${BACKEND_URL}/admin/menu`,
  BookingRoute: `${BACKEND_URL}/admin/booking`,
}
