import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setHeaders } from "./api";
const initialState = {
  items: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  editStatus: null,
};
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://shoppingphone.onrender.com/product"
    );
    return response?.data;
  }
);
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    try {
      const response = await axios.post(
        "https://shoppingphone.onrender.com/products",
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
        `https://shoppingphone.onrender.com/product/delete/${id}`,
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
export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (values) => {
    try {
      const response = await axios.put(
        `https://shoppingphone.onrender.com/product/edit/${values.product._id}`,
        values,
        setHeaders()
      );
      toast.success("Product updated successfully");
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
    [editProduct.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [editProduct.fulfilled]: (state, action) => {
      state.editStatus = "success";
      state.items = state.items.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    [editProduct.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },
  },
});
export default productSlide.reducer;
