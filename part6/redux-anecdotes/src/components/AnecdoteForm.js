import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, clearNotification } from "../reducers/messageReducer";

import { useDispatch } from "react-redux";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(anecdote));
    dispatch(setNotification(`You created: "${anecdote}"`));
    setTimeout(() => {
      dispatch(clearNotification());
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
