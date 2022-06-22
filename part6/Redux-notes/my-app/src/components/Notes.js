import React from "react";
import { toggleImportanceOf } from "../reducers/noteReducer";
import { useSelector, useDispatch } from "react-redux";

const Notes = () => {
  const Note = ({ note, handleClick }) => {
    return (
      <li key={note.id} onClick={handleClick}>
        {note.content} <strong>{note.important ? "important" : ""}</strong>
      </li>
    );
  };

  const dispatch = useDispatch();
  const notes = useSelector((state) => state);

  return (
    <div>
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            handleClick={() => {
              dispatch(toggleImportanceOf(note.id));
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default Notes;
