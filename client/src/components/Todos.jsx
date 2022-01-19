import React, {useState, useEffect} from "react";
import api from "../api";
import { useAppStateContext } from "../context/AppContext"
import Todo from "./Todo";

const Todos = () => {
    //const [todos, setTodos] = useState([]);


    useEffect(() => {
        //api.todoList.fetchAll().then(todos => setTodos(todos));
    }, []);


    //When the page is first loaded, the variable is undefined !!!!!
    const todos = useAppStateContext().items;

    const getBody = () => {
        return todos ? todos.map(item => <Todo key={item._id} title={item.title}/>) : []
    }

    return (
        <div className="todo-list">
            {getBody()}
        </div>
    )
}

export default Todos;