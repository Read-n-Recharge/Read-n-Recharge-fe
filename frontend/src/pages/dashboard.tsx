import React, { useEffect, useState } from "react";
import { getPointsHistory, RetrieveMoodRecords } from "../services/api";
import { MoodCategory, MoodRecord, PointHistory } from "../type";
import { Navbar } from "../components/common/navbar";

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

const calculateMoodFrequencyByCategory = (
  records: MoodRecord[]
): MoodCategory[] => {
  const categoryCount: Record<string, { count: number; color: string }> = {};

  // Iterate through records and aggregate them by their broader category
  records.forEach((record) => {
    const mood = record.mood;
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

export function DashboardPage() {
  const [moodRecords, setMoodRecords] = useState<MoodRecord[]>([]);
  const [points, setPoints] = useState<PointHistory[] | undefined>();

  useEffect(() => {
    const fetchMoodRecords = async () => {
      try {
        const allRecords = await RetrieveMoodRecords();
        console.log("Mood Records:", allRecords);
        setMoodRecords(allRecords);
      } catch (error) {
        console.error("Error fetching mood records:", error.message);
      }
    };

    fetchMoodRecords();
  }, []);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const PointsHistory = await getPointsHistory();
        console.log("Points History:", PointsHistory);
        setPoints(PointsHistory);
      } catch (error) {
        console.error("Error fetching mood records:", error.message);
      }
    };

    fetchPoints();
  }, []);

  const moodData = calculateMoodFrequencyByCategory(moodRecords);
  console.log("Mood Data:", moodData);

  return (
    <div className="h-screen w-screen bg-custom-gradient">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="flex w-3/4 justify-between">
          <div className="w-1/2 bg-white bg-opacity-80 p-6 rounded-3xl shadow-lg m-5">
            <h1 className="font-semibold text-2xl text-gray-700 mb-4 text-center">
              Mood Record
            </h1>
            <div className="flex flex-wrap justify-start">
              {moodData.map((entry, index) => (
                <div key={index} className="m-2">
                  <div
                    className="flex items-center justify-center rounded-full text-white relative text-center p-2 shadow-lg"
                    style={{
                      width: `${entry.percentage * 5}px`,
                      height: `${entry.percentage * 5}px`,
                      fontSize: `${entry.percentage / 1.5}px`,
                      backgroundColor: entry.color,
                    }}
                  >
                    <div>{entry.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-200 p-4 rounded-lg mt-6">
              <ul className="">
                {moodData.map((entry, index) => (
                  <li
                    key={index}
                    className="grid grid-cols-2 items-center pb-2"
                  >
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span
                        className="text-gray-700"
                        style={{ color: entry.color }}
                      >
                        {entry.category}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {entry.count} time{entry.count > 1 ? "s" : ""}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-1/2 bg-white bg-opacity-80 p-6 rounded-3xl shadow-lg m-5">
            <h1 className="font-semibold text-2xl text-gray-700 mb-4 text-center">
              Point History
            </h1>

            {points && points.length > 0 ? (
              <ul className="text-gray-600">
                {points.map((point, index) => (
                  <li key={index} className="bg-gray-200 p-4 rounded-lg mb-3">
                    {point.action === "add" ? (
                      <span>Added {point.points} points</span>
                    ) : (
                      <span>Used {point.points} points</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>User doesn't have any point history</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
