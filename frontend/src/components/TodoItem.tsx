import React, { useState } from "react";
import { Todo } from "../type";
import "../styles/Todo.css"

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, updatedTask: string, updatedDetails: string, updateDueDate: Date) => void;
  isExpanded: boolean;
  handleToggleExpand: (id:number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo, updateTodo, isExpanded, handleToggleExpand }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDetailDiseble, setIsDetailDiseble] = useState<boolean>(false);
  const [updatedTask, setUpdatedTask] = useState<string>(todo.task);
  const [updatedDetails, setUpdatedDetails] = useState<string>(todo.details);
  const [updateDueDate, setUpdateDueDate] = useState<Date>(todo.dueDate);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    updateTodo(todo.id, updatedTask, updatedDetails, updateDueDate);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedTask(todo.task);
    setUpdatedDetails(todo.details);
    setUpdateDueDate(todo.dueDate);
  }

  const handleToggleDetails = () => {
    setIsDetailDiseble(!isDetailDiseble);
  }

  return (
    <div className="todo-item" onClick={handleToggleDetails}>
      <li onClick={() => handleToggleExpand(todo.id)}>
      {isEditing ? (
        <>
          <input className="todo-input" type="text" value={updatedTask} onChange={(e) => setUpdatedTask(e.target.value)} />
          <input className="todo-input" type="text" value={updatedDetails} onChange={(e) => setUpdatedDetails(e.target.value)} />
          <input className="todo-input" type="date" value={updateDueDate.toISOString().split('T')[0]} 
            onChange={(e) => setUpdateDueDate(new Date(e.target.value))}/>
          <button className="todo-save-button" onClick={handleUpdate}>Save</button>
          <button className="todo-cancel-button" onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>

        <input className="todo-checkbox" type="checkbox" checked={todo.isCompleted} onChange={() => toggleTodo(todo.id)} />
          <span className="todo-text" style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}>
            {todo.task}
          </span>
          {isDetailDiseble && isExpanded &&(
            <div className="todo-details">
              <p>Details: {todo.details}</p>
              <p>Due Date: {todo.dueDate.toDateString()}</p>
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
