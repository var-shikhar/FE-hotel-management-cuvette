import { Link } from "react-router-dom"
import Button from "../components/button"

const PublicError = () => {
  return (
    <div className="error-page">
      <h1 className="landing_heading">404 - Page Not Found</h1>
      <div className="landing_paragraph">
        Oops! The page you're looking for doesn't exist.
      </div>
      <Link to="/">
        <Button type="button">Go Back Home</Button>
      </Link>
    </div>
  )
}

export default PublicError
