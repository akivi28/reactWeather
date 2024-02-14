import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "./redux/actions";

const Weather = () => {
  const dispatch = useDispatch();
  const { loading, weather, error } = useSelector((state) => state);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const buttonClickHandler = () => {
    dispatch(fetchWeather(city, country));
    setCity("");
    setCountry("");
  };

  const inputChangeHandler = (event, setState) => {
    setState(event.target.value);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  const isDaytime = () => {
    const now = new Date().getTime() / 1000;
    return now > weather.sys.sunrise && now < weather.sys.sunset;
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div>
        <label className="form-label m-3">
          City
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => inputChangeHandler(e, setCity)}
          />
        </label>
        <label className="form-label m-3">
          Country
          <input
            type="text"
            className="form-control"
            value={country}
            onChange={(e) => inputChangeHandler(e, setCountry)}
          />
        </label>
        <button className="btn btn-primary m-3" onClick={buttonClickHandler}>Get the weather</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weather && weather.main && (
        <div className="bg-light w-50 rounded p-3 border border-primary">
          <h2>{weather.sys.country} {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Description: {weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="Weather Icon"
          />
          <p>Coordinates: {weather.coord.lat}, {weather.coord.lon}</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
          <p>Humidity: {weather.main.humidity}%</p>
          {isDaytime() ? (
            <img width={100} src="https://cdn-icons-png.flaticon.com/512/2939/2939886.png" alt="Sun Icon" />
          ) : (
              <img width={100} src="https://cdn-icons-png.flaticon.com/512/1299/1299469.png" alt="Moon Icon" />
          )}
          <p>Sunrise: {formatTime(weather.sys.sunrise)}</p>
          <p>Sunset: {formatTime(weather.sys.sunset)}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
