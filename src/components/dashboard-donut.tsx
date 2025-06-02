import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js"
import { useState } from "react"
import { Doughnut } from "react-chartjs-2"
import { TAnalytics } from "../redux/slice/dashboard-slice"
import "./css/dashboard.css"

ChartJS.register(ArcElement, Tooltip, Legend)

type Modes = "daily" | "weekly" | "monthly" | "yearly"

const DashboardDonut = ({
  data,
  total,
}: {
  data: TAnalytics["orderSummary"]
  total: number
}) => {
  const [activeMode, setActiveMode] = useState<Modes>("daily")
  const donutData = {
    labels: ["Take Away", "Served", "Dine In"],
    datasets: [
      {
        data: [
          data[activeMode as keyof typeof data]["Take-Away"],
          data[activeMode as keyof typeof data]["Completed"],
          data[activeMode as keyof typeof data]["Dine-in"],
        ],
        backgroundColor: ["#8bffe8", "#a1ff8b", "#ffea8b"],
        borderWidth: 0,
      },
    ],
  }

  return (
    <div className="table-status">
      <div className="dashboard-header">
        <span>
          <h5>Order Summary</h5>
          <div className="status_type text-left">
            Find summary of all your orders
          </div>
        </span>
        <select
          className=""
          title="filter"
          value={activeMode}
          onChange={(e) => setActiveMode(e.target.value as Modes)}
        >
          <option value={"daily"}>Daily</option>
          <option value={"weekly"}>Weekly</option>
          <option value={"monthly"}>Monthly</option>
          <option value={"yearly"}>Yearly</option>
        </select>
      </div>
      <div className="dashboard">
        <div className="summary-cards">
          <div className="card">
            <div>{data[activeMode as keyof typeof data]["Completed"]}</div>
            <small>Served</small>
          </div>
          <div className="card">
            <div>{data[activeMode as keyof typeof data]["Dine-in"]}</div>
            <small>Dine-in</small>
          </div>
          <div className="card">
            <div>{data[activeMode as keyof typeof data]["Take-Away"]}</div>
            <small>Take Away</small>
          </div>
        </div>

        <div className="chart-section">
          <div className="donut-chart">
            <Doughnut data={donutData} />
          </div>

          <div className="stats">
            <div className="stat">
              <span>
                Take Away (
                {Math.round(
                  (data[activeMode as keyof typeof data]["Take-Away"] / total) *
                    100
                )}
                %)
              </span>
              <div className="bar bar1"></div>
            </div>
            <div className="stat">
              <span>
                Served ({" "}
                {Math.round(
                  (data[activeMode as keyof typeof data]["Completed"] / total) *
                    100
                )}
                %)
              </span>
              <div className="bar bar2"></div>
            </div>
            <div className="stat">
              <span>
                Dine In ({" "}
                {Math.round(
                  (data[activeMode as keyof typeof data]["Dine-in"] / total) *
                    100
                )}
                %)
              </span>
              <div className="bar bar3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardDonut
