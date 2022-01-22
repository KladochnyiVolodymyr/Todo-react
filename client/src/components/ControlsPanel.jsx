import { useAppStateContext, useUpdateItem, useFilterItems, useDeleteItem } from "../context/AppContext"

const ControlsPanel = () => {

    const todos = useAppStateContext().items;

    const updateItem = useUpdateItem();
    const filterItems = useFilterItems();
    const removeItem = useDeleteItem();

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

    const clearCompletedItems = () => {
        todos.forEach(item => {
            if(item.done) {
                removeItem(item._id);
            }
        });
    }

    return (
        <div>
            <button onClick={switchTodosStatus}>Switch All</button>
            <button onClick={ () => filterItems('all')}>All</button>
            <button onClick={ () => filterItems('active')}>Active</button>
            <button onClick={ () => filterItems('completed')}>Completed</button>
            <button onClick={clearCompletedItems}>Clear Completed</button>
            <p>{leftItems} left items</p>
        </div>
    )
}

export default ControlsPanel;