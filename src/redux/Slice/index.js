import { combineReducers } from "redux";
import { handleCounter } from "../reducer/counter.reducer";
import subCategorySlice from "./subCategorySlice";
import MyProfileSlice from "./MyProfileSlice";
import CategorySlice from "./CategorySlice";
import ProductSlice from "./ProductSlice";
import cartSlice from "./CartSlice";
import CouponSlice from "./CouponSlice";
import AuthSlice from "./AuthSlice";


export const rootReducer = combineReducers({
  count: handleCounter,
  subCategory: subCategorySlice,
  myProfile: MyProfileSlice,
  Category: CategorySlice,
  Product: ProductSlice,
  cart: cartSlice,
  coupon: CouponSlice,
  auth: AuthSlice,
});
