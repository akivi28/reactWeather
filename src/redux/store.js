import { createStore, applyMiddleware } from "redux";
import weatherReducer from "./reducer";
import { thunk } from "redux-thunk";

const store = createStore(weatherReducer, applyMiddleware(thunk));

export default store;
