import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";
import messageReducer from "./reducers/messageReducer";

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    message: messageReducer,
  },
});

export default store;
