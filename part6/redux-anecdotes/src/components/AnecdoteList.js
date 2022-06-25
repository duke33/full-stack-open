import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { voteMessage, emptyMessage } from "../reducers/messageReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdote);

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  // const filter = useSelector((state) => state.filter);
  // const filteredAnecdotes = sortedAnecdotes.filter((anecdote) => {
  //   return anecdote.content.includes(filter);
  // });

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(voteAnecdote(anecdote.id));
                dispatch(voteMessage(anecdote.content));
                setTimeout(() => {
                  dispatch(emptyMessage());
                }, 5000);
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
