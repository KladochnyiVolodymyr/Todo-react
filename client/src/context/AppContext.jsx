import { createContext, useReducer, useContext, useEffect } from "react";
import api from "../api";

export const AppStateContext = createContext();
export const AppDispatchContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "addItem":
      return { ...state, items: [...state.items, action.payload.item] };
    default:
      throw Error("this is impossible");
  }
}

export function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
      
  }, []);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
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
    return function addItem(item) {
      if (item.length < 1) return
      api.todoList.create({title: item});
    }
}