import React, { useEffect, useState } from "react";
import { getPointsHistory, RetrieveMoodRecords } from "../services/api";
import { MoodRecord, PointHistory as PointHistoryType } from "../type";
import {Navbar} from "../components/common/navbar";
import MoodSummary from "../components/MoodSummary";
import StudyActivity from "../components/StudyActivity";
import PointHistory from "../components/PointHistory";
import CarbonUsage from "../components/CarbonUsage";
import moodImg from "../assets/mood/Love.png"
import studyImg from "../assets/studying.png"
import pointImg from "../assets/star.png"
import coImg from "../assets/carbon.png"

export function DashboardPage() {
  const [moodRecords, setMoodRecords] = useState<MoodRecord[]>([]);
  const [points, setPoints] = useState<PointHistoryType[] | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<"mood" | "study" | "points" | "carbon">(
    "mood"
  );

  useEffect(() => {
    const fetchMoodRecords = async () => {
      try {
        const allRecords = await RetrieveMoodRecords();
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
        setPoints(PointsHistory);
      } catch (error) {
        console.error("Error fetching points history:", error.message);
      }
    };
    fetchPoints();
  }, []);

  const renderContent = () => {
    switch (selectedCategory) {
      case "mood":
        return <MoodSummary moodRecords={moodRecords} />;
      case "study":
        return <StudyActivity />;
      case "points":
        return <PointHistory points={points} />;
      case "carbon":
        return <CarbonUsage />;
      default:
        return null;
    }
  };
  const categoryImages: Record<string, string> = {
    mood: moodImg,
    study: studyImg,
    points: pointImg,
    carbon: coImg,
  };
  

  return (
    <div className="h-screen w-screen bg-custom-gradient">
  <Navbar />
  <div className="flex items-center justify-center mt-16 px-14 gap-10 h-[600px]">
    {/* Category Box */}
    <div className="flex flex-col gap-5 h-full justify-around">
      {["mood", "study", "points", "carbon"].map((category) => (
        <button
          key={category}
          className={`text-gray-700 text-sm ${
            selectedCategory === category ? "text-white" : ""
          }`}
          onClick={() => setSelectedCategory(category as any)}
        >
          <img
            src={categoryImages[category]}
            alt={`${category} icon`}
            className={`w-24 h-24 rounded-xl object-cover p-2 ${
              selectedCategory === category ? "bg-white" : ""
            }`}
          />
          <div className="text-center mt-2">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
        </button>
      ))}
    </div>

    <div className="w-full h-full bg-white bg-opacity-30 p-8 rounded-xl">
      <div className="h-full">{renderContent()}</div>
    </div>
  </div>
</div>

  );
}

export default DashboardPage;
