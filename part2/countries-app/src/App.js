import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchResult from "./components/SearchResult";
import Filter from "./components/Filter";

const App = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCountryList = () => {
    console.log("countryEffect");
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        console.log("Country promise fulfilled");
        setAllCountries(response.data);
        console.log("response.data", response.data);
      })
      .catch((err) => {
        console.log("no response from restcountries api");
      });
  };

  useEffect(fetchCountryList, []);

  //Handlers

  return (
    <div>
      <Filter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
        allCountries={allCountries}
      />
      <SearchResult
        searchTerm={searchTerm}
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
      />
      <div></div>
    </div>
  );
};

export default App;
