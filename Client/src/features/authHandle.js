import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
};

const authHandle = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = action.payload ? true : false;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authHandle.actions;

export default authHandle.reducer;
