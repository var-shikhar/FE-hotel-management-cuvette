import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import "./css/dashboard.css"

ChartJS.register(ArcElement, Tooltip, Legend)

const DashboardDonut = () => {
  const data = {
    labels: ["Take Away", "Served", "Dine In"],
    datasets: [
      {
        data: [24, 41, 39],
        backgroundColor: ["#8bffe8", "#a1ff8b", "#ffea8b"],
        borderWidth: 0,
      },
    ],
  }

  return (
    <div className="dashboard">
      <div className="summary-cards">
        <div className="card">
          <div>09</div>
          <small>Served</small>
        </div>
        <div className="card">
          <div>05</div>
          <small>Dine In</small>
        </div>
        <div className="card">
          <div>06</div>
          <small>Take Away</small>
        </div>
      </div>

      <div className="chart-section">
        <div className="donut-chart">
          <Doughnut data={data} />
        </div>

        <div className="stats">
          <div className="stat">
            <span>Take Away (24%)</span>
            <div className="bar bar1"></div>
          </div>
          <div className="stat">
            <span>Served (41%)</span>
            <div className="bar bar2"></div>
          </div>
          <div className="stat">
            <span>Dine In (39%)</span>
            <div className="bar bar3"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardDonut
