import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type RLAgentChartProps = {
  userRewards: number[];
  agentRewards: number[];
};

export default function RLAgentChart({ userRewards, agentRewards }: RLAgentChartProps) {
  // Ensure at least two points for chart.js
  const safeUser = userRewards.length < 2 ? [0, ...userRewards] : userRewards;
  const safeAgent = agentRewards.length < 2 ? [0, ...agentRewards] : agentRewards;
  const maxLen = Math.max(safeUser.length, safeAgent.length);
  const labels = Array.from({ length: maxLen }, (_, i) => `Scenario ${i + 1}`);
  const data = {
    labels,
    datasets: [
      {
        label: "User",
        data: [...safeUser, ...Array(maxLen - safeUser.length).fill(safeUser[safeUser.length-1] ?? 0)],
        borderColor: "#2563eb",
        backgroundColor: "#2563eb33",
        tension: 0.3,
      },
      {
        label: "Agent",
        data: [...safeAgent, ...Array(maxLen - safeAgent.length).fill(safeAgent[safeAgent.length-1] ?? 0)],
        borderColor: "#a21caf",
        backgroundColor: "#a21caf33",
        tension: 0.3,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Cumulative Reward: User vs RL Agent" },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Cumulative Reward" } },
      x: { title: { display: true, text: "Scenario" } },
    },
  };
  return <Line data={data} options={options} />;
}
