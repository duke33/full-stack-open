import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    newAnecdoteMessage(state, action) {
      const anecdote = action.payload;
      const message = `You created: "${anecdote}"`;
      return message;
    },
    voteMessage(state, action) {
      const anecdote = action.payload;
      const message = `You voted for: "${anecdote}"`;
      return message;
    },
    emptyMessage(state, action) {
      return "";
    },
  },
});
export const { newAnecdoteMessage, voteMessage, emptyMessage } =
  messageSlice.actions;

export default messageSlice.reducer;
