import { useAppStateContext, useUpdateItem } from "../context/AppContext"

const ControlsPanel = () => {

    const todos = useAppStateContext().items;
    const updateItem = useUpdateItem();

    const doneAll = () => {
        todos.forEach(item => {
            updateItem(item, {done: true})
        });
    }

    const filterAll = () => {

    }

    const filterActive = () => {
        
    }

    const filterCompleted = () => {
        
    }
    return (
        <div>
            <button onClick={doneAll}>Done All</button>
            <button onClick={filterAll}>All</button>
            <button onClick={filterActive}>Active</button>
            <button onClick={filterCompleted}>Completed</button>
        </div>
    )
}

export default ControlsPanel;