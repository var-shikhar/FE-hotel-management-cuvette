import type { TooltipItem } from "chart.js"
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js"
import { useState } from "react"
import { Line } from "react-chartjs-2"
import { TAnalytics } from "../redux/slice/dashboard-slice"

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
)

type Modes = "daily" | "weekly"

const RevenueChart = ({ data }: { data: TAnalytics["revenueSummary"] }) => {
  const [activeMode, setActiveMode] = useState<Modes>("daily")
  const revenueData = data?.[activeMode] ?? {}
  const chartData = {
    labels: Object.keys(revenueData),
    datasets: [
      {
        label: "Revenue",
        data: Object.values(revenueData),
        borderColor: "#000",
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
        fill: false,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Important: disables auto aspect ratio
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#555",
        },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#000",
        titleColor: "#fff",
        bodyColor: "#fff",
        displayColors: false,
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            return `Revenue: $${context.raw}`
          },
        },
      },
    },
  }
  return (
    <div className="table-status">
      <div className="dashboard-header">
        <span>
          <h5>Revenue</h5>
          <div className="status_type text-left">
            Find & Analyze revenue of your restaurant
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
        </select>
      </div>
      <div className="revenue-chart-wrapper">
        {Object.keys(revenueData).length === 0 ? (
          <p>No revenue data available.</p>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>
    </div>
  )
}

export default RevenueChart
