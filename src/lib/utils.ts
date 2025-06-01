import { createElement, ReactElement } from "react"
import { toast, ToastIcon } from "react-toastify"
import SUCCESSICON from "../assets/toast_check.svg"
import WARNINGICON from "../assets/toast_warning.svg"

// Function to handle Toast Notifications
type ToastType = "success" | "warning" | "error" | "info"
export const showToast = (message: string, type: ToastType) => {
  const icons: Record<ToastType, ReactElement> = {
    success: createElement("img", {
      src: SUCCESSICON,
      alt: "success",
      width: 20,
      height: 20,
    }),
    warning: createElement("img", {
      src: WARNINGICON,
      alt: "warning",
      width: 20,
      height: 20,
    }),
    error: createElement("img", {
      src: WARNINGICON,
      alt: "success",
      width: 20,
      height: 20,
    }),
    info: createElement("img", {
      src: WARNINGICON,
      alt: "warning",
      width: 20,
      height: 20,
    }),
  }

  toast[type]!(message, {
    icon: icons[type] as ToastIcon,
    className: "text-white",
  })
}

// utils/isMobile.ts
export const isMobileDevice = () =>
  window.innerWidth <= 768 ||
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
