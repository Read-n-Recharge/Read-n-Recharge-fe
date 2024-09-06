import React from "react";
import { motion } from "framer-motion";

const FlashCard: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="bg-green-500 text-white p-3 rounded-xl shadow-lg"
      >
        {message}
      </motion.div>
    </div>
  );
};

export default FlashCard;
