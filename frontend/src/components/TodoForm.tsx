import React, { useState } from "react";
import { Todo } from "../type";
import { RetrieveTask, CreateTask } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import PopupComponent from "./popupErr";

interface TaskFormProps {
  onTaskCreated: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [deadlines, setDeadlines] = useState<string>("");
  const [complexity, setComplexity] = useState<string>("normal");

  const handleAddTaskClick = () => {
    setIsAdding(!isAdding);
    clearForm();
  };

  const handleSaveTask = async () => {
    const newTask: Partial<Todo> = {
      title,
      details,
      deadlines: deadlines === "" ? null : deadlines,
      complexity,
      complete: false,
    };
    console.log("New Task:", newTask);
    try {
      await CreateTask(newTask);
      onTaskCreated();
      setIsAdding(false);
      const updatedTasks = await RetrieveTask();
      setTasks(updatedTasks);
    } catch (error) {
      setError("Error creating task");
    }
  };

  const handleCancelTaskClick = () => {
    setIsAdding(isAdding);
    clearForm();
  };

  const clearForm = () => {
    setTitle("");
    setDetails("");
    setDeadlines("");
    setComplexity("");
  };
  const handleClosePopup = () => {
    setError(null);
  };

  return (
    <div className="w-3/4 border border-black p-4 rounded-lg m-2">
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.9 }}
            className="overflow-hidden"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveTask();
              }}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="taskTitle"
                >
                  Task Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="taskTitle"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="taskDetails"
                >
                  Task Details
                </label>
                <textarea
                  className="border rounded w-full text-gray-700"
                  id="taskDetails"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="taskDeadlines"
                >
                  Task Deadlines
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="taskDeadlines"
                  type="date"
                  value={deadlines}
                  onChange={(e) => setDeadlines(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="taskComplexity"
                >
                  Task Complexity
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="taskComplexity"
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Save Task
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={handleCancelTaskClick}
                >
                  Clear Task
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="text-center pt-2">
        <button
          onClick={handleAddTaskClick}
          className={`font-semibold rounded focus:outline-none focus:shadow-outline ${
            isAdding ? "p-2 hover:underline" : ""
          }`}
        >
          {isAdding ? "Cancel Form" : "Add Task"}
        </button>
      </div>

      {error && <PopupComponent error={error} onClose={handleClosePopup} />}
    </div>
  );
};
export default TaskForm;
