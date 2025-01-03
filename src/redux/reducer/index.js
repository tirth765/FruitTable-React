import { combineReducers } from "redux";
import { handleCounter } from "./counter.reducer";

export const rootReducer = combineReducers  ({
    count: handleCounter,

})