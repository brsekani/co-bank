import { configureStore } from "@reduxjs/toolkit";
import DarkMode from "../Features/DarkMode";
import uiSlice from "../Features/uiSlice";

export default configureStore({
  reducer: {
    darkMode: DarkMode,
    ui: uiSlice,
  },
});
