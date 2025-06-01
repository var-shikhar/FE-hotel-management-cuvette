import CHEF_ICON from "../../assets/bowl.svg"
import ORDER_ICON from "../../assets/orders.svg"
import REVENUE_ICON from "../../assets/ph_currency-inr-bold.svg"
import CLIENT_ICON from "../../assets/users.svg"
import "../../components/css/chef.css"
import "../../components/css/dashboard.css"
import Header from "../../components/header"
import InfoCard from "../../components/info-card"
import LoadingSpinner from "../../components/spinner"
import useAnalytics from "../../hooks/use-analytics"

const Dashboard = () => {
  const { data, isLoading } = useAnalytics()

  if (isLoading || !data) return <LoadingSpinner />
  return (
    <>
      <Header title="Dashboard" />
      <div className="info-cards">
        <InfoCard title="Total Chef" value={data.totalChef} icon={CHEF_ICON} />
        <InfoCard
          title="Total Revenue"
          value={data.totalRevenue}
          icon={REVENUE_ICON}
        />
        <InfoCard
          title="Total Orders"
          value={data.totalOrder}
          icon={ORDER_ICON}
        />
        <InfoCard
          title="Total Clients"
          value={data.totalClient}
          icon={CLIENT_ICON}
        />
      </div>

      <div className="dashboard-row">
        <div className="table-status">
          <h5>Table Availability</h5>
          <div className="status_type">
            <span>
              <span className="pointer status_availability" />
              Reserved
            </span>
            <span>
              <span className="pointer" />
              Available
            </span>
          </div>
          <div className="table-grid">
            {data.tableData?.map((item) => (
              <div
                key={item.tableDataID}
                className={`table-box ${item.isAvailable ? "available" : ""}`}
              >
                <span className="ana_table-name">{item.tableName}</span>
                <span className="ana_table-no">{item.tableNo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="chef-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Full Name</th>
              <th>Total Orders</th>
            </tr>
          </thead>
          <tbody>
            {data.chefList?.length > 0 ? (
              data.chefList.map((item, idx) => (
                <tr key={item.chefId}>
                  <td>{idx + 1}</td>
                  <td>{item.chefName}</td>
                  <td>{item.totalOrders}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No Chef found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Dashboard
