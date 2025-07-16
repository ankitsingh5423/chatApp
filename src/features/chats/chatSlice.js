import { createSlice } from "@reduxjs/toolkit";
import { userChatListService } from "../../services/chatServices";

const initialState = {
  loading: false,
  success: null,
  message: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userChatListService.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userChatListService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.sucess;
        state.message = action.payload.message;
        console.log("userchatslice..", state.success, state.message);
      })
      .addCase(userChatListService.rejected, (state, action) => {
        state.loading = false;
        state.success = action.payload.sucess;
        state.message = action.payload.message;
        console.log("userchatslice failed..", state.success, state.message);
      });
  },
});
