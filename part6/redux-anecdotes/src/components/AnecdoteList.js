import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/messageReducer";

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
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(voteAnecdote(anecdote.id));
                dispatch(
                  setNotification(`You voted for: "${anecdote.content}"`, 5)
                );
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
