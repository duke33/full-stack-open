import React from "react";
import Country from "./CountryInfo";

const searchResult = ({
  searchTerm,
  selectedCountries,
  setSelectedCountries,
}) => {
  let countriesListToRender =
    selectedCountries.length <= 10 ? (
      <ul>
        {selectedCountries.map((country) => (
          <li key={country.name.common}>
            {country.name.common}
            <button
              onClick={() => {
                console.log("country set from button:", country);
                setSelectedCountries([country]);
              }}
            >
              show
            </button>
          </li>
        ))}
      </ul>
    ) : (
      "Too many Matches, specify another filter"
    );

  let toBeRendered =
    selectedCountries.length === 1 ? (
      <Country country={selectedCountries[0]} />
    ) : (
      countriesListToRender
    );

  console.log("toBeRendered", toBeRendered);

  return <div>{searchTerm === "" ? "" : toBeRendered}</div>;
};

export default searchResult;
