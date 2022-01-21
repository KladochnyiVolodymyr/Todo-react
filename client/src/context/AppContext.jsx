import { createContext, useReducer, useContext, useEffect } from "react";
import api from "../api";

const initState = {
  items: [],
}

function reducer(state, action) {
  switch (action.type) {
    case "initItems":
      return { ...state, items: action.todos };
    case "addItem":
      let todosArr = state.items;
      todosArr.push(action.item);
      return {...state, items: todosArr};
    case "deleteItem":
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.id)
      }
    case "updateItem":
      return {
        ...state, 
        items: state.items.map((item) => item._id === action.item._id ? {...item, ...action.item } : item)
      }
    default:
      throw Error("this is impossible");
  }
}

export const AppStateContext = createContext();
export const AppDispatchContext = createContext();

export function AppContextProvider({ children }) {
  const [state, setState] = useReducer(reducer, initState.items);

  useEffect(() => {
    api.todoList.fetchAll().then(todos =>
      setState({todos, type: 'initItems'})   
    );
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
  return function addItem(item) {
    if (item.length < 1) return
    api.todoList.create(item).then(item => dispatch({type: "addItem", item}));
  }
}

export function useDeleteItem() {
  const dispatch = useAppDispatchContext();
  return function removeItem(id) {
    api.todoList.delete(id).then(
      //Maybe need improvements
      res => dispatch({type: "deleteItem", id})
    ); 
  }
}

export function useUpdateItem() {
  const dispatch = useAppDispatchContext();
  
  return function updateItem(item, updateItem) {
    api.todoList.update({...item, ...updateItem}).then(
      res => dispatch({type: "updateItem", item: res})
    );
  }
}