import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state = action.payload;
    },
    clearMessage: (state) => {
      state = {};
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;

export const selectMessage = (state) => state.message;

export default messageSlice.reducer;
