import { FILTER_ITEMS } from "../types";

export function filterItems(status) {
  return async (dispatch) => {
    dispatch({ type: FILTER_ITEMS, status });
  };
}
