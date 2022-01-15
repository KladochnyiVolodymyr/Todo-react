import React, {useState, useEffect} from "react";
import api from "../api";
import Todo from "./Todo";

const Todos = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        api.todoList.fetchAll().then(todos => setTodos(todos));
    }, []);

    const getBody = () => {
        return todos.map(item => <Todo key={item._id} title={item.title}/>)
    }

    return (
        <div className="todo-list">
            {getBody()}
        </div>
    )
}

export default Todos;