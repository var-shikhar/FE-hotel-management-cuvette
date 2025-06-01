/*
|--------------------------------------------------------------------------- 
| Aside Component
|--------------------------------------------------------------------------- 
| A responsive sidebar component that adapts to mobile and desktop views. 
| The sidebar displays navigation links with icons and titles, which are 
| dynamically generated from the `ASIDE_LIST` array. The navigation changes 
| based on whether the screen size is mobile or desktop. On mobile, a fixed 
| header with a user profile icon and a bottom navigation bar is shown, 
| while on desktop, a vertical navigation bar is displayed. The component 
| also includes a user sign-out feature triggered by the user profile icon. 
| The component uses `useDispatch` to handle user logout by dispatching the 
| `logoutUser` action from Redux. 
*/

import clsx from "clsx"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import ORDER_SVG from "../assets/bxs_food-menu.svg"
import CHAIR_SVG from "../assets/chair.svg"
import DASHBOARD_SVG from "../assets/dashboard.svg"
import ANALYTICS_SVG from "../assets/mdi_analytics.svg"
import PROFILE_SVG from "../assets/profile.svg"
import TEAM_SVG from "../assets/team.svg"
import "./css/aside.css"
import LogoWrapper from "./logo-wrapper"

// Aside List
const ASIDE_LIST = [
  {
    id: 1,
    title: "Dashboard",
    navigationURL: "dashboard",
    icon: DASHBOARD_SVG,
  },
  {
    id: 2,
    title: "Tables",
    navigationURL: "manage/table",
    icon: CHAIR_SVG,
  },
  {
    id: 3,
    title: "Orders",
    navigationURL: "manage/orders",
    icon: ORDER_SVG,
  },
  {
    id: 4,
    title: "Menu",
    navigationURL: "manage/menu",
    icon: ANALYTICS_SVG,
  },
  {
    id: 5,
    title: "Chef",
    navigationURL: "manage/chef",
    icon: TEAM_SVG,
  },
]

const Aside = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // Set the initial state based on the window width
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)")
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    setIsMobile(mediaQuery.matches)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Handle Mobile View
  if (isMobile) {
    return (
      <>
        {/* Mobile Header (Fixed at Top) */}
        <div className="mobile-header">
          <LogoWrapper />
          <div className="user-wrapper">
            <div className="mobile-user">
              <img src={PROFILE_SVG} alt="User" width={25} />
            </div>
            <div className="user-popup-content">Signout</div>
          </div>
        </div>

        {/* Bottom Navigation (Fixed at Bottom) */}
        <nav className="mobile-bottom-nav">
          {ASIDE_LIST.map((item) => (
            <NavLink
              key={item.id}
              to={`./${item.navigationURL}`}
              className={({ isActive }) =>
                clsx("mobile-nav-link", {
                  "active-link": isActive,
                })
              }
              end
            >
              <img
                src={item.icon}
                alt={item.title}
                width={25}
                className="nav-icon"
              />
            </NavLink>
          ))}
        </nav>
      </>
    )
  }

  return (
    <>
      <div>
        {/* Header */}
        <LogoWrapper />

        {/* Navigation */}
        <nav className="navigation-wrapper">
          {ASIDE_LIST.map((item) => (
            <NavLink
              key={item.id}
              to={`./${item.navigationURL}`}
              className={({ isActive }) =>
                clsx("nav-link", {
                  "active-link": isActive,
                })
              }
              end
            >
              <img
                src={item.icon}
                alt={item.title}
                width={25}
                className="nav-icon"
              />
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="aside-footer">
        <div className="user-popup-trigger">
          <img src={PROFILE_SVG} alt="user" width={25} />
        </div>

        <div className="user-popup-content">Sign Out</div>
      </div>
    </>
  )
}

export default Aside
