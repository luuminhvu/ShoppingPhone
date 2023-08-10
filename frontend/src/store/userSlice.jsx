import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setHeaders } from "./api";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  status: null,
  deleteStatus: null,
};
export const userFetch = createAsyncThunk("user/userFetch", async () => {
  try {
    const res = await axios.get("http://localhost:5000/users/", setHeaders());
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { getState }) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/users/delete/${id}`,
        setHeaders()
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const userSlice = createSlice({
  name: "users",
  initialState,
  reducer: {},
  extraReducers: {
    [userFetch.pending]: (state, action) => {
      state.status = "loading";
    },
    [userFetch.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.status = "success";
    },
    [userFetch.rejected]: (state, action) => {
      state.status = "failed";
    },
    [deleteUser.pending]: (state, action) => {
      state.deleteStatus = "loading";
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.list = state.list.filter((user) => user._id !== action.payload._id);
      state.deleteStatus = "success";
      toast.success("User deleted successfully");
    },
    [deleteUser.rejected]: (state, action) => {
      state.deleteStatus = "failed";
    },
  },
});
export default userSlice.reducer;
