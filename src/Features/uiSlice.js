import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSideBar: true,
  isSideBarHovered: false,
  showSendUI: false,
  showAirtelUI: false,
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

    setShowSendUI: (state, actions) => {
      state.showSendUI = actions.payload;
    },

    setShowAirtelUI: (state, actions) => {
      state.showAirtelUI = actions.payload;
    },
  },
});

export const {
  showSideBar,
  setShowSidebar,
  isSideBarHovered,
  setIsSideBarHovered,
  showSendUI,
  setShowSendUI,
  showAirtelUI,
  setShowAirtelUI,
} = uiSlice.actions;

export default uiSlice.reducer;
