import React, { useState, useEffect } from "react";
import axios from "axios";
import Content from "./components/Content";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  //The Effect Hook for Countries

  const hook = () => {
    console.log("countryEffect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("Country promise fulfilled");
      setAllCountries(response.data);
      console.log("response.data",response.data);
    }).catch((err)=>{console.log('no response from restcountries api')});
  };

  useEffect(hook, []);

  //Handlers

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    if (newFilter) {
      const regex = new RegExp(newFilter, "i");

      console.log('regex: ', regex)

      const filteredCountries = () =>
        allCountries.filter((country) => country.name.common.match(regex));
        
      setCountries(filteredCountries);
    }
  };

  console.log("newFilter::", newFilter);
  console.log("Boolean(newFilter)", Boolean(newFilter));

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Content countries={countries} setCountries={setCountries} />
      <div></div>
    </div>
  );
};

export default App;
