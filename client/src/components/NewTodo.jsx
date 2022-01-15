import React, {useState} from "react";
import api from "../api";

const NewTodo = () => {
    const [value, setValue] = useState("");

    const addTodo = (newItem) => {
        api.todoList.create({title: newItem});
    }

    const handleChange = e => setValue(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        addTodo(value);
        setValue("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="What needs to be done?" 
                onChange={handleChange} 
                value={value}
            />
            <input type="submit" value="Send"/>
        </form>
    );
}


export default NewTodo;