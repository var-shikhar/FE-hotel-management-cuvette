import { Link } from "react-router-dom"
import LOGO from "../assets/logo.svg"
import "./css/logo-wrapper.css"

const LogoWrapper = () => {
  return (
    <Link to={"/"} className="logo-link">
      <div className="logo-wrapper">
        <img src={LOGO} alt="Hotel Management" width={45} />
      </div>
    </Link>
  )
}

export default LogoWrapper
