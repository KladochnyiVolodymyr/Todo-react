import { useAppStateContext } from "../context/AppContext";
import Todo from "./Todo";

const Todos = () => {
  const { items, filterType } = useAppStateContext();

  function filterItems(items, filterType) {
    if(filterType === "active") {
      return items.filter((item) => item.done === false);
    }

    if(filterType === "completed") {
      return items.filter((item) => item.done === true);
    }

    return items;
  }

  const filteredItems = filterItems(items, filterType);

  const buildListItems = () => {
    return filteredItems.map((item) => <Todo key={item._id} item={item} />);
  };

  return <div className="todo-list">{buildListItems()}</div>;
};

export default Todos;
