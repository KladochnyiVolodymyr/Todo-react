import { createContext, useReducer, useContext, useEffect } from "react";
import api from "../api";

const initState = {
  items: []
}

function reducer(state, action) {
  switch (action.type) {
    case "addItem":
      return { ...state, items: action.todos };
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
      setState({todos, type: 'addItem'})   
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
  //const dispatch = useAppDispatchContext()
  return function addItem(item) {
    if (item.length < 1) return
    api.todoList.create({title: item});
    //dispatch({type: "addItem", payload: {item}})
  }
}