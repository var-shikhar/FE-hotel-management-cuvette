import React from "react"
import CROSS_ICON from "../../assets/cross.svg"
import DELIVERY_ICON from "../../assets/delivery.svg"
import LOCATION_ICON from "../../assets/location.svg"
import PlUS_ICON from "../../assets/plus-icon.svg"
import SEARCH_ICON from "../../assets/search.svg"
import MINUS_ICON from "../../assets/subtract.svg"
import Button from "../../components/button"
import "../../components/css/menu.css"
import "../../components/css/booking-confirmation.css"
import Modal from "../../components/dialog"
import LoadingSpinner from "../../components/spinner"
import SwipeButton from "../../components/swipe-button"
import useOrderConfirmation from "../../hooks/use-order-confirmation"

const images = import.meta.glob("../../assets/*", {
  eager: true,
}) as Record<string, { default: string }>

const MenuPanel = () => {
  const {
    handleSearchInput,
    searchInput,
    filteredMenu,
    handleMenuUpdate,
    activeType,
    OrderType,
    handleOrderType,
    modalToggle,
    mode,
    setModalToggle,
    handleOrderDetails,
    orderDetails,
    handleModalToggle,
    isLoading,
    handleNewOrder,
  } = useOrderConfirmation()

  if (isLoading) return <LoadingSpinner />
  return (
    <>
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
      <div className="bookedItem-wrapper">
        {filteredMenu?.length > 0 ? (
          filteredMenu?.map((item) => (
            <div key={item.itemId} className="booked-item">
              <img
                src={images[`../../assets/${item.image}`]?.default}
                className={"item-image"}
                alt="menu-image"
              />
              <div className="booked-item-block">
                <img
                  src={CROSS_ICON}
                  alt={"cross_icon"}
                  className="cross_icon"
                  onClick={() => handleMenuUpdate("remove", item.itemId)}
                />
                <div className="menu-title">{item.title}</div>
                <div className="menu-description">{item.description}</div>
                <div className="menu-price">
                  <span>₹ {item.price}</span>
                  <div>
                    <span
                      onClick={() => handleMenuUpdate("decrement", item.itemId)}
                    >
                      <img
                        src={MINUS_ICON}
                        alt={"minus"}
                        className="book-trigger"
                      />
                    </span>
                    <span>{item.quantity}</span>
                    <span
                      onClick={() => handleMenuUpdate("increment", item.itemId)}
                    >
                      <img
                        src={PlUS_ICON}
                        alt={"plus"}
                        className="book-trigger"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No items to order!</div>
        )}
      </div>
      <small
        className="instruction-line"
        onClick={() => handleModalToggle("Instruction")}
      >
        Add cooking instructions (optional)
      </small>
      <div className="type-wrapper">
        {OrderType?.map((item) => (
          <span
            key={item.id}
            className={activeType === item.type ? "active-type" : ""}
            onClick={() => handleOrderType(item.type)}
          >
            {item.type}
          </span>
        ))}
      </div>
      <div className="booking-total">
        <div>
          <span>Item Total</span>
          <span>₹ {orderDetails.total}</span>
        </div>
        {activeType === "Take-Away" && (
          <div>
            <span>Delivery Charges</span>
            <span>₹ 50</span>
          </div>
        )}
        <div>
          <span>Tax</span>
          <span>₹ {orderDetails.tax}</span>
        </div>
        <div>
          <span>
            <b>Grant Total</b>
          </span>
          <span>
            ₹{" "}
            {orderDetails.total +
              orderDetails.tax +
              (activeType === "Take-Away" ? orderDetails.deliveryCharges : 0)}
          </span>
        </div>
      </div>
      <div className="client-detail">
        <h5>Your Details</h5>
        <div>
          {orderDetails.clientName}, {orderDetails.clientPhone}
        </div>
      </div>
      <div className="client-detail">
        {activeType === "Take-Away" && (
          <div className="flex-gap">
            <img src={LOCATION_ICON} alt="location" />
            <span>Delivery at Home - {orderDetails.location}</span>
          </div>
        )}
        <div className="flex-gap">
          <img src={DELIVERY_ICON} alt="location" />
          <span>
            Delivery in - <b>{orderDetails.preprationTime} mins</b>
          </span>
        </div>
      </div>
      <SwipeButton onComplete={handleNewOrder} />
      <Modal
        open={modalToggle}
        onClose={setModalToggle}
        title={
          mode === "Address"
            ? "Update Address"
            : mode === "Instruction"
            ? "Add Cooking Instructions"
            : "Update Deatils"
        }
        size={"small"}
      >
        <div className="input-box">
          {mode === "Detail" ? (
            <>
              <input
                type="text"
                name="clientName"
                title="clientName"
                placeholder="Your Name"
                className="input-class"
                value={orderDetails.clientName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOrderDetails("clientName", e.target.value)
                }
              />
              <input
                type={"tel"}
                name="clientPhone"
                title="clientPhone"
                className="input-class"
                placeholder="Your Phone"
                value={orderDetails.clientPhone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOrderDetails("clientPhone", e.target.value)
                }
              />
            </>
          ) : (
            <>
              <textarea
                rows={5}
                name="location"
                placeholder={
                  mode === "Address" ? "Address ..." : "Update Instructions"
                }
                title="location"
                className="input-class"
                value={
                  mode === "Address"
                    ? orderDetails.location
                    : orderDetails.cookingInstructions
                }
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  const key =
                    mode === "Address" ? "location" : "cookingInstructions"
                  handleOrderDetails(key, e.target.value)
                }}
              />
              {mode === "Instruction" && (
                <small>
                  The restaurant will try its best to follow your request.
                  However, refunds or cancellations in this regard won’t be
                  possible
                </small>
              )}
            </>
          )}
          <div className="confirm-btns">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setModalToggle(false)}
            >
              Close
            </Button>
            <Button
              type="button"
              color="primary"
              size="sm"
              onClick={() => setModalToggle(false)}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default MenuPanel
