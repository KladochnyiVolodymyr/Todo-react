import { useAppStateContext, useUpdateItem, useFilterItems } from "../context/AppContext"

const ControlsPanel = () => {

    const todos = useAppStateContext().items;
    
    const updateItem = useUpdateItem();
    const filterItems = useFilterItems();
    const leftItems = todos.reduce((sum, current) => sum + !current.done, 0);

    function setTodosStatus(status) {
        todos.forEach(item => {
            updateItem(item, {done: status})
        });
    }

    const switchTodosStatus = () => {
        if(todos.every(todo => todo.done === true)) {
            setTodosStatus(false);
        } else {
            setTodosStatus(true);
        }
    }

    return (
        <div>
            <button onClick={switchTodosStatus}>Switch All</button>
            <button onClick={ () => filterItems('all')}>All</button>
            <button onClick={ () => filterItems('active')}>Active</button>
            <button onClick={ () => filterItems('completed')}>Completed</button>
            <p>{leftItems} left items</p>
        </div>
    )
}

export default ControlsPanel;