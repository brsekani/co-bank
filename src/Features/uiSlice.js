import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSideBar: true,
  isSideBarHovered: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setShowSidebar: (state) => {
      state.showSideBar = !state.showSideBar;
      state.isSideBarHovered = true;
    },

    setIsSideBarHovered: (state, actions) => {
      state.isSideBarHovered = actions.payload;
    },
  },
});

export const {
  showSideBar,
  setShowSidebar,
  isSideBarHovered,
  setIsSideBarHovered,
} = uiSlice.actions;

export default uiSlice.reducer;
