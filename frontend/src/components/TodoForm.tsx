import React, {useState} from "react";

interface TodoFormProps {
    addTodo: (task: string, details: string,dueDate: Date) => void;
    toggleForm: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo, toggleForm }) => {
    const [task, setTask] = useState<string>("");
    const [details, setDetails] = useState<string>("");
    const [dueDate, setDueDate] = useState<Date>(new Date());


    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value}  = event.target;
        if(name === "task"){
            setTask(value);
        } else {
            setDetails(value);
        } 
    };

    const handleDueDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(new Date(event.target.value));
    };

    const handleSubmitForm = (event: React.FormEvent) => {
        event.preventDefault();
        if(task.trim().length === 0){
            alert("Plese enter the value");
            return;
        }
        addTodo(task, details, dueDate);
        setTask("");
        setDetails("");
        setDueDate(new Date());
        toggleForm();
    };

    const handleCancel = () => {
        toggleForm();
    }
    
    return (
        <form className="todo-form" onSubmit={handleSubmitForm}>
            <input className="todo-input" type="text" name="task" value={task}  onChange={handleInput} placeholder="Task"/>
            <input className="todo-input" type="text" name="details" value={details}  onChange={handleInput} placeholder="Details"/>
            <input className="todo-input" type="date" value={dueDate.toISOString().split('T')[0]}
                onChange={handleDueDateChange} placeholder="Due Date"/>
            <button className="todo-button" type="submit">Add Task</button>
            <button className="todo-button cancel-button " type="button" onClick={handleCancel}>Cancel</button>

        </form>
    );

};

export default TodoForm;