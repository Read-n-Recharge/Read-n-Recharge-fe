import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RetrieveStudyPreference } from "../../services/api";
import { suggestStudyMethod } from "../utils/StudyMethod";
import SuggestionForm from "../forms/suggestionForm";
import { useNavigate } from "react-router-dom";

const RealTimeDataForm = ({ onClose, task }) => {
  useEffect(() => {
    console.log("Task passed to RealTimeDataForm:", task); // This will log the task object
  }, [task]);
  const [stressLevel, setStressLevel] = useState("");
  const [noiseLevel, setNoiseLevel] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [showSuggestionForm, setShowSuggestionForm] = useState<boolean>(false);
  const [studyMethod, setStudyMethod] = useState<string | null>(null);

  const [stressLevelErr, setStressLevelErr] = useState<string | null>(null);
  const [noiseLevelErr, setNoiseLevelErr] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    let hasError = false;

    if (!noiseLevel) {
      setNoiseLevelErr(
        "Please rate the noise level in your current environment"
      );
      hasError = true;
    } else {
      setNoiseLevelErr(null);
    }
    if (!stressLevel) {
      setStressLevelErr("Please rate your current stress level");
      hasError = true;
    } else {
      setStressLevelErr(null);
    }

    if (hasError) {
      return console.log("please rate your real-time data");
    }

    try {
      const realTimeData = { stressLevel, noiseLevel };
      const userPreference = await RetrieveStudyPreference();
      const taskData = { complexity: task.complexity };

      const suggestionMethod = suggestStudyMethod(
        userPreference,
        realTimeData,
        taskData
      );

      console.log(realTimeData);

      if (suggestionMethod) {
        setStudyMethod(suggestionMethod);
        setShowSuggestionForm(true);
      } else {
        setError("No study method could be suggested. Please try again.");
      }
    } catch (error) {
      setError("Error fetching user preferences. Please try again.");
    }
  };

  const handleConfirmSuggestion = (selectedMethod, customTime) => {
    console.log('Task ID in RealTimeDataForm:', task); 
    setShowSuggestionForm(false);
    navigate("/clock", {
      state: {
        method: selectedMethod,
        customTime,
        task: task, 
        stressLevel: stressLevel,
        noiseLevel:noiseLevel,
      }
      
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-2/6"
      >
        <h2 className="text-xl text-center mb-2">Tell me your current mood!</h2>
        <p className="text-xs text-center mb-4">
          I'll find the perfect study style that suits you best!
        </p>
        <div className="mb-2">
          <label className="block">Stress Level</label>
          <select
            value={stressLevel}
            onChange={(e) => setStressLevel(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select</option>
            <option value="low">Low</option>
            <option value="normal">Medium</option>
            <option value="high">High</option>
          </select>
          {stressLevelErr && (
            <p className="text-red-500 text-xs">{stressLevelErr}</p>
          )}
        </div>
        <div className="mb-2">
          <label className="block">Noise Level</label>
          <select
            value={noiseLevel}
            onChange={(e) => setNoiseLevel(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select</option>
            <option value="quiet">Quiet</option>
            <option value="moderate">Moderate</option>
            <option value="noisy">Noisy</option>
          </select>
          {noiseLevelErr && (
            <p className="text-red-500 text-xs">{noiseLevelErr}</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
        {showSuggestionForm && studyMethod && (
          <SuggestionForm
            suggestedMethod={studyMethod}
            onConfirm={handleConfirmSuggestion}
            onClose={() => setShowSuggestionForm(false)}
          />
        )}
      </motion.div>
    </div>
  );
};

export default RealTimeDataForm;
