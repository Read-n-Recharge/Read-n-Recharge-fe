import React from "react";
import { motion } from "framer-motion";
import "../../styles/App.css";

interface PopupComponentProps {
  error: any;
  onClose: () => void;
}

const PopupComponent: React.FC<PopupComponentProps> = ({ error, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/2">
        <div className="flex flex-col items-center justify-center gap-5 py-2">
          <i className="gg-danger text-red-600"></i>
          <p className="text-red-600 font-semibold">ERROR</p>
        </div>
        {error && typeof error === "object" && Object.keys(error).length > 0 ? (
          Object.keys(error).map((key) => (
            <div key={key}>
              {Array.isArray(error[key]) ? (
                error[key].map((message: string, index: number) => (
                  <div key={index} className="text-black mb-2">
                    - {message}
                  </div>
                ))
              ) : (
                <div className="text-black mb-2">- {error[key]}</div>
              )}
            </div>
          ))
        ) : (
          <div className="text-black mb-2">- {error}</div>
        )}
        <div className="flex justify-center mt-1">
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-3xl items-center"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PopupComponent;
