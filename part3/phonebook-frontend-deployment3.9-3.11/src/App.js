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
    // This validation was from a previous exercise, now validation is carried by backend
    // if (!newPerson.name) {
    //   setErrorMessage(`You must provide a contact name`);
    //   setTimeout(() => {
    //     setErrorMessage(null);
    //   }, 5000);
    //   return;
    // }

    // if (!newPerson.number) {
    //   setErrorMessage(`You must provide a phone number`);
    //   setTimeout(() => {
    //     setErrorMessage(null);
    //   }, 5000);
    //   return;
    // }

    // const found = persons.find(
    //   (element) => element.name.toUpperCase() === newName.toUpperCase()
    // );

    // if (found) {
    //   let confirmationMessage = window.confirm(
    //     `${newPerson.name} is already added to phonebook, replace the older numberl with a new one? ?`
    //   );
    //   if (confirmationMessage) {
    //     backendCom
    //       .replacePhoneNumber(found, newPerson)
    //       .then((result) => {
    //         console.log("result que no anda: ", result);
    //         setPersons(
    //           persons.map((person) => {
    //             return person.id !== found.id
    //               ? person
    //               : { ...person, number: newPerson.number };
    //           })
    //         );

    //         setSuccesMessage(
    //           `Number succesfully changed to ${newPerson.number}`
    //         );
    //         setNewName("");
    //         setNewNumber("");

    //         setTimeout(() => {
    //           setSuccesMessage(null);
    //         }, 5000);
    //       })

    //       .catch((error) => {
    //         console.log("entro al error que yo queria!!!!");
    //         console.log("error: ", error);
    //         setErrorMessage(
    //           `Information of '${newPerson.name}' has already been removed from server`
    //         );
    //         setTimeout(() => {
    //           setErrorMessage(null);
    //         }, 5000);
    //         // setNotes(notes.filter((n) => n.id !== id));
    //       });

    //     return;
    //   } else {
    //     return;
    //   }
    // }

    backendCom
      .createNewPerson(newPerson)
      .then((returndPersonAddedResponse) => {
        setSuccesMessage(`Added ${newPerson.name}`);

        setTimeout(() => {
          setSuccesMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
        setPersons(persons.concat(returndPersonAddedResponse));
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  const deleteButton = (id) => {
    console.log("A ver si loguea este id que lo necesito!!!::::", id);
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
      <Filter handler={handleSearchChange} /> <h2> add a new contact </h2>{" "}
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
