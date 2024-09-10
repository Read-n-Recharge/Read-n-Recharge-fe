import React, { useState } from "react";
import { motion } from "framer-motion";

const descriptions = {
  "90-minute focus sessions":
    "Dive into a deep work session for 90 minutes like a productivity superhero!",
  "Pomodoro technique":
    "Be a time wizard with 25-minute work sprints and 5-minute breaks—repeat and conquer your to-do list like a champ!",
  "52-17 method":
    "Crush your goals with 52 minutes of focus followed by a 17-minute refresh break. Perfect for work and play!",
  "custom time":
    "Create your ideal productivity potion with your own work and break times. Tailor your schedule to fit your unique rhythm!",
};

const SuggestionForm = ({ suggestedMethod, onConfirm, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState(suggestedMethod);
  const [customTime, setCustomTime] = useState({ minutes: 0 });
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedMethod === "custom time" && customTime.minutes < 1) {
      setError("Custom time must be at least 1 minute.");
      console.log("Custom time must be at least 1 minute.");
      return;
    }
    onConfirm(selectedMethod, customTime);
    console.log(
      "selected Method: ",
      selectedMethod,
      "customTime",
      customTime.minutes,
      "minute"
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-lg w-2/6"
      >
        <h2 className="text-xl text-center mb-4 text-cyan-700 font-semibold">Choose Your Study Method</h2>
        <div className="mb-4">
          <div className="mb-2 flex">
            <label htmlFor="">Suggested Study Method:</label>
            <p>&nbsp;{suggestedMethod}</p>
          </div>
          <div className="relative">
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">Select</option>
              {Object.keys(descriptions).map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
            {selectedMethod && (
              <p className="text-xs text-cyan-700 p-2">
                {descriptions[selectedMethod]}
              </p>
            )}
          </div>
        </div>
        {selectedMethod === "custom time" && (
          <div className="mb-4">
            <label>Custom Time (minutes): </label>
            <input
              type="number"
              value={customTime.minutes}
              onChange={(e) =>
                setCustomTime({
                  minutes: Math.max(1, parseInt(e.target.value)),
                })
              }
              className="border p-2 rounded w-full"
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={handleConfirm}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SuggestionForm;
