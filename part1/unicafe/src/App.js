import React, { useState } from "react";

const Button = ({ handleClick, label }) => {
  return <button onClick={handleClick}> {label} </button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ allVotes, good, neutral, bad, average, positive }) => {
  if (allVotes === 0) {
    return <h1> No feedback Given </h1>;
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={allVotes} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const allVotes = bad + good + neutral;
  const average = (bad * -1 + good) / allVotes;
  const positive = (good / allVotes) * 100;

  const setValue = (vote, SpecificHandler) => {
    const handler = () => {
      SpecificHandler(vote + 1);
    };
    return handler;
  };

  return (
    <div>
      <h1> Give Feedback </h1>
      <Button label="good" handleClick={setValue(good, setGood)} />
      <Button label="neutral" handleClick={setValue(neutral, setNeutral)} />
      <Button label="bad" handleClick={setValue(bad, setBad)} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        allVotes={allVotes}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
