import { createContext, useContext, useEffect, useReducer } from "react";
import api from "../api";

const initState = {
  items: [],
  filterType: "all",
  loading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "initItems":
      return { ...state, loading: false, items: action.todos };
    case "addItem":
      return {...state, items: [...state.items, action.item]}
    case "deleteItem":
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.id),
      };
    case "updateItem":
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.item._id ? { ...item, ...action.item } : item
        ),
      };
    case "filterItems":
      return {
        ...state,
        filterType: action.status,
      };
    default:
      throw Error("this is impossible");
  }
}

export const AppStateContext = createContext();
export const AppDispatchContext = createContext();

export function AppContextProvider({ children }) {
  const [state, setState] = useReducer(reducer, initState);

  useEffect(() => {
    api.todoList.fetchAll().then((todos) => {
      setState({ todos, type: "initItems" });
    });
  }, []);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={setState}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

export const useAppStateContext = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw Error("useAppCotext must be invoke within AppContext");
  }
  return context;
};

export const useAppDispatchContext = () => {
  const dispatch = useContext(AppDispatchContext);
  if (!dispatch) {
    throw Error("useAppCotext must be invoke within AppContext");
  }
  return dispatch;
};

export function useAddItem() {
  const dispatch = useAppDispatchContext();
  return async function addItem(item) {
    let addedItem = await api.todoList.create(item);
    dispatch({ type: "addItem", item: addedItem });
  };
}

export function useDeleteItem() {
  const dispatch = useAppDispatchContext();
  return async function removeItem(id) {
    await api.todoList.delete(id);
    dispatch({ type: "deleteItem", id });
  };
}

export function useUpdateItem() {
  const dispatch = useAppDispatchContext();

  return async function updateItem(item, updateItem) {
    let updatedItem = await api.todoList.update({ ...item, ...updateItem });
    dispatch({ type: "updateItem", item: updatedItem });
  };
}

export function useFilterItems() {
  const dispatch = useAppDispatchContext();

  return function filterItems(status) {
    dispatch({ type: "filterItems", status });
  };
}
