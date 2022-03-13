import { useState } from "react";
//import { useAddItem } from "../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { addedItem } from "../redux/actions";

const NewTodo = () => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  //const addTodo = useAddItem();

  const handleChange = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimedValue = value.trim();  
    if(trimedValue) {
      //addTodo({ title: trimedValue, done: false });   
      dispatch(addedItem({ title: trimedValue, done: false }))
    }
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="input-group mb-3">
      <input
        type="text"
        placeholder="What needs to be done?"
        onChange={handleChange}
        value={value}
        className="form-control"
      />
      <input className="btn btn-primary" type="submit" value="Send" />
    </form>
  );
};

export default NewTodo;
