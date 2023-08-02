import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  items: [],
  status: null,
  createStatus: null,
};
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:5000/product");
    return response?.data;
  }
);
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/products",
        product
      );
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
);
const productSlide = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [createProduct.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [createProduct.fulfilled]: (state, action) => {
      state.createStatus = "success";
      state.items.push(action.payload);
    },
    [createProduct.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },
  },
});
export default productSlide.reducer;
