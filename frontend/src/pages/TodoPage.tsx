import React, { useEffect, useState } from "react";
import { Todo } from "../type";
import { RetrieveTask } from "../services/api";
import TaskForm from "../components/TodoForm";
import PopupComponent from "../components/popup";
import { AnimatePresence } from "framer-motion";
import TaskDetails from "../components/TodoItem";

const TasksList: React.FC = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visibleTaskId, setVisibleTaskId] = useState<number | null>(null);

  const fetchTask = async () => {
    try {
      const tasks = await RetrieveTask();
      console.log("Tasks retrieved:", tasks); // Check the structure of the retrieved tasks
      setTasks(tasks);
    } catch (error) {
      setError("Error retrieving tasks");
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const handleTitleClick = (taskId: number) => {
    console.log("Task clicked:", taskId); // Log the clicked task ID
    setVisibleTaskId((prevTaskId) => (prevTaskId === taskId ? null : taskId));
  };

  const handleClosePopup = () => {
    setError(null);
  };

  return (
    <div className="flex flex-col items-center">
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="border solid w-32 m-2">
            <div>
              <h2
                className="cursor-pointer"
                onClick={() => handleTitleClick(index)}
              >
                {task.title}
              </h2>
              <AnimatePresence>
                {visibleTaskId === index && <TaskDetails task={task} />}
              </AnimatePresence>
            </div>
          </li>
        ))}
      </ul>
      <TaskForm onTaskCreated={fetchTask} />
      {error && <PopupComponent error={error} onClose={handleClosePopup} />}
    </div>
  );
};

export default TasksList;
