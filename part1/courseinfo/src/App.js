import React from "react";
//Header takes care of rendering the name of the course, Content renders the parts and their number of exercises and Total renders the total number of exercises

const Header = (props) => {
  return <h1> {props.course} </h1>;
};

const Part = (props) => {
  const banana = props.parts.map((value) => (
    <p> {value.name + " " + value.exercises} </p>
  ));
  return banana;
};
const Total = (props) => {
  //props.parts[0].exercises;
  return (
    " " +
    props.parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises,
      0
    )
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",

    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };
  return (
    <div>
      <Header course={course.name} />
      <Part parts={course.parts} />

      <p>
        Total
        <Total parts={course.parts} />
      </p>
    </div>
  );
};

export default App;
