import axios from "axios";
import Weather from "./Weather";

import React, { useState, useEffect } from "react";

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY;
  //The Effect Hook for Weather
  const weatherHook = () => {
    console.log("weatherEffect");
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      )
      .then((response) => {
        console.log("Weather promise fulfilled");
        setWeather(response.data);
        console.log(response.data);
      });
  };
  useEffect(weatherHook, []);
  console.log("weatherInfoAfterHook:", weather);

  return (
    <div>
      <h1> {country.name} </h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul type="circle">
        {country.languages.map((language) => (
          <li key={language.name}>{language.name} </li>
        ))}
        <img src={country.flag} alt="flag" width={200} />
      </ul>
      <Weather cityForWeather={country.capital} weather={weather} />
    </div>
  );
};

export default CountryInfo;
