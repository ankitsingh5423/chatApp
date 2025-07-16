import axoisInstance from "./axoisInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userChatListService = createAsyncThunk(
  "chatList",
  async (thunkAPI) => {
    try {
      const response = await axoisInstance.get("chat-app/chats");
      console.log("chat list res....", response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
