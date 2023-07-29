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
    removeFromCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems.splice(itemIndex, 1);
        toast.error(`${action.payload.name} removed`, {
          position: toast.POSITION.BOTTOM_LEFT,
        }); // Add this line
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCartQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (itemIndex >= 0) {
        if (state.cartItems[itemIndex].cartQuantity > 1) {
          state.cartItems[itemIndex].cartQuantity -= 1;
          toast.info(`Decrease ${state.cartItems[itemIndex].name} quantity`, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          state.cartItems.splice(itemIndex, 1);
          toast.error(`${action.payload.name} removed`, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseCartQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`Increase ${state.cartItems[itemIndex].name} quantity`, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateQuantity(state, action) {},
    clearCart(state, action) {},
  },
});
export const {
  addToCart,
  removeFromCart,
  decreaseCartQuantity,
  increaseCartQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
