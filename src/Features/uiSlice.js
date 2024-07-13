import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSideBar: true,
  isSideBarHovered: false,
  showSendUI: false,
  showAirtimeUI: false,
  showAddNewGoal: false,
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

    setShowAirtimeUI: (state, actions) => {
      state.showAirtimeUI = actions.payload;
    },
    setShowAddNewGoal: (state, actions) => {
      state.showAddNewGoal = actions.payload;
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
  showAirtimeUI,
  setShowAirtimeUI,
  showAddNewGoal,
  setShowAddNewGoal,
} = uiSlice.actions;

export default uiSlice.reducer;
