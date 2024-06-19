import React from "react";
import { motion } from "framer-motion";

interface TaskDetailProps {
  task: {
    title: string;
    details: string;
    deadlines: string;
    complexity: string;
  };
}

const TaskDetails: React.FC<TaskDetailProps> = ({ task }) => {
  return (
    <motion.div
      id="TaskDetail"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden"
    >
      <p>{task.details}</p>
      <p>{task.deadlines}</p>
      <p>{task.complexity}</p>
    </motion.div>
  );
};

export default TaskDetails;
