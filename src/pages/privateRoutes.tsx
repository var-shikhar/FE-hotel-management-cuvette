import { JSX } from "react"
import { Navigate } from "react-router-dom"
import { isMobileDevice } from "../lib/utils" // adjust path as needed

type TElements = {
  element: JSX.Element
  mobileOnly?: boolean
  desktopOnly?: boolean
}

const AuthWrapper = ({ element, mobileOnly, desktopOnly }: TElements) => {
  const isMobile = isMobileDevice()
  if (mobileOnly && !isMobile) {
    return <Navigate to="/dashboard" replace />
  }

  if (desktopOnly && isMobile) {
    return <Navigate to="/menu" replace />
  }

  return element
}

export default AuthWrapper
