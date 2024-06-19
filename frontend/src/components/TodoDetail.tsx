import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Todo } from "../type";
import { UpdateTask } from "../services/api";
import PopupComponent from "./popup";

interface TaskDetailProps {
  task: Todo;
  onUpdate: () => void;
}

const TaskDetails: React.FC<TaskDetailProps> = ({ task, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [details, setDetails] = useState(task.details);
  const [deadlines, setDeadlines] = useState(task.deadlines);
  const [complexity, setComplexity] = useState(task.complexity);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const hanleEditingTask = () => {
    setIsEditing(true);
  };
  const handleUpdateTask = async () => {
    const updatedTasks: Partial<Todo> = {
      title,
      details,
      deadlines,
      complexity,
    };
    try {
      const updatedTaskData = await UpdateTask(task.id, updatedTasks);
      onUpdate();
      setIsEditing(false);
      setSuccess("Task updated successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError("Error updating task. Please try again.");
      console.error("Update task error:", error);
    }
  };

  const handleClosePopup = () => {
    setError(null);
  };

  const animationProps = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.div id="TaskDetail" {...animationProps} className="overflow-hidden">
      <AnimatePresence>
        {isEditing ? (
          <motion.div
            key="edit-form"
            {...animationProps}
            className="flex flex-col gap-2"
          >
            <div className="mt-2 border-t border-gray-300">
              <div className="mt-5">
                <label className="block text-gray-700 text-sm font-medium">
                  Task Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="shadow border rounded w-3/4 py-1 px-3 text-gray-700"
                />
              </div>
              <div className="mt-1">
                <label className="block text-gray-700 text-sm font-medium">
                  Task Description
                </label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="shadow border rounded w-3/4 py-1 px-3 text-gray-700"
                ></textarea>
              </div>
              <div className="mt-1">
                <label className="block text-gray-700 text-sm font-medium">
                  Due Date
                </label>
                <input
                  type="date"
                  value={deadlines}
                  onChange={(e) => setDeadlines(e.target.value)}
                  className="shadow border rounded w-3/4 py-1 px-3 text-gray-700"
                />
              </div>
              <div className="mt-2">
                <label className="block text-gray-700 text-sm font-medium">
                  Complexity level
                </label>
                <select
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value)}
                  className="shadow border rounded w-3/4 py-2 px-3 text-gray-700"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-2 pt-5">
                <button
                  onClick={handleUpdateTask}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="task-details"
            {...animationProps}
            className="flex flex-col border-t border-black w-3/4 py-1"
          >
            {task.details && (
              <div className="mt-2">
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="taskDetails"
                >
                  Task Details
                </label>
                <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
                  {task.details}
                </p>
              </div>
            )}
            {task.deadlines && (
              <div className="">
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="taskDetails"
                >
                  Due Date
                </label>
                <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
                  {task.deadlines}
                </p>
              </div>
            )}
            {task.complexity && (
              <div className="">
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="taskDetails"
                >
                  Complexity level
                </label>
                <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
                  {task.complexity}
                </p>
              </div>
            )}
            {error && (
              <PopupComponent error={error} onClose={handleClosePopup} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {!isEditing && (
        <div className="flex justify-end m-2">
          <button
            onClick={hanleEditingTask}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Edit
          </button>
        </div>
      )}
      {success && <div className="mt-2 text-green-600">{success}</div>}
    </motion.div>
  );
};

export default TaskDetails;
