import {useState, useEffect} from "react";
import { useDeleteItem, useUpdateItem } from "../context/AppContext"

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
      () => {
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay]
    );
    return debouncedValue;
};

const Todo = ({item}) => {
    const [value, setValue] = useState(item.title);
    const removeItem = useDeleteItem();
    const updateItem = useUpdateItem();
    const useDebounceRes = useDebounce(value, 3000);


    useEffect(() => {
        if (!useDebounceRes) return
        updateItem(item, {title: useDebounceRes});
        // Do I need to add item and updateItem in depending?
    }, [useDebounceRes])
    
    return (
        <div className="todo input-group mb-2">
            <input 
                type="text" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="form-control"
            />
            <div className="input-group-text">
              <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => updateItem(item, {done: !item.done})}
                  id={item._id}
                  className="form-check-input"
              />
              <label htmlFor={item._id}>
                {item.value}
            </label>
            </div>
            <button className="btn btn-danger" onClick={() => removeItem(item._id)}>
              <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="15px" height="15px"><path d="M 39.486328 6.9785156 A 1.50015 1.50015 0 0 0 38.439453 7.4394531 L 24 21.878906 L 9.5605469 7.4394531 A 1.50015 1.50015 0 0 0 8.484375 6.984375 A 1.50015 1.50015 0 0 0 7.4394531 9.5605469 L 21.878906 24 L 7.4394531 38.439453 A 1.50015 1.50015 0 1 0 9.5605469 40.560547 L 24 26.121094 L 38.439453 40.560547 A 1.50015 1.50015 0 1 0 40.560547 38.439453 L 26.121094 24 L 40.560547 9.5605469 A 1.50015 1.50015 0 0 0 39.486328 6.9785156 z"/></svg>
            </button>
        </div>
    )
}


export default Todo;
