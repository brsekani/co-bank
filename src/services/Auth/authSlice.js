// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },

  reducers: {
    loginRequest(state) {
      state.status = "loading";
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    loginFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.status = "idle";
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
