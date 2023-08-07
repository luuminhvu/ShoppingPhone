import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productSlice, { fetchProducts } from "./store/productSlice";
import { productApi } from "./store/productApi";
import cartSlice from "./store/cartSlice";
import authSlice, { loadUser } from "./store/authSlice";
import orderSlice from "./store/orderSlice";
const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
    order: orderSlice,
    auth: authSlice,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});
store.dispatch(fetchProducts());
store.dispatch(loadUser());
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
