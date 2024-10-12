import React from "react";
import { Doughnut } from "react-chartjs-2";
import { PointHistory as PointHistoryType } from "../type";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Helper function to calculate total added and used points
const calculateTotalPoints = (points: PointHistoryType[]) => {
  let totalAdded = 0;
  let totalUsed = 0;

  points.forEach((point) => {
    if (point.action === "add") {
      totalAdded += point.points;
    } else {
      totalUsed += point.points;
    }
  });

  return { totalAdded, totalUsed };
};

// Helper function to group points by date
const groupPointsByDate = (points: PointHistoryType[]) => {
  return points.reduce((grouped: Record<string, PointHistoryType[]>, point) => {
    const date = new Date(point.timestamp).toLocaleDateString(); // Format the timestamp into a date string
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(point);
    return grouped;
  }, {});
};

const PointHistory = ({ points }: { points: PointHistoryType[] | undefined }) => {
  if (!points || points.length === 0) {
    return <p>No point history available.</p>;
  }

  // Calculate total added and used points
  const { totalAdded, totalUsed } = calculateTotalPoints(points);
  const totalPoints = totalAdded - totalUsed;

  // Prepare data for the donut chart
  const donutChartData = {
    labels: ["Points Added", "Points Used"],
    datasets: [
      {
        data: [totalAdded, totalUsed],
        backgroundColor: ["#60a5fa", "#2dd4bf"],
        hoverBackgroundColor: ["#3b82f6", "#14b8a6"],
      },
    ],
  };

  // Chart options with a fixed legend position
  const donutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",  // Fix the position value to one of the valid options
      },
    },
  };

  // Group points by date
  const groupedPoints = groupPointsByDate(points);

  return (
    <div className="w-full h-full bg-opacity-35 pb-8 rounded-xl">
      <h2 className="font-semibold text-2xl text-gray-700 mb-5 text-center">Point History by Date</h2>
      <div className="h-full flex">
        {/* Left side: Donut chart */}
        <div className="flex justify-center items-center">
          {/* Donut chart */}
          <div className="relative w-96 h-96">
            <Doughnut data={donutChartData} options={donutChartOptions} />
          </div>
        </div>

        {/* Right side: Point history */}
        <div className="flex-grow p-6 overflow-y-auto">
          <div className="h-full">
            {Object.keys(groupedPoints).map((date) => (
              <div key={date} className="mb-6">
                <h3 className="text-lg font-bold text-gray-600 mb-3">{date}</h3>
                <ul className="text-gray-600 grid grid-cols-2 gap-4">
                  {groupedPoints[date].map((point, index) => (
                    <li key={index} className="bg-white p-4 rounded-lg">
                      {point.action === "add" ? (
                        <span>Added {point.points} points</span>
                      ) : (
                        <span>Used {point.points} points</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointHistory;
