import { FETCH_WEATHER_FAILURE } from "./types";
import { FETCH_WEATHER_SUCCESS } from "./types";
import { FETCH_WEATHER_REQUEST } from "./types";

const initialWeatherState = {
  loading: false,
  weather: {},
  error: "",
};

const weatherReducer = (state = initialWeatherState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_WEATHER_SUCCESS:
      return {
        loading: false,
        weather: action.payload,
        error: "",
      };
    case FETCH_WEATHER_FAILURE:
      return {
        loading: false,
        weather: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;
