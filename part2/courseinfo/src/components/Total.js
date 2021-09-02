import React from "react";

const Total = ({ parts }) => {
  return (
    <p>
      Total of{" "}
      {parts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercises,
        0
      )}{" "}
      exercises
    </p>
  );
};

export default Total;
