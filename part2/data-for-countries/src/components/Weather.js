import axios from "axios";
import React from "react";
const Weather = ({ cityForWeather, weather }) => {
  //
  //
  //

  //
  //
  //

  console.log("entra al weather al menos");
  console.log("cityForWeather: ", cityForWeather);
  console.log("weatherInfo: ", weather);
  console.log("weather.length: ", weather.length);
  console.log("El boolean de mierda: ", weather.length !== 0);

  if (weather.length !== 0) {
    console.log("ENTRA AL RENDERS");
    console.log("weatherInfo: ", weather);
    console.log("weatherInfo.location.name :", weather.location.name);
    return (
      <div>
        <h3> Weather in {weather.location.name} </h3>{" "}
        <p> Temperature {weather.current.temperature}° C </p>{" "}
        <img
          src={weather.current.weather_icons[0]}
          alt="Weather Icon"
          width={50}
        />{" "}
        <p>
          Wind: {weather.current.wind_speed}
          mph - direction {weather.current.wind_dir}{" "}
        </p>{" "}
      </div>
    );
  }
  return <p></p>;
};

export default Weather;
