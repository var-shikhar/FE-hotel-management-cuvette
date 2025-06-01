import Button from "./button"
import "./css/header.css"

type Props = {
  title: string
  description?: string
  button?: {
    title: string
    handleClick: () => void
  }
}

const Header = ({ description, title, button }: Props) => {
  return (
    <div className="header-wrapper">
      <div className="header-content">
        <h3>{title}</h3>
        {description && <div className="text-secondary">{description}</div>}
      </div>
      {button && (
        <span>
          <Button
            type="button"
            variant="default"
            size="sm"
            className="min-w-max-content"
            onClick={button.handleClick}
          >
            {button.title}
          </Button>
        </span>
      )}
    </div>
  )
}
export default Header
