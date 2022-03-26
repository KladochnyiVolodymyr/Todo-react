import { FILTER_ITEMS } from "../types";

const initState = {
  filterType: "all",
};

export const filterReducer = (state = initState, action) => {
  switch (action.type) {
    case FILTER_ITEMS:
      return {
        ...state,
        filterType: action.status,
      };
    default:
      return state;
  }
};
