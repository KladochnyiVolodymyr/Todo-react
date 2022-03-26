import { SET_LOADER } from "../types";

export function loaderOn() {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER, payload: true });
  };
}

export function loaderOff() {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER, payload: false });
  };
}
