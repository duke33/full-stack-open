import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((n) => n.id === id);
      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      const updatedState = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      );
      return updatedState;
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});
export const { createAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
