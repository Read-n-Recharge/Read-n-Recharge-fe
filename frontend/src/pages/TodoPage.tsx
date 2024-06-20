import React, { useEffect, useState } from "react";
import { Todo } from "../type";
import { RetrieveTask, DeleteTask, UpdateTask } from "../services/api";
import TaskForm from "../components/TodoForm";
import PopupComponent from "../components/popup";
import { AnimatePresence } from "framer-motion";
import TaskDetails from "../components/TodoDetail";

const TasksList: React.FC = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visibleTaskId, setVisibleTaskId] = useState<number | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchTask = async () => {
    try {
      const tasks = await RetrieveTask();
      console.log("Tasks retrieved:", tasks);
      setTasks(tasks);
    } catch (error) {
      setError("Error retrieving tasks");
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const handleTitleClick = (taskId: number) => {
    console.log("Task clicked:", taskId);
    setVisibleTaskId((prevTaskId) => (prevTaskId === taskId ? null : taskId));
  };

  const handleClosePopup = () => {
    setError(null);
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await DeleteTask(taskId);
      setSuccess("Task deleted successfully!");
      setTimeout(() => setSuccess(null), 3000);
      fetchTask();
    } catch (error) {
      setError("Error deleting task. Please try again.");
      console.error("Delete task error:", error);
    }
  };
  const handleCheckboxChange = (taskId: number) => {
    handleDeleteTask(taskId);
  };
  const handleUpdate = () => {
    fetchTask();
  };

  return (
    <div>
      <div className="flex items-center justify-center m-2 mt-10 ">
        <div className="border-b w-2/4">
          <h1 className="text-xl font-semibold border-b border-black pb-2">
            Task To-do
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center m-2 mt-2">
        <ul className="w-2/3 flex flex-col items-center">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="border solid rounded-md w-3/4 cursor-pointer border-black p-3 m-2"
            >
              <div className="header pl-5 pt-1">
                <div
                  className="tiltle grid grid-cols-[auto_auto_1fr] items-center gap-2"
                  onClick={() => handleTitleClick(task.id)}
                >
                  <input
                    type="checkbox"
                    checked={task.complete}
                    onChange={() => handleCheckboxChange(task.id)}
                    className="mx-2 cursor-pointer transform scale-150"
                  />
                  <h2
                    className={`cursor-pointer py-1 px-1 ${
                      task.complete ? "line-through" : ""
                    }`}
                  >
                    {task.title}
                  </h2>
                  <span className="justify-self-end">
                    <i
                      className="fa fa-ellipsis-v text-md"
                      onChange={() => handleCheckboxChange(task.id)}
                    ></i>
                  </span>
                </div>
                <div>
                  <AnimatePresence>
                    {visibleTaskId === task.id && (
                      <TaskDetails task={task} onUpdate={handleUpdate} />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </li>
          ))}
          <TaskForm onTaskCreated={fetchTask} />
          {/* {error && <PopupComponent error={error} onClose={handleClosePopup} />} */}
        </ul>
      </div>
    </div>
  );
};

export default TasksList;
