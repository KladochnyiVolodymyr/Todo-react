import { useDispatch, useSelector } from "react-redux";
import { updateItem, deleteItem, filterItems} from "../redux/actions";
import { toast } from "react-toastify";

const ControlsPanel = () => {

  const todos = useSelector(state => {
    const { initItems } = state;
    return initItems.items;
  })

  const dispatch = useDispatch();

  const leftItems = todos.reduce((sum, current) => sum + !current.done, 0);

  function setAllTodosStatus(status) {
    return Promise.all(todos.map((item) => dispatch(updateItem(item, { done: status }))));
  }

  const switchTodosStatus = () => {
    setAllTodosStatus(todos.every((todo) => !todo.done));
  };

  const clearCompletedItems = () => {
    return Promise.all(
      todos.filter((item) => item.done).map((item) => dispatch(deleteItem(item._id)))
    );
  };

  const handleClearCompleted = () => {
    toast.promise(clearCompletedItems, {
      pending: "Loading...",
      success: "Operation successful 👌",
      error: "Something went wrong 🤯",
    });
  }

  return (
    <div className="container">
      <h5>{leftItems} left items</h5>
      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
        <button className="btn btn-outline-primary" onClick={switchTodosStatus}>
          Switch All
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => dispatch(filterItems("all"))}
        >
          All
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => dispatch(filterItems("active"))}
        >
          Active
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => dispatch(filterItems("completed"))}
        >
          Completed
        </button>
        <button
          className="btn btn-danger"
          onClick={handleClearCompleted}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default ControlsPanel;
