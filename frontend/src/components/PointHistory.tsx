import React from "react";
import { PointHistory as PointHistoryType } from "../type";

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

// Function to calculate percentage
const calculatePercentage = (part: number, total: number) => {
  return (part / total) * 100;
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
  const totalPoints = totalAdded + totalUsed;

  // Calculate percentages for donut chart
  const percentageAdded = calculatePercentage(totalAdded, totalPoints);
  const percentageUsed = calculatePercentage(totalUsed, totalPoints);

  // Group points by date
  const groupedPoints = groupPointsByDate(points);

  return (
    <div className="w-full h-full bg-opacity-35 p-8 rounded-xl">
    <h2 className="font-semibold text-2xl text-gray-700 mb-5 text-center">Point History by Date</h2>
      <div className="h-full flex">
        {/* Left side: Donut chart */}
        <div className="flex justify-center items-center flex-col flex-none w-1/2">
          {/* Donut chart container */}
          <div
            className="relative w-96 h-96 rounded-full"
            style={{
              background: `conic-gradient(#60a5fa ${percentageAdded}%, #2dd4bf ${percentageAdded}% ${percentageAdded + percentageUsed}%)`,
            }}
          >
            {/* Inner circle to create donut effect */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-56 h-56 bg-pink-50 rounded-full flex flex-col justify-center items-center">
                {/* Display point totals inside the donut hole */}
                <p>Total Points</p>
                <p>{totalPoints}</p>
              </div>
            </div>
          </div>
          {/* Legend */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center mr-4">
              <span className="w-4 h-4 mr-2 rounded-full bg-blue-400"></span>
              <span>Points Added: {totalAdded}</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 mr-2 rounded-full bg-teal-400"></span>
              <span>Points Used: {totalUsed}</span>
            </div>
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
