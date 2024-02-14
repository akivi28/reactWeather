import { FETCH_WEATHER_FAILURE } from "./types";
import { FETCH_WEATHER_SUCCESS } from "./types";
import { FETCH_WEATHER_REQUEST } from "./types";
import axios from "axios";

const fetchWeatherRequest = () => ({
  type: FETCH_WEATHER_REQUEST,
});
const fetchWeatherSuccess = (weather) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: weather,
});
const fetchWeatherFailure = (error) => ({
  type: FETCH_WEATHER_FAILURE,
  payload: error,
});

export const fetchWeather = (city, country) => {
  const key = "5a59554ef6d44006200f6d8135292098";
  let queryString = `http://api.openweathermap.org/data/2.5/weather?q=${city}`;
  if (country && /\S/.test(country)) {
    queryString += `,${country}`;
  }
  queryString += `&appid=${key}`;

  return (dispatch) => {
    dispatch(fetchWeatherRequest());
    axios
      .get(queryString)
      .then((response) => {
        const weather = response.data;
        dispatch(fetchWeatherSuccess(weather));
      })
      .catch((error) => {
        dispatch(fetchWeatherFailure(error.message));
      });
  };
};
