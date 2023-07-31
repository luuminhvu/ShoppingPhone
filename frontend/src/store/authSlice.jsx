import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
const initialState = {
  token: localStorage.getItem("token") || null,
  name: "",
  email: "",
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};
export const register = createAsyncThunk(
  "auth/registerUser ",
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post("http://localhost:5000/register", {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      localStorage.setItem("token", token.data);
      return token.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const login = createAsyncThunk(
  "auth/loginUser",
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post("http://localhost:5000/login", {
        email: values.email,
        password: values.password,
      });
      localStorage.setItem("token", token.data);
      return token.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;
      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          name: user.name,
          email: user.email,
          _id: user._id,
          userLoaded: true,
        };
      }
    },
    logout(state, action) {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        name: "",
        email: "",
        _id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(register.fulfilled, (state, action) => {
      const user = jwtDecode(action.payload);
      if (action.payload) {
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          registerStatus: "success",
          registerError: "",
          userLoaded: true,
        };
      } else {
        return state;
      }
    });
    builder.addCase(register.rejected, (state, action) => {
      state.registerStatus = "failed";
      state.registerError = action.payload;
    });
    builder.addCase(login.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const user = jwtDecode(action.payload);
      if (action.payload) {
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          loginStatus: "success",
          loginError: "",
          userLoaded: true,
        };
      } else {
        return state;
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginStatus = "failed";
      state.loginError = action.payload;
    });
  },
});
export default authSlice.reducer;
export const { loadUser, logout } = authSlice.actions;
