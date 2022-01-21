import React, {useState} from "react";
import { useAddItem } from "../context/AppContext";

const NewTodo = () => {
    const [value, setValue] = useState("");
    
    const addTodo = useAddItem();


    const handleChange = e => setValue(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        addTodo({ title: value, done: false });
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