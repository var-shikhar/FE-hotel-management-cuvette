// Common page for setting and managing all Project Routes

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL
export const ROUTES = {
  // Panel Routes
  ChefRoute: `${BACKEND_URL}/admin/chef`,
  DashboardRoute: `${BACKEND_URL}/admin/dashboard`,
  CommonOrderRoute: `${BACKEND_URL}/admin/order`,
  CommonTableRoute: `${BACKEND_URL}/admin/table`,

  MenuRoute: `${BACKEND_URL}/admin/menu`,
  BookingRoute: `${BACKEND_URL}/admin/booking`,
}
