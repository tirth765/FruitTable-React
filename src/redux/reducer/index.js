import { combineReducers } from "redux";
import { handleCounter } from "./counter.reducer";
import subCategorySlice from "../Slice/subCategorySlice";
import MyProfileSlice from "../Slice/MyProfileSlice"


export const rootReducer = combineReducers  ({
    count: handleCounter,
    subCategory: subCategorySlice,
    myProfile: MyProfileSlice,
})