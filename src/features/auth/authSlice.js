import { createSlice } from "@reduxjs/toolkit";
import {
  currentUser,
  logoutService,
  registerService,
  SigninService,
} from "../../services/authServices";

const initialState = {
  user: null,
  loading: false,
  success: null,
  error: null,
  message: null,
  showToast: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.success = null;
      state.error = null;
      state.message = null;
    },
    clearToast: (state) => {
      state.showToast = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(registerService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(registerService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.success = action.payload.success;
      });

    builder
      .addCase(SigninService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.success = null;
      })
      .addCase(SigninService.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.isLoggedIn = true;
      })
      .addCase(SigninService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "somthing went worng";
        state.success = action.payload.success;
        state.message = action.payload?.message || "something went wrong";
      });

    builder
      .addCase(currentUser.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
        state.success = null;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.user = action.payload.data;
        state.isLoggedIn = true;
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || "something went wrong";
        state.success = action.payload.success;
        state.isLoggedIn = false;
      });

    builder
      .addCase(logoutService.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
        state.success = null;
      })
      .addCase(logoutService.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(logoutService.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = action.payload.error;
        state.success = action.payload.success;
      });
  },
});

export const { clearMessages, clearToast } = authSlice.actions;

export default authSlice.reducer;
