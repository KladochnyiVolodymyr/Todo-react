import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useDeleteItem, useUpdateItem } from "../context/AppContext";
import useDebounce from "../hooks/useDebounce";
import { toast } from "react-toastify";
import { deleteItem, updateItem } from "../redux/actions";

const Todo = ({ item }) => {
  const [value, setValue] = useState(item.title);
  const [isEditing, setIsEditing] = useState(false);
  
  const dispatch = useDispatch();

  //const removeItem = useDeleteItem();
  //const updateItem = useUpdateItem();
  const useDebounceRes = useDebounce(value, 2000);
  

  useEffect(() => {
    if (!useDebounceRes) return;
    dispatch(updateItem(item, { title: useDebounceRes }));
    // Do I need to add item and updateItem in depending?
  }, [useDebounceRes]);

  const handleRemoveItem = () => {
    toast.promise(dispatch(deleteItem(item._id)), {
      pending: "Loading...",
      success: "Operation successful 👌",
      error: "Something went wrong 🤯",
    });
  };

  const handleSetValue = (e) => {
    if (e.code === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div className="todo input-group mb-2">
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleSetValue}
          className="form-control"
        />
      ) : (
        <div
          className="form-control text-start"
          onDoubleClick={() => setIsEditing(true)}
        >
          {value}
        </div>
      )}

      <div className="input-group-text">
        <input
          type="checkbox"
          checked={item.done}
          onChange={() => dispatch(updateItem(item, { done: !item.done }))}
          id={item._id}
          className="form-check-input"
        />
        <label htmlFor={item._id}>{item.value}</label>
      </div>
      <button className="btn btn-danger" onClick={handleRemoveItem}>
        <img
          src="https://img.icons8.com/ios-filled/15/000000/delete-sign--v1.png"
          alt="close"
        />
      </button>
    </div>
  );
};

export default Todo;
