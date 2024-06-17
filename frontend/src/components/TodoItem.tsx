import React, { useState } from "react";
import { Todo } from "../type";
import "../styles/Todo.css"

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, updatedTask: string, updatedDetails: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDetailDiseble, setIsDetailDiseble] = useState<boolean>(false);
  const [updatedTask, setUpdatedTask] = useState<string>(todo.task);
  const [updatedDetails, setUpdatedDetails] = useState<string>(todo.details);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    updateTodo(todo.id, updatedTask, updatedDetails);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedTask(todo.task);
    setUpdatedDetails(todo.details);
  }

  const handleToggleDetails = () => {
    setIsDetailDiseble(!isDetailDiseble);
  }

  return (
    <div className="todo-item" onClick={handleToggleDetails}>
      <li>
      {isEditing ? (
        <>
          <input className="todo-input" type="text" value={updatedTask} onChange={(e) => setUpdatedTask(e.target.value)} />
          <input className="todo-input" type="text" value={updatedDetails} onChange={(e) => setUpdatedDetails(e.target.value)} />
          <button className="todo-save-button" onClick={handleUpdate}>Save</button>
          <button className="todo-cancel-button" onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>

        <input className="todo-checkbox" type="checkbox" checked={todo.isCompleted} onChange={() => toggleTodo(todo.id)} />
          <span className="todo-text" style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}>
            {todo.task}
          </span>
          {isDetailDiseble && (
            <div className="todo-details">
              <p>{todo.details}</p>
              <button className="todo-edit-button" onClick={handleEdit}>Edit</button>
            </div>
          )}
          <button className="todo-delete-button" onClick={() => deleteTodo(todo.id)}>Remove</button>
        </>
      )}
    </li>
    </div>
  );
};

export default TodoItem;
