import axoisInstance from "./axoisInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerService = createAsyncThunk(
  "register",
  async (data, thunkAPI) => {
    try {
      const response = await axoisInstance.post("users/register", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data || "registration failed"
      );
    }
  }
);

export const SigninService = createAsyncThunk(
  "signin",
  async (data, thunkAPI) => {
    try {
      const response = await axoisInstance.post("users/login", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const currentUser = createAsyncThunk(
  "currentUser",
  async (data, thunkAPI) => {
    try {
      const response = await axoisInstance.get("users/current-user", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutService = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    const response = await axoisInstance.post("users/logout");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isLoggedIn");
    console.log(response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.error);
  }
});
