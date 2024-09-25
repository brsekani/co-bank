import { configureStore } from "@reduxjs/toolkit";
import DarkMode from "../Features/DarkMode";
import uiSlice from "../Features/uiSlice";
import authReducer from "../Features/auth/authSlice";

export default configureStore({
  reducer: {
    darkMode: DarkMode, // Add dark mode slice
    ui: uiSlice, // Add UI slice
    auth: authReducer,
  },
});
