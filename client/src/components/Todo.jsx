import { useDeleteItem, useUpdateItem } from "../context/AppContext"
const Todo = ({item}) => {

    const removeItem = useDeleteItem();
    const updateItem = useUpdateItem();

    return (
        <div className="todo">
            <span>{item.title}---</span>
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
