import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js'

export default function () {
  // Register only required components
  Chart.register(DoughnutController, ArcElement, Tooltip)
}
