// components/LiveHoldersChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import { useQuery, useSubscription } from "@apollo/client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ALL_DAILY_HOLDER_COUNTS, DAILY_HOLDER_COUNT } from "@/app/lib/subs";

// Register the components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function sortDates(array) {
  return array.slice().sort((a, b) => {
    const [yearA, monthA, dayA] = a.date.split("-").map(Number);
    const [yearB, monthB, dayB] = b.date.split("-").map(Number);

    if (yearA !== yearB) return yearA - yearB;
    if (monthA !== monthB) return monthA - monthB;
    return dayA - dayB;
  });
}

const LiveHoldersChart: React.FC = () => {
  const { data: dailyHolderCountData } = useSubscription(DAILY_HOLDER_COUNT);
  const { data: allDailyHolderCountData } = useQuery(ALL_DAILY_HOLDER_COUNTS);

  if (!dailyHolderCountData || !allDailyHolderCountData)
    return <p>Loading...</p>;

  let liveHolders = dailyHolderCountData.dailyHolderCounts || [];
  liveHolders = sortDates(liveHolders);

  let historicalHolders = allDailyHolderCountData.dailyHolderCounts || [];
  historicalHolders = sortDates(historicalHolders);

  let combinedHoldersData = [...liveHolders];
  combinedHoldersData = sortDates(combinedHoldersData);

  const chartData = {
    labels: combinedHoldersData.map((entry: any) => entry.id.slice(5, 10)),
    datasets: [
      {
        label: "Holders",
        data: combinedHoldersData.map((entry: any) => entry.total),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: "linear",
        position: "left",
        ticks: {
          callback: function (value, index, values) {
            if (value === 1000000) return "1M";
            if (value === 100000) return "100K";
            if (value === 10000) return "10K";
            if (value === 1000) return "1K";
            if (value === 100) return "100";
            return null;
          },
        },
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg shadow-md">
      <h2 className="text-2xl font-pixeboy mb-2 text-black">Daily Holders</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default LiveHoldersChart;
