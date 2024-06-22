import React, { useState } from "react";
import { motion } from "framer-motion";
import { RetrieveStudyPreference } from "../services/api";
import { suggestStudyMethod } from "./StudyMethod";
import SuggestionForm from "./suggestionForm";

const RealTimeDataForm = ({ onSubmit, onClose, task }) => {
  const [stressLevel, setStressLevel] = useState("");
  const [noiseLevel, setNoiseLevel] = useState("");
  const [motivationLevel, setMotivationLevel] = useState("");
  const [environment, setEnvironment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [showSuggestionForm, setShowSuggestionForm] = useState<boolean>(false);
  const [studyMethod, setStudyMethod] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const realTimeData = {
        stressLevel,
        noiseLevel,
        motivationLevel,
        environment,
      };
      const userPreference = await RetrieveStudyPreference();
      const taskData = { complexity: task.complexity };
      console.log("Real time data :", realTimeData);
      console.log("study Preference data :", userPreference);
      console.log("Task data :", taskData);

      const suggestionMethod = suggestStudyMethod(
        userPreference,
        realTimeData,
        taskData
      );
      setStudyMethod(suggestionMethod);
      setShowSuggestionForm(true);
    } catch (error) {
      setError(
        "Error fetching user preferences or suggesting study method. Please try again."
      );
    }
  };

  const handleConfirmSuggestion = (selectedMethod) => {
    setShowSuggestionForm(false);
    setStudyMethod(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded shadow-lg w-2/6"
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
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Noise Level</label>
          <select
            value={noiseLevel}
            onChange={(e) => setNoiseLevel(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select</option>
            <option value="Low">Quiet</option>
            <option value="Medium">Moderate</option>
            <option value="High">Noisy</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Motivation Level</label>
          <select
            value={motivationLevel}
            onChange={(e) => setMotivationLevel(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block">Study Environment</label>
          <select
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select</option>
            <option value="Group">Group (with friends!)</option>
            <option value="Solo">Solo (peace and quiet)</option>
          </select>
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
