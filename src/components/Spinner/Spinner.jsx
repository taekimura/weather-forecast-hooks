import React, { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";

import './Spinner.styles.scss';

export default function Spinner(){
  const appContext = useContext(WeatherContext);
  const { searchWords } = appContext;
  
  return(
  <div className = 'SpinnerOverlay'>
      <div className="loading-message">Loading {searchWords} weather...</div>
      <div className= 'SpinnerContainer'></div>
  </div>
  )         
};