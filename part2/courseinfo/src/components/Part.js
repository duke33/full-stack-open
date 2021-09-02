import React from "react";
const Part = ({ parts }) => {
  return parts.map((part) => (
    <p key={part.name}> {part.name + " " + part.exercises} </p>
  ));
};

export default Part;
