import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  //Server data Effect Hook

  const hook = () => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  console.log("render", persons.length, "notes");

  //Handlers

  const addPerson = (event) => {
    event.preventDefault();

    const found = persons.some(
      (element) => element.name.toUpperCase() === newName.toUpperCase()
    );
    found
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat({ name: newName, number: newNumber }));

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    // console.log("newName", newName);
    // console.log("event.target.value de handlenamechange", event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handlSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <h2> Phonebook </h2>
      <Filter handler={handlSearchChange} /> <h2> add a new </h2>{" "}
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />{" "}
      <h2> Numbers </h2>{" "}
      <div>
        <Persons arrayOfpersons={persons} searchTerm={newSearch} />
      </div>
    </div>
  );
};

export default App;
