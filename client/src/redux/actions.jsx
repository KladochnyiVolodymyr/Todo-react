import { INIT_ITEMS, ADD_ITEM, DELETE_ITEM } from "./types";
import api from "../api";

export function initItems() {
  return async (dispatch) => {
    api.todoList.fetchAll().then((todos) => {
      dispatch({ type: INIT_ITEMS, todos });
    });
  };
}

export function addedItem(item) {
  return async (dispatch) => {
    let addedItem = await api.todoList.create(item);
    dispatch({ type: ADD_ITEM, item: addedItem });
  };
}

export function deleteItem(id) {
  return async (dispatch) => {
    await api.todoList.delete(id);
    dispatch({ type: DELETE_ITEM, id });
  };
}
