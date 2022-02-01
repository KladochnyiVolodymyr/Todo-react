import { useAppStateContext } from "../context/AppContext";
import Todo from "./Todo";

const Todos = () => {
  const { items, filterType } = useAppStateContext();

  function filterItems(items, filterType) {
    let filteredArr;
    switch (filterType) {
      case "active":
        filteredArr = items.filter((item) => item.done === false);
        break;
      case "completed":
        filteredArr = items.filter((item) => item.done === true);
        break;
      default:
        filteredArr = [...items];
    }
    return filteredArr;
  }

  const filteredItems = filterItems(items, filterType);

  const buildListItems = () => {
    return filteredItems.map((item) => <Todo key={item._id} item={item} />);
  };

  return <div className="todo-list">{buildListItems()}</div>;
};

export default Todos;
