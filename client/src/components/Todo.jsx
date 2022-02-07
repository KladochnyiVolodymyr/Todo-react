import { useState, useEffect, useRef } from "react";
import { useDeleteItem, useUpdateItem } from "../context/AppContext";
import useDebounce from "../hooks/useDebounce";
import { toast } from "react-toastify";

const Todo = ({ item }) => {
  const [value, setValue] = useState(item.title);
  const removeItem = useDeleteItem();
  const updateItem = useUpdateItem();
  const useDebounceRes = useDebounce(value, 2000);
  const inputEl = useRef(null);

  useEffect(() => {
    if (!useDebounceRes) return;
    updateItem(item, { title: useDebounceRes });
    // Do I need to add item and updateItem in depending?
  }, [useDebounceRes]);

  const handleRemoveItem = () => {
    toast.promise(removeItem(item._id), {
      pending: "Loading...",
      success: "Operation successful 👌",
      error: "Something went wrong 🤯",
    });
  }
  
  return (
    <div className="todo input-group mb-2">
      <button className="btn btn-secondary" onClick={() => {inputEl.current.focus()}}>
        <img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/24/000000/external-pencil-alignment-and-tools-kiranshastry-lineal-kiranshastry.png" alt="pencil"/>
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="form-control"
        ref={inputEl}
      />
      
      <div className="input-group-text">
        <input
          type="checkbox"
          checked={item.done}
          onChange={() => updateItem(item, { done: !item.done })}
          id={item._id}
          className="form-check-input"
        />
        <label htmlFor={item._id}>{item.value}</label>
      </div>
      <button
        className="btn btn-danger"
        onClick={handleRemoveItem}
      >
        <img src="https://img.icons8.com/ios-filled/15/000000/delete-sign--v1.png" alt="close"/>
      </button>
    </div>
  );
};

export default Todo;
