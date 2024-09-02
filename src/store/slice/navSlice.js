import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDropDownOpen:false,
    mode:false
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setIsDropDwonOpen(state, action) {
      state.isDropDownOpen = action.payload;
    },
    setDarkMode(state,action){
        state.mode = action.payload;
    }
   
  },
});

export const {
  setIsDropDwonOpen,
  setDarkMode
} = navSlice.actions;


export default navSlice.reducer;
