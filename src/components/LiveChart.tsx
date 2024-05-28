// components/LiveChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import { useQuery, useSubscription } from "@apollo/client";
import {
  Chart as ChartJS,
  CategoryScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  DAILY_EXCHANGE_INS,
  DAILY_EXCHANGE_OUTS,
  ALL_DAILY_EXCHANGE_INS,
  ALL_DAILY_EXCHANGE_OUTS,
} from "@/app/lib/subs";

// Register the components with ChartJS
ChartJS.register(
  CategoryScale,
  LogarithmicScale,
  PointElement,
  LineElement,
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

const LiveChart: React.FC = () => {
  const { data: dailyExchangeInsData } = useSubscription(DAILY_EXCHANGE_INS);
  const { data: dailyExchangeOutsData } = useSubscription(DAILY_EXCHANGE_OUTS);
  const { data: allDailyExchangeInsData } = useQuery(ALL_DAILY_EXCHANGE_INS);
  const { data: allDailyExchangeOutsData } = useQuery(ALL_DAILY_EXCHANGE_OUTS);

  const liveExchangeInData = dailyExchangeInsData?.dailyExchangeIns || [];
  const liveExchangeOutData = dailyExchangeOutsData?.dailyExchangeOuts || [];
  const historicalExchangeInData =
    allDailyExchangeInsData?.dailyExchangeIns || [];
  const historicalExchangeOutData =
    allDailyExchangeOutsData?.dailyExchangeOuts || [];

  let combinedExchangeInData = [
    ...historicalExchangeInData,
    ...liveExchangeInData,
  ];
  let combinedExchangeOutData = [
    ...historicalExchangeOutData,
    ...liveExchangeOutData,
  ];

  combinedExchangeInData = sortDates(combinedExchangeInData);
  combinedExchangeOutData = sortDates(combinedExchangeOutData);

  const chartData = {
    labels: combinedExchangeInData.map((entry: any) => entry.date.slice(5, 10)),
    datasets: [
      {
        label: "Daily Exchange In",
        data: combinedExchangeInData.map((entry: any) => entry.totalAmount),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Daily Exchange Out",
        data: combinedExchangeOutData.map((entry: any) => entry.totalAmount),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: "logarithmic",
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
      <h2 className="text-2xl font-pixeboy mb-2 text-black">
        Live Daily Transfers
      </h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LiveChart;
