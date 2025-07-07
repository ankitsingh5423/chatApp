import { createSlice } from "@reduxjs/toolkit";
import { registerService, SigninService } from "../../services/authServices";
const initialState = {
  user: null,
  loading: false,
  success: null,
  error: null,
  message: null,
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
        state.user = action.payload.data.user;
        state.success = action.payload.success;
        state.message = action.payload.message;
        console.log("resiger message fulfilled", action.payload.message);
      })
      .addCase(registerService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        console.log("register fail message", action.payload.message);
      });

    builder
      .addCase(SigninService.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.success = null;
      })
      .addCase(SigninService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(SigninService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        console.log("slice error...",action.payload.message)
      });
  },
});

export const { clearMessages } = authSlice.actions;

export default authSlice.reducer;
