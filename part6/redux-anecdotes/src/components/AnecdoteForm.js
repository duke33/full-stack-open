import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { newAnecdoteMessage, emptyMessage } from "../reducers/messageReducer";
import anecdoteService from "../services/anecdotes";

import { useDispatch } from "react-redux";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(anecdote));
    dispatch(newAnecdoteMessage(anecdote));
    setTimeout(() => {
      dispatch(emptyMessage());
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create </button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
