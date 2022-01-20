import { useAppStateContext } from "../context/AppContext"
import Todo from "./Todo";

const Todos = () => {

    const todos = useAppStateContext().items;

    const getBody = () => {
        return todos ? todos.map(item => <Todo key={item._id} item={item}/>) : []
    }

    return (
        <div className="todo-list">
            {getBody()}
        </div>
    )
}

export default Todos;