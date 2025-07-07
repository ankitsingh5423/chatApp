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
      console.log(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
