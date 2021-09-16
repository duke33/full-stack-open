import React from "react";
import Header from "./Header";
import Part from "./Part";
import Total from "./Total";

const Courses = ({ courses }) => (
  <div>
    {courses.map((course) => (
      <div key={course.id}>
        {console.log("unique key", course.id)}
        <Header courseName={course.name} />
        <Part parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))}
  </div>
);

export default Courses;
