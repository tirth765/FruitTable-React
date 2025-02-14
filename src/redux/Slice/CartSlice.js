import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  cart: [],
  error: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => { 
      console.log(action);

      const findCart = state.cart.find((v) => v.pId === action.payload.pId);
      console.log(findCart);

      if (findCart) {
        findCart.Qty = findCart.Qty + action.payload.Qty;
      } else {
        state.cart.push(action.payload);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
