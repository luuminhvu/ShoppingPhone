import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`Increase ${state.cartItems[itemIndex].name} quantity`, {
          position: toast.POSITION.BOTTOM_LEFT,
        }); // Add this line
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} to cart`, {
          position: toast.POSITION.BOTTOM_LEFT,
        }); // Add this line
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {},
    updateQuantity(state, action) {},
    clearCart(state, action) {},
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
