import React ,{ useContext } from 'react';
import { WeatherContext } from "../../context/WeatherContext";
import './ToggleUnit.styles.scss';

export default function ConvertTempButton(){
  const appContext = useContext(WeatherContext);
  const { toggleUnits,isActive } = appContext;

  const unitToggle = isActive === true ? 'fahrenheit' : 'celsius';
  return (
    <div className="button">
      <div 
      onClick={toggleUnits}
      className="convert__animation"
      >
        <p className='unit'>°F</p><p className='unit'>°C</p>
        <span className={unitToggle}></span>
      </div>
    </div>
  );
}

