import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import backendCom from "./services/backendCom";
import "./index.css";
import Notification from "./components/Notification";
import ErrorMsg from "./components/ErrorMsg";

const App = () => {
  const [persons, setPersons] = useState();
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [succesMessage, setSuccesMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    backendCom.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    const found = persons.find(
      (element) => element.name.toUpperCase() === newName.toUpperCase()
    );

    if (found) {
      let confirmationMessage = window.confirm(
        `${newPerson.name} is already added to phonebook, replace the older numberl with a new one? ?`
      );
      if (confirmationMessage) {
        backendCom
          .replacePhoneNumber(found, newPerson)
          .then((result) => {
            console.log("result que no anda: ", result); //TODO aca vas a tener que cambiar algo mas adelante
            setPersons(
              persons.map((person) =>
                person.id !== found.id ? person : result
              )
            );

            setSuccesMessage(
              `Number succesfully changed to ${newPerson.number}`
            );

            setTimeout(() => {
              setSuccesMessage(null);
            }, 5000);
          })

          .catch((error) => {
            console.log("entro al error que yo queria!!!!");
            console.log("error: ", error);
            setErrorMessage(
              `Information of '${newPerson.name}' has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            // setNotes(notes.filter((n) => n.id !== id));
          });

        return;
      } else {
        return;
      }
    }

    backendCom
      .createNewPerson(newPerson)
      .then((returndPersonAddedResponse) =>
        setPersons(returndPersonAddedResponse)
      );
    setSuccesMessage(`Added ${newPerson.name}`);

    setTimeout(() => {
      setSuccesMessage(null);
    }, 5000);

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
    const personToBeDeleted = persons.find((x) => x.id === id).name;
    let confirmationMessage = window.confirm(`Delete ${personToBeDeleted} ?`);
    if (confirmationMessage) {
      backendCom.deletePerson(id).then((result) => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };
  return (
    <div>
      <h2> Phonebook </h2>
      <Notification message={succesMessage} />
      <ErrorMsg message={errorMessage} />
      <Filter handler={handlSearchChange} /> <h2> add a new </h2>{" "}
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        setPersons={setPersons}
      />{" "}
      <h2> Numbers </h2>{" "}
      <div>
        <Persons
          arrayOfpersons={persons}
          searchTerm={newSearch}
          deleteButton={deleteButton}
        />{" "}
      </div>{" "}
    </div>
  );
};

export default App;
