import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import messageReducer from "./reducers/messageReducer";

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    message: messageReducer,
    filter: filterReducer,
  },
});

export default store;
