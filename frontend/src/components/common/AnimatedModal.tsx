import React from "react";
import { motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    y: "-100vh",
  },
  visible: {
    opacity: 1,
    y: "0",
    transition: { delay: 0.5 },
  },
};

const AnimatedModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <motion.div
          className="bg-white p-5 rounded-lg z-10 max-w-3xl mx-auto"
          variants={modalVariants}
        >
          <button className="absolute top-2 right-4 text-3xl" onClick={onClose}>
            &times;
          </button>
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedModal;
