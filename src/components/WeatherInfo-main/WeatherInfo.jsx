import React, { useContext } from "react";
import ReactAnimatedWeather from 'react-animated-weather';
import { WeatherContext } from "../../context/WeatherContext";
import { dateBuilder } from '../../Utils/datebuilder';
import { getIcon } from "../../Utils/getIcon";

import "./WeatherInfo.styles.scss";

export default function WeatherInfo() {
  const appContext = useContext(WeatherContext);
  const { results, isActive, celciusToFahrenheit, } = appContext;
  
  return (
    <>
    {!isActive ? (
      <div className="weatherState">
       <div className="location" >
         <h1 className='namename'>{`${results.name} , ${results.sys.country}`}</h1>
       </div>
       <div className="date">
         {dateBuilder(results.dt,results.timezone)}
       </div>
       <div className="weatherImg">
        <ReactAnimatedWeather
          icon={getIcon(results.weather[0].id)}
          color={'white'}
          size={100}
          animate={true}
        />
       </div>
       <div className="weatherdescription">
         <h3>{results.weather[0].description}</h3>
       </div>
       <div className="degree">
         <h3>{Math.floor(results.main.temp)}°C </h3>
       </div>
      </div>   
    ) : (
      <div className="weatherState">
       <div className="location" >
         <h1 className='namename'>{`${results.name} , ${results.sys.country}`}</h1>
       </div>
       <div className="date">
       {dateBuilder(results.dt,results.timezone)}
       </div>
       <div className="weatherImg">
        <ReactAnimatedWeather
          icon={getIcon(results.weather[0].id)}
          color={'white'}
          size={100}
          animate={true}
        />
       </div>
       <div className="weatherdescription">
         <h3>{results.weather[0].description}</h3>
       </div>
       <div className="degree">
         <h3>{Math.floor(celciusToFahrenheit(results.main.temp))}°F</h3>
       </div>
      </div>
    )} 
    </>
  );
}
