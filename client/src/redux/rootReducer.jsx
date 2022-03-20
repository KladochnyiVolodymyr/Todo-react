import { combineReducers } from "redux";
import { todoReducer } from "./todoReducer";
import { filterReducer } from "./filterReducer";
import { loaderReducer } from "./loaderReducer"

export const rootReducer = combineReducers({
    initItems: todoReducer,
    filterItems: filterReducer,
    loader: loaderReducer
});