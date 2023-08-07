import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  status: null,
};
export const orderFetch = createAsyncThunk("order/orderFetch", async () => {
  try {
    const res = await axios.get("http://localhost:5000/orders", setHeaders());
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export const editOrder = createAsyncThunk(
  "order/editOrder",
  async (values, { getState }) => {
    const state = getState();
    let currentOrder = state.order.list.filter(
      (order) => order._id === values.id
    );
    const newOrder = {
      ...currentOrder[0],
      delivery_status: values.delivery_status,
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/orders/${values.id}`,
        newOrder,
        setHeaders()
      );
      toast.success("Order updated successfully");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducer: {},
  extraReducers: {
    [orderFetch.pending]: (state, action) => {
      state.status = "loading";
    },
    [orderFetch.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.status = "success";
    },
    [orderFetch.rejected]: (state, action) => {
      state.status = "failed";
    },
    [editOrder.pending]: (state, action) => {
      state.status = "loading";
    },
    [editOrder.fulfilled]: (state, action) => {
      const updateOrder = state.list.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
      state.list = updateOrder;
      state.status = "success";
    },
    [editOrder.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export default orderSlice.reducer;
