import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setNotification(state, action) {
      const message = action.payload;
      return message;
    },
    clearNotification(state, action) {
      return "";
    },
  },
});
export const { newAnecdoteMessage, setNotification, clearNotification } =
  messageSlice.actions;

export default messageSlice.reducer;
