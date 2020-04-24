import React, { useContext } from "react";
import ReactAnimatedWeather from 'react-animated-weather';
import { getIcon } from "../../Utils/getIcon";
import { WeatherContext } from "../../context/WeatherContext";
import ConvertTempButton from '../SwitchUnit/ToggleUnit';
import { getDayOftheWeek } from '../../Utils/datebuilder';
import "./WeatherDetails.styles.scss";

export default function WeatherDetails() {
  const appContext = useContext(WeatherContext);
  const { results, details, tempUnit, celciusToFahrenheit, isActive, ConvertUTCTimeToLocalTime} = appContext;
  
  return (
    <>
    <div className='titlebar'>
      <div className='title'>
        <div className='live'>Weather forecast</div>
        <div className='toggle'> <ConvertTempButton tempUnit={tempUnit}/></div>
      </div>
    </div> 
    {!isActive ? (
      <>
      <div className='tate'>
      <p className="subtitle">Weather details</p>
      <table className='todaysDetails'>
      <tbody>
        <tr>
          <td className='d'>High</td><td>:</td><td  className='d'>{Math.floor(results.main.temp_max)} &#8451;</td>
        </tr>
        <tr>
        <td className='d'>Low</td><td>:</td><td className='d'>{Math.floor(results.main.temp_min)} &#8451;</td>
        </tr>
        <tr>
          <td className='d'>Pressure</td><td>:</td><td className='d'>{results.main.pressure} hpa</td>
        </tr>
        <tr>
          <td className='d'>Humidity</td><td>:</td><td className='d'>{results.main.humidity} &#37;</td>
        </tr>
        <tr>
          <td className='d'>Wind</td><td>:</td><td className='d'>{results.wind.speed} m/s</td>
        </tr>
        <tr>
          <td className='d'>Sunrise</td><td>:</td><td className='d'>{ConvertUTCTimeToLocalTime(results.sys.sunrise,results.timezone)} </td>
        </tr>
        <tr>
          <td className='d'>Sunset</td><td>:</td><td className='d'>{ConvertUTCTimeToLocalTime(results.sys.sunset,results.timezone)} </td>
        </tr>
      </tbody>
      </table>  
      </div>
   
      <div className='tate2'>
       <p className="subtitle2">Next days</p>  
        <table className='todaysDetails'>
        <tbody>
          <tr>
            <td className='t'>{getDayOftheWeek(details.daily[1].dt,results.timezone)}</td>
            <td className='icon'>
              <ReactAnimatedWeather
                icon={getIcon(details.daily[1].weather[0].id)}
                color={'gray'}
                size={25}
                animate={true}
              />
            </td>
            <td className='t'>{Math.floor(details.daily[1].temp.day)} °C </td>
          </tr>
          <tr>
            <td className='t'>{getDayOftheWeek(details.daily[2].dt,results.timezone)}</td>
            <td className='icon'>
              <ReactAnimatedWeather
                icon={getIcon(details.daily[2].weather[0].id)}
                color={'gray'}
                size={25}
                animate={true}
              />
            </td>
            <td className='t'>{Math.floor(details.daily[2].temp.day)} °C </td>
          </tr>
          <tr>
            <td className='t'>{getDayOftheWeek(details.daily[3].dt,results.timezone)}</td>
            <td className='icon'>
              <ReactAnimatedWeather
                icon={getIcon(details.daily[3].weather[0].id)}
                color={'gray'}
                size={25}
                animate={true}
              />
            </td>
            <td className='t'>{Math.floor(details.daily[3].temp.day)} °C </td>
          </tr>
          <tr>
            <td className='t'>{getDayOftheWeek(details.daily[4].dt,results.timezone)}</td>
            <td className='icon'>
              <ReactAnimatedWeather
                icon={getIcon(details.daily[4].weather[0].id)}
                color={'gray'}
                size={25}
                animate={true}
              />
            </td>
            <td className='t'>{Math.floor(details.daily[4].temp.day)} °C </td>
          </tr>
          <tr>
            <td className='t'>{getDayOftheWeek(details.daily[5].dt,results.timezone)}</td>
            <td className='icon'>
              <ReactAnimatedWeather
                icon={getIcon(details.daily[5].weather[0].id)}
                color={'gray'}
                size={25}
                animate={true}
              />
            </td>
            <td className='t'>{Math.floor(details.daily[5].temp.day)} °C </td>
          </tr>
          <tr>
            <td className='t'>{getDayOftheWeek(details.daily[6].dt,results.timezone)}</td>
            <td className='icon'>
             <ReactAnimatedWeather
                icon={getIcon(details.daily[6].weather[0].id)}
                color={'gray'}
                size={25}
                animate={true}
              />
            </td>
            <td className='t'>{Math.floor(details.daily[6].temp.day)} °C </td>
          </tr>
          <tr>
            <td className='t'>{getDayOftheWeek(details.daily[7].dt,results.timezone)}</td>
            <td className='icon'>
              <ReactAnimatedWeather
                icon={getIcon(details.daily[7].weather[0].id)}
                color={'gray'}
                size={25}
                animate={true}
              />
            </td>
            <td className='t'>{Math.floor(details.daily[7].temp.day)} °C </td>
          </tr>
        </tbody>
        </table>  
      </div>
   </>
  ) : (
      <>
      <div className='tate'>
        <p className="subtitle">Weather details</p>
        <table className='todaysDetails'>
          <tbody>
            <tr>
              <td className='d'>High</td><td>:</td><td  className='d'>{Math.floor(celciusToFahrenheit(results.main.temp_max))}°F</td>
            </tr>
            <tr>
            <td className='d'>Low</td><td>:</td><td className='d'>{Math.floor(celciusToFahrenheit(results.main.temp_min))}°F</td>
            </tr>
            <tr>
              <td className='d'>Pressure</td><td>:</td><td className='d'>{results.main.pressure} hpa</td>
            </tr>
            <tr>
              <td className='d'>Humidity</td><td>:</td><td className='d'>{results.main.humidity} &#37;</td>
            </tr>
            <tr>
              <td className='d'>Wind</td><td>:</td><td className='d'>{results.wind.speed} m/s</td>
            </tr>
            <tr>
              <td className='d'>Sunrise</td><td>:</td><td className='d'>{ConvertUTCTimeToLocalTime(results.sys.sunrise,results.timezone)} </td>
            </tr>
            <tr>
              <td className='d'>Sunset</td><td>:</td><td className='d'>{ConvertUTCTimeToLocalTime(results.sys.sunset,results.timezone)} </td>
            </tr>
          </tbody>
          </table>  
      </div>
   
      <div className='tate2'>
       <p className="subtitle2">Next days</p>  
       <table className='todaysDetails'>
       <tbody>
        <tr>
          <td className='t'>{getDayOftheWeek(details.daily[1].dt,results.timezone)}</td>
          <td>
            <td className='icon'>
              <ReactAnimatedWeather
                icon={getIcon(details.daily[1].weather[0].id)}
                color={'gray'}
                size={25}
                animate={true}
              />
            </td>
          </td>
          <td className='t'>{Math.floor(celciusToFahrenheit(details.daily[1].temp.day))} °F </td>
        </tr>
        <tr>
          <td className='t'>{getDayOftheWeek(details.daily[2].dt,results.timezone)}</td>
          <td>
          <td className='icon'>
              <ReactAnimatedWeather
                icon={getIcon(details.daily[2].weather[0].id)}
                color={'gray'}
                size={25}
                animate={true}
              />
            </td>
          </td>
          <td className='t'>{Math.floor(celciusToFahrenheit(details.daily[2].temp.day))} °F </td>
        </tr>
        <tr>
          <td className='t'>{getDayOftheWeek(details.daily[3].dt,results.timezone)}</td>
          <td>
            <td className='icon'>
              <ReactAnimatedWeather
                icon={getIcon(details.daily[3].weather[0].id)}
                color={'gray'}
                size={25}
                animate={true}
              />
            </td>
          </td>
          <td className='t'>{Math.floor(celciusToFahrenheit(details.daily[3].temp.day))} °F </td>
        </tr>
        <tr>
          <td className='t'>{getDayOftheWeek(details.daily[4].dt,results.timezone)}</td>
          <td>
            <td className='icon'>
              <ReactAnimatedWeather
                icon={getIcon(details.daily[4].weather[0].id)}
                color={'gray'}
                size={25}
                animate={true}
              />
            </td>
          </td>
          <td className='t'>{Math.floor(celciusToFahrenheit(details.daily[4].temp.day))} °F </td>
        </tr>
        <tr>
          <td className='t'>{getDayOftheWeek(details.daily[5].dt,results.timezone)}</td>
          <td>
            <td className='icon'>
              <ReactAnimatedWeather
                icon={getIcon(details.daily[5].weather[0].id)}
                color={'gray'}
                size={25}
                animate={true}
              />
            </td>
          </td>
          <td className='t'>{Math.floor(celciusToFahrenheit(details.daily[5].temp.day))} °F </td>
        </tr>
        <tr>
          <td className='t'>{getDayOftheWeek(details.daily[6].dt,results.timezone)}</td>
          <td>
          <td className='icon'>
              <ReactAnimatedWeather
                icon={getIcon(details.daily[6].weather[0].id)}
                color={'gray'}
                size={25}
                animate={true}
              />
            </td>
          </td>
          <td className='t'>{Math.floor(celciusToFahrenheit(details.daily[6].temp.day))} °F </td>
        </tr>
        <tr>
          <td className='t'>{getDayOftheWeek(details.daily[7].dt,results.timezone)}</td>
          <td className='icon'>
              <ReactAnimatedWeather
                icon={getIcon(details.daily[7].weather[0].id)}
                color={'gray'}
                size={25}
                animate={true}
              />
          </td>
          <td className='t'>{Math.floor(celciusToFahrenheit(details.daily[7].temp.day))} °F </td>
        </tr>
      </tbody>
      </table>  
   </div>
   </>
  )} 
  </>
  );
}