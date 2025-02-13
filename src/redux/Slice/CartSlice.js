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
      console.log(action, "dsd");

      console.log(state.cart);

      const findCart = state.cart.find((v) => v.pId === action.payload);
      console.log(findCart);

      if (findCart) {
        findCart.Qty++;
      } else {
        state.cart.push({ pId: action.payload, Qty: 1 });
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
