import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import backendCom from "./services/backendCom";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState();
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    backendCom.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = { name: newName, number: newNumber };
    console.log("newPerson: ", newPerson);

    const found = persons.find(
      (element) => element.name.toUpperCase() === newName.toUpperCase()
    );

    console.log("found::", found);
    if (found) {
      let confirmationMessage = window.confirm(
        `${newPerson.name} is already added to phonebook, replace the older numberl with a new one? ?`
      );
      if (confirmationMessage) {
        backendCom.replacePhoneNumber(found, newPerson).then((result) => {
          console.log("result que da problema", result);
          console.log(
            "el array que debe estar dando problemas", //aca esta el problema, el nuevo usuario da undefined
            persons.map(
              (person) => (person.id !== found.id ? person : result) //oseas result.data esta undefined. Revisar que esta pasando con los IDs, se supone que ni tienen que cambiar
            )
          );
          setPersons(
            persons.map((person) => (person.id !== found.id ? person : result))
          ); //TODO
        });
        return;
        //const result = words.filter(word => word.length > 6);
        //   .then((result) => {
        //   console.log("type of result", typeof result);
        //   console.log("esto es result", result);
        // });
        // setNotes(notes.map(note => note.id !== id ? note : response.data))
      } else {
        return;
      }
    }

    backendCom
      .createNewPerson(newPerson)
      .then((returndPersonAddedResponse) =>
        setPersons(persons.concat(returndPersonAddedResponse))
      );

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handlSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  const deleteButton = (id) => {
    let confirmationMessage = window.confirm(
      `Delete ${persons.find((x) => x.id === id).name} ?`
    );
    console.log("mensaje de confirmacion:::", confirmationMessage);
    if (confirmationMessage) {
      backendCom.deletePerson(id).then((result) => {
        console.log("type of result", typeof result);
        console.log("esto es result", result);
      });
      // setAllPersons(allPersons.filter(person => person.id !== personId))
      setPersons(persons.filter((person) => person.id !== id));
      // console.log(id);
    }
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
        setPersons={setPersons}
      />
      <h2>Numbers</h2>
      <div>
        <Persons
          arrayOfpersons={persons}
          searchTerm={newSearch}
          deleteButton={deleteButton}
        />
      </div>
    </div>
  );
};

export default App;
