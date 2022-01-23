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
        <div className="todo">
            <input 
                type="text" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <span onClick={() => removeItem(item._id)}>X</span>
            <input
                type="checkbox"
                checked={item.done}
                onChange={() => updateItem(item, {done: !item.done})}
                id={item._id}
            />
            <label htmlFor={item._id}>
                {item.value}
            </label>
        </div>
    )
}


export default Todo;
