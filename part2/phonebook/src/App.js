import React, { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

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
      <Filter handler={handlSearchChange} />
      <h2>add a new </h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        <Persons arrayOfpersons={persons} searchTerm={newSearch} />
      </div>
    </div>
  );
};

export default App;
