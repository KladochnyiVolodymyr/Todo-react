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
        <div className="container">
            <h5>{leftItems} left items</h5>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <button className="btn btn-outline-primary" onClick={switchTodosStatus}>Switch All</button>
                <button className="btn btn-outline-primary" onClick={ () => filterItems('all')}>All</button>
                <button className="btn btn-outline-primary" onClick={ () => filterItems('active')}>Active</button>
                <button className="btn btn-outline-primary" onClick={ () => filterItems('completed')}>Completed</button>
                <button className="btn btn-danger" onClick={clearCompletedItems}>Clear Completed</button>
            </div>
        </div>
    )
}

export default ControlsPanel;