import { LOADER_DISPLAY_ON, LOADER_DISPLAY_OFF } from "./types";

const initState = {
  loading: true,
};

export const loaderReducer = (state = initState, action) => {
  switch (action.type) {
    case LOADER_DISPLAY_ON:
      return {
        ...state,
        loading: true,
      };
    case LOADER_DISPLAY_OFF:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
 