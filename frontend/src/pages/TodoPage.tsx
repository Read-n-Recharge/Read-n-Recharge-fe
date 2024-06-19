import React, { useEffect, useState } from "react";
import { Todo } from "../type";
import { RetrieveTask } from "../services/api";
import TaskForm from "../components/TodoForm";
import PopupComponent from "../components/popup";
import { AnimatePresence } from "framer-motion";
import TaskDetails from "../components/TodoDetail";

const TasksList: React.FC = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visibleTaskId, setVisibleTaskId] = useState<number | null>(null);

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
              <div>
                <h2
                  className="cursor-pointer py-1"
                  onClick={() => handleTitleClick(task.id)}
                >
                  {task.title}
                </h2>
                <AnimatePresence>
                  {visibleTaskId === task.id && (
                    <TaskDetails task={task} onUpdate={handleUpdate} />
                  )}
                </AnimatePresence>
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
