import React, { useState } from "react";
import { motion } from "framer-motion";

const SuggestionForm = ({ suggestedMethod, onConfirm, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState(suggestedMethod);
  const [customTime, setCustomTime] = useState({ minutes: 0 });
  const [error, setError] = useState<string | null>();

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
        className="bg-white p-6 rounded shadow-lg w-2/6"
      >
        <h2 className="text-xl text-center mb-4">Choose Your Study Method</h2>
        <div className="mb-4">
          <div className="mb-2 flex ">
            <label htmlFor=""> Suggested Study Method : </label>
            <p>&nbsp;{suggestedMethod}</p>
          </div>
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="90-minute focus sessions">
              90-minute focus sessions
            </option>
            <option value="Pomodoro technique">Pomodoro technique</option>
            <option value="52-17 method">52-17 method</option>
            <option value="custom time">Custom time</option>
          </select>
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
