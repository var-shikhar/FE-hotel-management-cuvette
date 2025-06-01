import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js"
import { Line } from "react-chartjs-2"
import type { TooltipItem } from "chart.js"

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
)

const RevenueChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue",
        data: [20, 45, 30, 50, 40, 70, 55],
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
    <div className="revenue-chart-wrapper">
      <Line data={data} options={options} />
    </div>
  )
}

export default RevenueChart
