import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setHeaders } from "./api";
const initialState = {
  items: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
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
        product,
        setHeaders()
      );
      toast.success("Product created successfully");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/product/delete/${id}`,
        setHeaders()
      );
      toast.success("Product deleted successfully");
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
    [deleteProduct.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.deleteStatus = "success";
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
    },
    [deleteProduct.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
  },
});
export default productSlide.reducer;
