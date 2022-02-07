import {
  useAppStateContext,
  useUpdateItem,
  useFilterItems,
  useDeleteItem,
} from "../context/AppContext";
import { toast } from "react-toastify";

const ControlsPanel = () => {
  const todos = useAppStateContext().items;

  const updateItem = useUpdateItem();
  const filterItems = useFilterItems();
  const removeItem = useDeleteItem();

  const leftItems = todos.reduce((sum, current) => sum + !current.done, 0);

  function setAllTodosStatus(status) {
    return Promise.all(todos.map((item) => updateItem(item, { done: status })));
  }

  const switchTodosStatus = () => {
    setAllTodosStatus(todos.every((todo) => !todo.done));
  };

  //можна винести в context
  const clearCompletedItems = () => {
    return Promise.all(
      todos.filter((item) => item.done).map((item) => removeItem(item._id))
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
          onClick={() => filterItems("all")}
        >
          All
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => filterItems("active")}
        >
          Active
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => filterItems("completed")}
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
