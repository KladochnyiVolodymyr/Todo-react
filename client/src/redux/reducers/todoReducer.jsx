import {
  INIT_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
} from "../types";

const initState = {
  items: []
};

export const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case INIT_ITEMS:
      return { ...state, items: action.todos };
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.item] };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.id),
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.item._id ? { ...item, ...action.item } : item
        ),
      };
    default:
      return state;
  }
};
