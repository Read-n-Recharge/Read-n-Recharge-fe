import React, { useEffect, useState } from "react";
import { getStudyActivity } from "../services/api";

const calculateStudyMethodFrequency = (
  records: any[]
): {
  studyMethod: string;
  count: number;
  percentage: number;
  color: string;
}[] => {
  const methodCount: Record<string, { count: number; color: string }> = {};

  records.forEach(({ studyMethod }) => {
    const mappedMethod = studyMethodMapping[studyMethod];
    if (mappedMethod) {
      const { color } = mappedMethod;
      if (methodCount[studyMethod]) {
        methodCount[studyMethod].count += 1;
      } else {
        methodCount[studyMethod] = { count: 1, color };
      }
    }
  });

  const totalMethods = records.length;
  return Object.entries(methodCount).map(([studyMethod, { count, color }]) => ({
    studyMethod,
    count,
    percentage: Math.round((count / totalMethods) * 100),
    color,
  }));
};

const studyMethodMapping: Record<string, { color: string }> = {
  "52-17 method": { color: "#6495ED" },
  "90-minute focus sessions": { color: "#CCCCFF" },
  "Pomodoro technique": { color: "#FF7F50" },
  "custom time": { color: "#40E0D0" },
};

// Function to convert time of day (morning or night)
const convertTimeOfDay = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours();
  return hours < 12 ? "Morning" : "Night";
};

const StudyMethodBubbleChart = () => {
  const [studyRecords, setStudyRecords] = useState<any[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<any[]>([]);

  const [selectedNoise, setselectedNoise] = useState<string>("all");
  const [selectedStressLevel, setSelectedStressLevel] = useState<string>("all");
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<string>("all");

  useEffect(() => {
    const fetchStudyData = async () => {
      try {
        const response = await getStudyActivity();
        const studyData = response.data;
        console.log(studyData);
        setStudyRecords(studyData);
        setFilteredRecords(studyData);
      } catch (error) {
        console.error("Error fetching study data:", error);
      }
    };

    fetchStudyData();
  }, []);

  const filterRecords = () => {
    const filtered = studyRecords.filter((record) => {
      const matchnoise =
        selectedNoise === "all" || record.noise_level === selectedNoise;
      const matchStress =
        selectedStressLevel === "all" ||
        record.stress_level === selectedStressLevel;
      const matchTime =
        selectedTimeOfDay === "all" ||
        convertTimeOfDay(record.session_date) === selectedTimeOfDay;
      return matchnoise && matchStress && matchTime;
    });
    setFilteredRecords(filtered);
  };

  // Update filters and reapply filtering
  useEffect(() => {
    filterRecords();
  }, [selectedNoise, selectedStressLevel, selectedTimeOfDay]);

  const studyMethodData = calculateStudyMethodFrequency(filteredRecords);

  return (
    <div className="h-full w-full flex flex-col items-center p-3">
      <h1 className="font-semibold text-2xl text-gray-700 mb-4 text-center">
        Study Method Summary
      </h1>

      {/* Filter Options */}
      <div className="flex justify-center space-x-4 mb-4">
        <div>
          <label>Noise level :</label>
          <select
            value={selectedNoise}
            onChange={(e) => setselectedNoise(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg ml-2"
          >
            <option value="all">All</option>
            <option value="quiet">Quiet</option>
            <option value="moderate">Moderate</option>
            <option value="noisy">Noisy</option>
          </select>
        </div>

        <div>
          <label>Stress Level:</label>
          <select
            value={selectedStressLevel}
            onChange={(e) => setSelectedStressLevel(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg ml-2"
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label>Time of Day:</label>
          <select
            value={selectedTimeOfDay}
            onChange={(e) => setSelectedTimeOfDay(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg ml-2"
          >
            <option value="all">All</option>
            <option value="Morning">Morning</option>
            <option value="Night">Night</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between w-full max-w-6xl h-full">
        {/* Bubble Chart */}
        <div className="flex flex-col justify-center items-center w-1/2 p-6">
          <div className="flex flex-wrap gap-4">
            {studyMethodData.map(
              ({ percentage, color, studyMethod }, index) => (
                <div key={index} className="m-1">
                  <div
                    className="flex items-center justify-center rounded-full text-white relative text-center shadow-lg border-white border-2"
                    style={{
                      width: `${percentage * 4}px`,
                      height: `${percentage * 4}px`,
                      backgroundColor: color,
                    }}
                  ></div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="flex-1 p-6 ml-8">
          <ul className="bg-white p-5 rounded-lg shadow-lg mt-10">
            {studyMethodData
              .sort((a, b) => b.count - a.count) // Sort by count in descending order
              .map(({ studyMethod, count, color }, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between pb-5"
                >
                  <div className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-gray-700 text-lg">{studyMethod}</span>
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

export default StudyMethodBubbleChart;
