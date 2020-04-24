import React, { useContext } from "react";
import { WeatherContext } from "./context/WeatherContext";
import Search from "./components/Search/Search";
import WeatherInfo from "./components/WeatherInfo-main/WeatherInfo";
import WeatherDetails from "./components/WeatherDetails-side/WeatherDetails";
import Spinner from './components/Spinner/Spinner';
import Chart from './components/Linegraph/linegraph';
import Unsplash from './components/Unsplash/locationpic.component';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const appContext = useContext(WeatherContext);
  const { results, details, loading, picture, chartData_cel,chartData_fah, hourlyTime, ConvertUTCTimeToLocalTime} = appContext;
  return (
    <>
      {loading ? (
        <div className="bigbox">
          <Spinner/>
        </div>
      ) : (
        <div className="bigbox">
          <div className="App">
            <Unsplash picture={picture}/>
              <div className="box">
                <Search />
                <WeatherInfo results={results}/>
                <Chart chartData_cel={chartData_cel} chartData_fah={chartData_fah} hourlyTime={hourlyTime} details={details} results={results} ConvertUTCTimeToLocalTime={ConvertUTCTimeToLocalTime}/>
              </div>
          </div>
          <div className="sidebox">
            <WeatherDetails results={results} details={details}/>
          </div>
        </div>
      )}
    </>
  );
}
export default App;
