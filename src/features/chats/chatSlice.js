import { createSlice } from "@reduxjs/toolkit";
import {
  avalableUserListService,
  getAllMessagesService,
  oneOnOneChatService,
  sendMessageService,
} from "../../services/chatServices";

const initialState = {
  loading: true,
  chatList: null,
  success: null,
  message: null,
  chatMessages: [],
  selectedUser: null,
  selectedChat: null,
  chatListLoading: true,
  messageLoading: false,
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    selectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearChatState: (state) => {
      state.chatMessages = [];
      state.selectedUser = null;
      state.selectedChat = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(avalableUserListService.pending, (state, action) => {
        state.chatListLoading = true;
      })
      .addCase(avalableUserListService.fulfilled, (state, action) => {
        state.chatListLoading = false;
        state.success = action.payload.sucess;
        state.message = action.payload.message;
        state.chatList = action.payload.data;
      })
      .addCase(avalableUserListService.rejected, (state, action) => {
        state.chatListLoading = false;
        state.message = action.payload?.message || "something went wrong";
      });

    builder
      .addCase(oneOnOneChatService.pending, (state, action) => {
        state.messageLoading = true;
      })
      .addCase(oneOnOneChatService.fulfilled, (state, action) => {
        state.messageLoading = false;
        state.success = action.payload.sucess;
        state.message = action.payload.message;
        state.chatMessages = action.payload.data.messages || [];
        state.selectedChat = action.payload.data._id;
      })
      .addCase(oneOnOneChatService.rejected, (state, action) => {
        state.loading = false;
        state.success = action.payload.sucess;
        state.message = action.payload.message;
      });

    builder
      .addCase(sendMessageService.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendMessageService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.sucess;
        state.message = action.payload.message;
        if (!state.chatMessages) state.chatMessages = [];
        state.chatMessages.push(action.payload.data);
        console.log("slice...", state.chatMessages);
      })
      .addCase(sendMessageService.rejected, (state, action) => {
        state.loading = false;
        state.success = action.payload.sucess;
        state.message = action.payload.message;
      });
    builder
      .addCase(getAllMessagesService.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllMessagesService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.sucess;
        state.message = action.payload.message;
        state.chatMessages = action.payload.data;
      })
      .addCase(getAllMessagesService.rejected, (state, action) => {
        state.loading = false;
        state.success = action.payload.sucess;
        state.message = action.payload.message;
      });
  },
});

export const { selectedUser, clearChatState } = chatSlice.actions;
export default chatSlice.reducer;
