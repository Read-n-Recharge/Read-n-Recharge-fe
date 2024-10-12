import React, { useEffect, useState } from "react";
import { MoodRecord, MoodCategory } from "../type";

// Helper Functions
const calculateMoodFrequencyByCategory = (
  records: MoodRecord[]
): MoodCategory[] => {
  const categoryCount: Record<string, { count: number; color: string }> = {};

  records.forEach(({ mood }) => {
    const mappedMood = moodCategoryMapping[mood];
    if (mappedMood) {
      const { category, color } = mappedMood;
      if (categoryCount[category]) {
        categoryCount[category].count += 1;
      } else {
        categoryCount[category] = { count: 1, color };
      }
    }
  });

  const totalMoods = records.length;
  return Object.entries(categoryCount).map(([category, { count, color }]) => ({
    category,
    count,
    percentage: Math.round((count / totalMoods) * 100),
    color,
  }));
};

const moodCategoryMapping: Record<string, { category: string; color: string }> =
  {
    happy: { category: "Joy", color: "#f1c40f" },
    playful: { category: "Joy", color: "#f1c40f" },
    contentment: { category: "Joy", color: "#f1c40f" },
    sad: { category: "Sadness", color: "#3498db" },
    disgusted: { category: "Disgust", color: "#228b22" },
    angry: { category: "Anger", color: "#e74c3c" },
    anxious: { category: "Fear", color: "#9b59b6" },
    shocked: { category: "Fear", color: "#9b59b6" },
    love: { category: "Joy", color: "#f1c40f" },
    neutral: { category: "Disgust", color: "#228b22" },
  };

// Updated parseTimestamp function to handle custom date formats
const parseTimestamp = (timestamp: string): Date => {
  // Remove ordinal suffixes (like "3rd", "1st") and commas
  const cleanTimestamp = timestamp
    .replace(/(st|nd|rd|th)/, "")
    .replace(",", "");

  // Split the date parts and construct a JavaScript-parsable date string
  const dateParts = cleanTimestamp.split(" ");
  const day = dateParts[1];
  const month = dateParts[2];
  const year = dateParts[3];

  const formattedDate = `${month} ${day} ${year}`;
  return new Date(formattedDate);
};

const filterRecordsByDateRange = (
  records: MoodRecord[],
  startDate: Date,
  endDate: Date
) => {
  // Remove the time components from the startDate and endDate by setting them to midnight
  const startDateOnly = new Date(startDate.setHours(0, 0, 0, 0));
  const endDateOnly = new Date(endDate.setHours(23, 59, 59, 999));

  return records.filter((record) => {
    const recordDate = parseTimestamp(record.timestamp);

    // Remove the time component from recordDate
    const recordDateOnly = new Date(recordDate.setHours(0, 0, 0, 0));

    // Ensure that records on the startDate or endDate are included
    return recordDateOnly >= startDateOnly && recordDateOnly <= endDateOnly;
  });
};

const getFilteredMoodRecords = (
  moodRecords: MoodRecord[],
  filter: string,
  customStartDate?: string,
  customEndDate?: string
) => {
  const now = new Date();
  switch (filter) {
    case "week":
      return filterRecordsByDateRange(
        moodRecords,
        new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        now
      );
    case "month":
      return filterRecordsByDateRange(
        moodRecords,
        new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        now
      );
    case "custom":
      if (customStartDate && customEndDate) {
        return filterRecordsByDateRange(
          moodRecords,
          new Date(customStartDate),
          new Date(customEndDate)
        );
      }
      return moodRecords;
    case "all":
    default:
      return moodRecords;
  }
};

const MoodSummary = ({ moodRecords }: { moodRecords: MoodRecord[] }) => {
  const [filter, setFilter] = useState<string>("all");
  const [customStartDate, setCustomStartDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");

  const filteredMoodRecords = getFilteredMoodRecords(
    moodRecords,
    filter,
    customStartDate,
    customEndDate
  );
  const moodData = calculateMoodFrequencyByCategory(filteredMoodRecords);

  const sortedMoodData = [...moodData].sort((a, b) => b.count - a.count);

  useEffect(() => {
    console.log("Filtered Mood Records:", filteredMoodRecords);
  }, [filteredMoodRecords]);

  return (
    <div className="h-full w-full flex flex-col items-center p-3">
      <h1 className="font-semibold text-2xl text-gray-700 mb-4 text-center">
        Mood Summary
      </h1>

      <div className="flex justify-center space-x-4 mb-4 items-center">
        <button
          onClick={() => setFilter("week")}
          className={`p-2 ${
            filter === "week" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-lg`}
        >
          Last Week
        </button>
        <button
          onClick={() => setFilter("month")}
          className={`p-2 ${
            filter === "month" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-lg`}
        >
          Last Month
        </button>
        <button
          onClick={() => setFilter("all")}
          className={`p-2 ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-lg`}
        >
          All Data
        </button>
        <button
          onClick={() => setFilter("custom")}
          className={`p-2 ${
            filter === "custom" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-lg`}
        >
          Custom Date
        </button>

        {filter === "custom" && (
          <>
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </>
        )}
      </div>

      <div className="flex justify-between w-full max-w-6xl h-full">
        <div className="flex flex-col justify-center items-center w-1/2 p-6">
          <div className="flex flex-wrap gap-4">
            {moodData.map(({ percentage, color }, index) => (
              <div key={index} className="m-1">
                <div
                  className="flex items-center justify-center rounded-full text-white relative text-center shadow-lg border-white border-2"
                  style={{
                    width: `${percentage * 4}px`,
                    height: `${percentage * 4}px`,
                    fontSize: `${percentage / 3}px`,
                    backgroundColor: color,
                  }}
                >
                  <div>{percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 p-6 ml-8">
          <ul className="bg-white p-5 rounded-lg shadow-lg mt-10">
            {sortedMoodData.map(({ category, count, color }, index) => (
              <li
                key={index}
                className="flex items-center justify-between pb-5"
              >
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="text-gray-700 text-lg">{category}</span>
                </div>
                <p className="text-gray-600">
                  {count} time{count > 1 ? "s" : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MoodSummary;
