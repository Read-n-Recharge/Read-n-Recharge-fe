import React, {useState} from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { Todo } from "../type";
import "../styles/Todo.css";

const TodoPage: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]> ([]);
    const [isAdding, setisAdding] = useState<boolean>(false);

    const addTodo = (task: string, details: string) => {
        const newTodo: Todo = {
            id: Date.now(),
            task,
            details,
            isCompleted: false,
        };
        setTodos([newTodo, ...todos]);
        setisAdding(false);
    };

    const updateTodo = (id: number, updatedTask: string, updatedDetails: string) => {
        const updatedTodos = todos.map((todo) => 
            todo.id === id ? { ...todo, task: updatedTask, details: updatedDetails} : todo
        );
        setTodos(updatedTodos);
    }

    const toggleTodo = (id: number) => {
        const updatedTodos = todos.map((todo) => 
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted} : todo
        );
        setTodos(updatedTodos);
    };

    const deleteTodo = (id: number ) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const toggleForm = () => {
        setisAdding(!isAdding);
    }

    return  (
        <div className="todo-container">
            <h1 className="todo-header">Todo List</h1>
            <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
            {isAdding ? (
                <TodoForm addTodo={addTodo} toggleForm={toggleForm}/>
            ) : (
                <button className="todo-add-button" onClick={toggleForm}>
                    Add Task
                </button>
            )}
        </div>
    );
};

export default TodoPage;