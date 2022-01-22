import { useAppStateContext, useUpdateItem, useFilterItems } from "../context/AppContext"

const ControlsPanel = () => {

    const todos = useAppStateContext().items;
    const updateItem = useUpdateItem();

    const doneAll = () => {
        todos.forEach(item => {
            updateItem(item, {done: true})
        });
    }

    const filterItems = useFilterItems();

    return (
        <div>
            <button onClick={doneAll}>Done All</button>
            <button onClick={ () => filterItems('all')}>All</button>
            <button onClick={ () => filterItems('active')}>Active</button>
            <button onClick={ () => filterItems('completed')}>Completed</button>
        </div>
    )
}

export default ControlsPanel;