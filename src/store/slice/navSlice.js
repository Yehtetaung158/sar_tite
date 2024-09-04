import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDropDownOpen:false,
    mode:false,
    isPeopleDetail:false,
    currentPeopleId:null
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
    },
    setisPeopleDetail(state,action){
      state.isPeopleDetail=action.payload;
    },
    setcurrentPeopleId(state,action){
      state.currentPeopleId=action.payload;
    }
   
  },
});

export const {
  setIsDropDwonOpen,
  setDarkMode,
  setisPeopleDetail,
  setcurrentPeopleId
} = navSlice.actions;


export default navSlice.reducer;
