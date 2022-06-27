import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
    appendVote(state, action) {
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
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content);
    dispatch(appendNote(newAnecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    await anecdoteService.voteAnecdoteDB(id);
    dispatch(appendVote(id));
  };
};

export const { setAnecdotes, appendNote, appendVote } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
