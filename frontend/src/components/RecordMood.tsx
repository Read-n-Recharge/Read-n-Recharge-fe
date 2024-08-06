import React, { useState } from "react";
import { useParams } from "react-router-dom";
import happyImg from "../assets/mood/Happy.png";
import AngryImg from "../assets/mood/Angry.png";
import SadImg from "../assets/mood/Sad.png";
import AnxietyImg from "../assets/mood/Anxiety.png";
import contentmentImg from "../assets/mood/contentment.png";
import DisgustedImg from "../assets/mood/Disgusted.png";
import LoveImg from "../assets/mood/Love.png";
import PlayfulImg from "../assets/mood/Playful.png";
import ShockedImg from "../assets/mood/Shocked.png";
import NeutralImag from "../assets/mood/Neutral.png";
import { Navbar } from "./common/navbar";

export default function RecordMood() {
  const { date } = useParams();

  const MOOD_CHOICES = [
    { value: "happy", label: "Happy", imageUrl: happyImg },
    { value: "sad", label: "Sad", imageUrl: SadImg },
    {
      value: "angry",
      label: "Angry",
      imageUrl: AngryImg,
    },
    {
      value: "anxious",
      label: "Anxious",
      imageUrl: AnxietyImg,
    },
    {
      value: "playful",
      label: "Playful",
      imageUrl: PlayfulImg,
    },
    {
      value: "contentment",
      label: "Contentment",
      imageUrl: contentmentImg,
    },
    {
      value: "disgusted",
      label: "Disgusted",
      imageUrl: DisgustedImg,
    },
    {
      value: "love",
      label: "Love",
      imageUrl: LoveImg,
    },
    {
      value: "shocked",
      label: "Shocked",
      imageUrl: ShockedImg,
    },
    {
      value: "Neutral",
      label: "Neutral",
      imageUrl: NeutralImag,
    },
  ];

  const [mood, setMood] = useState("");
  const [context, setContext] = useState("");

  const handleMoodClick = (moodValue) => {
    setMood(moodValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const moodData = {
      user: "",
      timestamp: date,
      mood,
      context,
    };
    console.log("Mood Data:", moodData);

  };

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <Navbar/>
      <div className="text-3xl font-semibold">{date}</div>
      <div className="note-box p-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 p-5 bg-blue-50 rounded-md">
            <label className="block text-gray-700 text-lg font-bold mb-2">
              How are you feeling?
            </label>
            <div className="grid grid-cols-5 gap-5">
              {MOOD_CHOICES.map((choice) => (
                <button
                  type="button"
                  key={choice.value}
                  className={`p-3 px-5 text-l rounded flex flex-col items-center ${
                    mood === choice.value
                      ? "bg-red-200 text-white "
                      : "bg-gray-200 hover:bg-red-100 hover:text-white"
                  }`}
                  onClick={() => handleMoodClick(choice.value)}
                >
                  <img
                    src={choice.imageUrl}
                    alt={choice.label}
                    className={`w-28 h-28 inline-block mr-2 ${
                      mood !== choice.value ? "filter grayscale" : ""
                    }`}
                  />
                  {choice.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 p-5 bg-blue-50 rounded-md">
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
              className="shadow appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
  );
}
