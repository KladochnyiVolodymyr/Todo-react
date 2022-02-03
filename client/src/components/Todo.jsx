import { useState, useEffect, useRef } from "react";
import { useDeleteItem, useUpdateItem } from "../context/AppContext";
import useDebounce from "../hooks/useDebounce";
import { toast } from "react-toastify";

const Todo = ({ item }) => {
  const [value, setValue] = useState(item.title);
  const [editing, setEditing] = useState(false);
  const removeItem = useDeleteItem();
  const updateItem = useUpdateItem();
  const useDebounceRes = useDebounce(value, 2000);
  const inputEl = useRef(null);

  useEffect(() => {
    if (!useDebounceRes) return;
    updateItem(item, { title: useDebounceRes });
    // Do I need to add item and updateItem in depending?
  }, [useDebounceRes]);

  const handleEditing = () => {
    setEditing(true);
    inputEl.current.focus();
  };

  return (
    <div className="todo input-group mb-2">
      <button className="btn btn-secondary" onClick={handleEditing}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-pencil"
          viewBox="0 0 16 16"
        >
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path>
        </svg>
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
        onClick={() => {
          toast.promise(removeItem(item._id), {
            pending: "Loading...",
            success: "Operation successful 👌",
            error: "Something went wrong 🤯",
          });
        }}
      >
        <svg
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="15px"
          height="15px"
        >
          <path d="M 39.486328 6.9785156 A 1.50015 1.50015 0 0 0 38.439453 7.4394531 L 24 21.878906 L 9.5605469 7.4394531 A 1.50015 1.50015 0 0 0 8.484375 6.984375 A 1.50015 1.50015 0 0 0 7.4394531 9.5605469 L 21.878906 24 L 7.4394531 38.439453 A 1.50015 1.50015 0 1 0 9.5605469 40.560547 L 24 26.121094 L 38.439453 40.560547 A 1.50015 1.50015 0 1 0 40.560547 38.439453 L 26.121094 24 L 40.560547 9.5605469 A 1.50015 1.50015 0 0 0 39.486328 6.9785156 z" />
        </svg>
      </button>
    </div>
  );
};

export default Todo;
