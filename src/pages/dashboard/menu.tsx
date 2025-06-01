import React from "react"
import PlUS_ICON from "../../assets/plus-icon.svg"
import SEARCH_ICON from "../../assets/search.svg"
import MINUS_ICON from "../../assets/subtract.svg"
import Button from "../../components/button"
import "../../components/css/menu.css"
import Header from "../../components/header"
import LoadingSpinner from "../../components/spinner"
import useMenu from "../../hooks/use-menu"

const images = import.meta.glob("../../assets/*", {
  eager: true,
}) as Record<string, { default: string }>

const MenuPanel = () => {
  const {
    handleSearchInput,
    isLoading,
    searchInput,
    data,
    activeCategory,
    handleCategory,
    filteredMenu,
    selectedItems,
    handleMenuUpdate,
    handleNavigation,
  } = useMenu()

  if (isLoading) return <LoadingSpinner />
  return (
    <div>
      <Header title="Menu Panel" description="Place your order here" />
      <div className="search-wrapper">
        <img src={SEARCH_ICON} alt="search" />
        <input
          type="text"
          value={searchInput}
          title="search"
          placeholder="Search..."
          className="search-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSearchInput(e.target.value)
          }
        />
      </div>
      <div className="category-wrapper">
        {data?.category?.map((cat) => {
          const Icon = images[`../../assets/${cat.icon}`]?.default
          return (
            <div
              key={cat.id}
              onClick={() => handleCategory(cat)}
              className={`category-card ${
                activeCategory?.id === cat.id ? "active-category" : ""
              }`}
            >
              <img src={Icon} alt={"category-image"} />
              {cat.title}
            </div>
          )
        })}
      </div>
      <h2 className="category-title">{activeCategory?.title}</h2>
      <div className="menu-wrapper">
        {filteredMenu?.length > 0 ? (
          filteredMenu?.map((item) => {
            const isSelected = selectedItems.find(
              (option) => option.itemId === item.id
            )
            return (
              <div key={item.id} className="menu-item">
                <img
                  src={images[`../../assets/${item.image}`]?.default}
                  alt={"menu-image"}
                />
                <div className="menu-block">
                  <div className="menu-title">{item.title}</div>
                  <div className="menu-price">
                    <span>₹ {item.price}</span>
                    {isSelected ? (
                      <div>
                        <span
                          onClick={() => handleMenuUpdate("decrement", item)}
                        >
                          <img
                            src={MINUS_ICON}
                            alt={"minus"}
                            className="book-trigger"
                          />
                        </span>
                        <span>{isSelected.quantity}</span>
                        <span
                          onClick={() => handleMenuUpdate("increment", item)}
                        >
                          <img
                            src={PlUS_ICON}
                            alt={"plus"}
                            className="book-trigger"
                          />
                        </span>
                      </div>
                    ) : (
                      <span onClick={() => handleMenuUpdate("add", item)}>
                        <img src={PlUS_ICON} alt={"plus"} className="" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div>No menu items found!</div>
        )}
      </div>

      <Button
        type="button"
        className="next-btn"
        onClick={handleNavigation}
        disabled={selectedItems.length <= 0}
      >
        Next
      </Button>
    </div>
  )
}

export default MenuPanel
