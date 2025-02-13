import { combineReducers } from "redux";
import { handleCounter } from "./counter.reducer";
import subCategorySlice from "../Slice/subCategorySlice";
import MyProfileSlice from "../Slice/MyProfileSlice";
import CategorySlice from "../Slice/CategorySlice";
import ProductSlice from "../Slice/ProductSlice";
import cartSlice from "../Slice/CartSlice";

export const rootReducer = combineReducers({
  count: handleCounter,
  subCategory: subCategorySlice,
  myProfile: MyProfileSlice,
  Category: CategorySlice,
  Product: ProductSlice,
  cart: cartSlice,
});
