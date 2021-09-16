import React from "react";

const Persons = ({ arrayOfpersons, searchTerm, deleteButton }) => {
  if (typeof arrayOfpersons === "undefined") {
    return <p> </p>;
  }

  const arrayToBeRendered =
    //Este operador ternario devuelve el array completo si no hay termino de busqueda, si HAY termino de busqueda, va a devolver un filtrado del array en base a ese termino.
    searchTerm === ""
      ? arrayOfpersons
      : arrayOfpersons.filter((person) =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <ul>
      {" "}
      {arrayToBeRendered.map((person) => (
        <li key={person.name}>
          {" "}
          {person.name} {person.number}{" "}
          <button onClick={() => deleteButton(person.id)}> Delete </button>{" "}
        </li>
      ))}{" "}
    </ul>
  );
};

export default Persons;
