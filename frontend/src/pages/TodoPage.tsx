import React, {useState} from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { Todo } from "../type";
import "../styles/Todo.css";


const TodoPage: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]> ([]);
    const [isAdding, setisAdding] = useState<boolean>(false);
    const [expandedTodoID, setExpandedTodoID] = useState<number | null>(null);

    const addTodo = (task: string, details: string, dueDate: Date) => {
        const newTodo: Todo = {
            id: todos.length + 1,
            task,
            details,
            dueDate,
            isCompleted: false,
        };
        setTodos([newTodo, ...todos]);
        setisAdding(false);
    };

    const updateTodo = (id: number, updatedTask: string, updatedDetails: string, updateDueDate: Date) => {
        const updatedTodos = todos.map((todo) => 
            todo.id === id ? { ...todo, task: updatedTask, details: updatedDetails, dueDate: updateDueDate} : todo
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

    const handleToggleExpand = (id: number) => {
        setExpandedTodoID(expandedTodoID === id ? null : id);
    }

    return  (
        <div>

            <div className="todo-container">
                <h1 className="todo-header">Todo List</h1>
                <TodoList 
                    todos={todos} 
                    toggleTodo={toggleTodo} 
                    deleteTodo={deleteTodo} 
                    updateTodo={updateTodo}
                    expandedTodoID={expandedTodoID}
                    handleToggleExpand={handleToggleExpand}
                />
                {isAdding ? (
                    <TodoForm addTodo={addTodo} toggleForm={toggleForm}/>
                ) : (
                    <button className="todo-add-button" onClick={toggleForm}>
                        Add Task
                    </button>
                )}
            </div>
        </div>
    );
};

export default TodoPage;