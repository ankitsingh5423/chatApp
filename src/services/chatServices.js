import axiosInstance from "./axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const avalableUserListService = createAsyncThunk(
  "chatList",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get("chat-app/chats/users");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const oneOnOneChatService = createAsyncThunk(
  "onOneoneChat",
  async (receiverId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `chat-app/chats/c/${receiverId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const sendMessageService = createAsyncThunk(
  "sendMessage",
  async ({ chatId, message }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("content", message);

      const response = await axiosInstance.post(
        `chat-app/messages/${chatId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllMessagesService = createAsyncThunk(
  "getAllMessage",
  async ({ chatId }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`chat-app/messages/${chatId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
