import { combineReducers } from "redux";
import { handleCounter } from "./counter.reducer";
import  subCategorySlice from "../Slice/subCategory"

export const rootReducer = combineReducers  ({
    count: handleCounter,
    subCategory: subCategorySlice,
})