import { useAppStateContext } from "../context/AppContext";
import Todo from "./Todo";
import { initItems } from "../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Todos = () => {
  const { filterType } = useAppStateContext();
  

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(initItems());
  }, []);


  const items = useSelector(state => {
    const { initItems } = state;
    return initItems.items;
  })

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
