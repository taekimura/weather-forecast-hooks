import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { WeatherProvider } from "./context/WeatherContext";


ReactDOM.render(
  <WeatherProvider>
    <App />
  </WeatherProvider>,
  document.querySelector("#root")
);
