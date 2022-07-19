import React from "react";
import { iCoursePart } from "../App";

const Total = ({ courseParts }: iCoursePart) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;
