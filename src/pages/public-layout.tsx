// Common Layout Wrapper for all the Private Pages
import { Outlet } from "react-router-dom"
import "../components/css/layout.css"

const DashboardLayout = () => {
  return (
    <div className={`layout-wrapper`}>
      <main className={`main-wrapper hidden-scrollbar`}>
        <Outlet />
        <div className="private-footer" />
      </main>
    </div>
  )
}

export default DashboardLayout
