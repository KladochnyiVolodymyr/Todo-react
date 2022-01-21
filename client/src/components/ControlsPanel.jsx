import { useAppStateContext, useUpdateItem, useFilterItems } from "../context/AppContext"

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

    const filterActive = useFilterItems();
    const filterCompleted = useFilterItems();
    
    return (
        <div>
            <button onClick={doneAll}>Done All</button>
            <button onClick={filterAll}>All</button>
            <button onClick={ () => filterActive(false)}>Active</button>
            <button onClick={ () => filterCompleted(true)}>Completed</button>
        </div>
    )
}

export default ControlsPanel;