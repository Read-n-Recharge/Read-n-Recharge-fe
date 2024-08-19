import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

const closeButtonVariants = {
  hover: { scale: 1.2, rotate: 90, transition: { duration: 0.2 } },
  tap: { scale: 0.9, rotate: -90, transition: { duration: 0.2 } },
};

const AnimatedModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate("/mood");
  };

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
          onClick={handleClose} 
        ></div>
        <motion.div
          className="relative bg-white bg-opacity-90 p-5 rounded-lg z-10 max-w-3xl mx-auto"
          variants={modalVariants}
        >
          <motion.button
            className="absolute top-2 right-4 text-3xl text-gray-600"
            onClick={handleClose} 
            variants={closeButtonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            &times;
          </motion.button>
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedModal;
