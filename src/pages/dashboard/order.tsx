import "../../components/css/menu.css"
import "../../components/css/order.css"
import Header from "../../components/header"
import LoadingSpinner from "../../components/spinner"
import useOrderDashboard from "../../hooks/use-order-dashboard"
import ICON from "../../assets/folk.svg"
import COMPLETE_ICON from "../../assets/toast_check.svg"
import PROCESSING_ICON from "../../assets/processing.svg"
import COMPLETED_ICON from "../../assets/check.svg"
import Button from "../../components/button"

const OrderDashboard = () => {
  const { isLoading, isUpdating, orderList, handleUpdateTable } =
    useOrderDashboard()
  if (isLoading || isUpdating) return <LoadingSpinner />
  return (
    <>
      <Header
        title="Order Panel"
        description="Manage all your orders at one place!"
      />
      <div className="orderList-wrapper">
        {(orderList?.length ?? 0) >= 0 ? (
          orderList?.map((order) => {
            const isCompleted = order.status === "Completed"
            const isTakeAway = order.orderType === "Take-Away"
            return (
              <div
                key={order.orderID}
                className={`order-card ${
                  isCompleted ? "done" : isTakeAway ? "takeaway" : "dinein"
                }`}
              >
                <div className="order-header">
                  <span className="order-number-wrapper">
                    <span className="order-number">
                      <img src={ICON} alt="icon" /># {order.orderNumber}
                    </span>
                    <span>
                      {order.tableName}({order.tableNo})
                    </span>
                    <span>{order.assignedTime}</span>
                    <span>
                      {order.items.length} Item
                      {order.items.length > 1 ? "s" : ""}
                    </span>
                  </span>
                  <div
                    className={`order-type ${
                      order.status === "Completed" ? "served" : ""
                    }`}
                  >
                    <div>{order.orderType}</div>
                    <span>
                      {order.status === "Completed" ? "Served" : order.status}
                    </span>
                  </div>
                </div>
                {!isCompleted && (
                  <span
                    className="complete-order"
                    onClick={() => handleUpdateTable(order.orderID)}
                  >
                    <img src={COMPLETE_ICON} alt="complete" />
                    Complete Order
                  </span>
                )}
                <div className="order-meta">
                  <span className="title">Client Name: -</span>
                  <span className="meta-detail">{order.clientName}</span>
                </div>
                <div className="order-meta">
                  <span className="title">Client No: -</span>
                  <span className="meta-detail">{order.clientPhone}</span>
                </div>
                <div className="order-items">
                  <div>
                    <strong>Value Set Meals</strong>
                  </div>
                  {order.items.map((it, index) => (
                    <div key={index} className="order-item">
                      {it.itemQuantity} x {it.itemName}
                    </div>
                  ))}
                </div>
                <Button
                  className={`order-button  ${
                    isCompleted
                      ? "done"
                      : isTakeAway
                      ? "btn-takeaway"
                      : "btn-dinein"
                  }`}
                >
                  {isCompleted ? "Order Done" : "Processing"}
                  <img
                    src={isCompleted ? COMPLETED_ICON : PROCESSING_ICON}
                    alt="processing"
                  />
                </Button>
              </div>
            )
          })
        ) : (
          <div>No order found!</div>
        )}
      </div>
    </>
  )
}

export default OrderDashboard
