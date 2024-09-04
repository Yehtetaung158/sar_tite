import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDropDownOpen: false,
  mode: false,
  isPeopleDetail: false,
  currentPeopleId: null,
  currentUid: null,
  currentUser: null,
  currentMessagePeople: null,
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setIsDropDwonOpen(state, action) {
      state.isDropDownOpen = action.payload;
    },
    setDarkMode(state, action) {
      state.mode = action.payload;
    },
    setisPeopleDetail(state, action) {
      state.isPeopleDetail = action.payload;
    },
    setcurrentPeopleId(state, action) {
      state.currentPeopleId = action.payload;
    },
    setCurrentUid(state, action) {
      state.currentUid = action.payload;
    },
    setCurrentUser(state, action) {
      const user = action.payload;

      // Convert non-serializable values (like Firestore Timestamp) to serializable formats
      state.currentUser = {
        ...user,
        lastLogin: user?.lastLogin ? user.lastLogin.toDate().toISOString() : null,
      };
    },
    setcurrentMessagePeople(state, action) {
      state.currentMessagePeople = action.payload;
    },
  },
});

export const {
  setcurrentMessagePeople,
  setCurrentUser,
  setCurrentUid,
  setIsDropDwonOpen,
  setDarkMode,
  setisPeopleDetail,
  setcurrentPeopleId,
} = navSlice.actions;

export default navSlice.reducer;
