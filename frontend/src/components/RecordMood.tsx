import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "./common/navbar";
import {
  getUserIdFromToken,
  points_record,
  PostMoodRecord,
} from "../services/api";
import MoodHistory from "../components/MoodHistory";
import AnimatedModal from "./common/AnimatedModal";
import { moodImages } from "./utils/moodImages";
import bubbleImg from "../assets/emoji.png";
// import manImg from "../assets/thinkMan.png";

export default function RecordMood() {
  const { date } = useParams();

  const MOOD_CHOICES = [
    { value: "happy", label: "Happy", imageUrl: moodImages.happy },
    { value: "sad", label: "Sad", imageUrl: moodImages.sad },
    {
      value: "angry",
      label: "Angry",
      imageUrl: moodImages.angry,
    },
    {
      value: "anxious",
      label: "Anxious",
      imageUrl: moodImages.anxious,
    },
    {
      value: "playful",
      label: "Playful",
      imageUrl: moodImages.playful,
    },
    {
      value: "contentment",
      label: "Contentment",
      imageUrl: moodImages.contentment,
    },
    {
      value: "disgusted",
      label: "Disgusted",
      imageUrl: moodImages.disgusted,
    },
    {
      value: "love",
      label: "Love",
      imageUrl: moodImages.love,
    },
    {
      value: "shocked",
      label: "Shocked",
      imageUrl: moodImages.shocked,
    },
    {
      value: "neutral",
      label: "Neutral",
      imageUrl: moodImages.neutral,
    },
  ];

  const [mood, setMood] = useState("");
  const [context, setContext] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [newRecordAdded, setNewRecordAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const points = 10;
  const handleMoodClick = (moodValue) => {
    setMood(moodValue);
  };
  useEffect(() => {
    try {
      const id = getUserIdFromToken();
      setUserId(id);
    } catch (error) {
      console.error("Error retrieving user ID:", error.message);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const moodData = {
      user: userId,
      timestamp: date,
      mood,
      context,
    };
    console.log("Mood Data:", moodData);

    try {
      await PostMoodRecord(moodData);
      console.log("Mood recorded successfully");
      points_record(points, "add");
      console.log("Get point", { points });
      setNewRecordAdded(!newRecordAdded);
      setIsModalOpen(true);

      setMood("");
      setContext("");
    } catch (error) {
      console.error("Error recording mood:", error.message);
    }
  };

  return (
    <div className=" bg-custom-gradient h-screen w-screen  overflow-hidden">
      <div className="flex flex-col justify-center items-center">
        <Navbar />
        <img src={bubbleImg} className="absolute h-96 -left-56  bottom-0" />
        {/* <img src={manImg} className="absolute h-3/4 right-5 bottom-0" /> */}
        <div className="text-3xl font-semibold text-white">{date}</div>
        <div className="note-box p-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 p-5 bg-blue-50 bg-opacity-50 rounded-2xl">
              <label className="block text-gray-700 text-lg font-bold mb-2">
                How are you feeling?
              </label>
              <div className="grid grid-cols-5 gap-5">
                {MOOD_CHOICES.map((choice) => (
                  <button
                    type="button"
                    key={choice.value}
                    className={`p-3 px-5 text-l rounded-2xl flex flex-col items-center ${
                      mood === choice.value
                        ? "bg-red-200 text-white "
                        : "bg-gray-200 hover:bg-red-100 hover:text-white"
                    }`}
                    onClick={() => handleMoodClick(choice.value)}
                  >
                    <img
                      src={choice.imageUrl}
                      alt={choice.label}
                      className={`w-28 h-28 rounded-2xl inline-block mr-2 ${
                        mood !== choice.value ? "filter grayscale" : ""
                      }`}
                    />
                    {choice.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 p-5 bg-blue-50 bg-opacity-50 rounded-2xl">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="context"
              >
                Let Me Know Your Mood Context
              </label>
              <input
                type="text"
                id="context"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="shadow appearance-none border rounded-xl w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="e.g., Happy after studying"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline w-48 h-14"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <AnimatedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <MoodHistory
          date={date!}
          newRecordAdded={newRecordAdded}
          points={points}
        />
      </AnimatedModal>
    </div>
  );
}
