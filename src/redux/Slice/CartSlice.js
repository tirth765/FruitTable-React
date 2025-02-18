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
    increment:(state, action) => {
      console.log(action);
      const inc = state.cart.find((v) => v.pId === action.payload.pId)
      console.log(inc);

      if(inc) {
        inc.Qty+=1;
      } 
      
    },
    decrement:(state, action) => {
      console.log(action);
      
      console.log(action);
      const dec = state.cart.find((v) => v.pId === action.payload.pId)
      console.log(dec);

      if(dec) {
        dec.Qty-=1;
      } 
    },
    remove:(state, action) => {
      console.log(action);
      
      const del = state.cart.findIndex((v) => v.pId === action.payload.pId)
      console.log(del);

      state.cart?.splice(del, 1);
    
      
    }
    
  },
});

export const { addToCart,decrement, increment, remove } = cartSlice.actions;
export default cartSlice.reducer;
