import React, { useState, useEffect } from "react";
import { OPEN_KEY, UNSPLASH_KEY ,IP_KEY} from "./keycode";
import Unsplash, { toJson } from "unsplash-js";
import axios from "axios";

const unsplash = new Unsplash({accessKey: UNSPLASH_KEY});

const WeatherContext = React.createContext();

const WeatherProvider = (props) => {
  const [results, setResults] = useState([]);
  const [details, setDetails] = useState([]);
  const [picture, setPicture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchWords, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [tempUnit, settempUnit] = useState("F");
  const [isActive, setIsActive] = useState(false);
  const [chartData_cel, setChartData_cel] = useState({});
  const [chartData_fah, setChartData_fah] = useState({});
  

  // const loadWeather = async e => {
  //   setTimeout(()=>{
  //     fetch("https://ipgeolocation.io/signup/confirm.html?id=60d12ffe1b3f4297b3ade1a9faafd534")
  //       .then((response) => {
  //       response.json().then((data) => {
  //         console.log(data);
  //       setSearch(data.city);})
  //       .then(()=>{
  //         fetch(`https://api.unsplash.com/search/photos/?page=1&per_page=10&query=vancouver&client_id=${UNSPLASH_KEY}`)
  //         .then((response)=>{
  //         response.json().then((data) => { 
  //           setPicture(data.results[0].urls.regular);})
  //           .then(()=>{
  //             searchWeather();})
  //         },1500)
  //       })
  //     })
  //   })
  // }
  const loadWeather = async () => {
    setLoading(true);
    try {
    const currentPlace = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${IP_KEY}`
    );
    setSearch(currentPlace.data.city);

    const loadPicture = await axios.get(
      `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${currentPlace.data.city}&client_id=${UNSPLASH_KEY}`
    );
    setPicture(loadPicture.data.results[0].urls.regular);

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${currentPlace.data.city}&APPID=${OPEN_KEY}&units=metric`
    );
    setResults(response.data);

    const response2 = await axios(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&APPID=${OPEN_KEY}&units=metric`
    );
    setDetails(response2.data);

    const time = [];
      time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[1].dt,response.data.timezone));
      time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[4].dt,response.data.timezone));
      time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[7].dt,response.data.timezone));
      time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[10].dt,response.data.timezone));
      time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[13].dt,response.data.timezone));
      time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[16].dt,response.data.timezone));
      time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[19].dt,response.data.timezone));
      time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[22].dt,response.data.timezone));
  
      const temp_cel = [];
      temp_cel.push(Math.floor(response2.data.hourly[1].temp));
      temp_cel.push(Math.floor(response2.data.hourly[4].temp));
      temp_cel.push(Math.floor(response2.data.hourly[7].temp));
      temp_cel.push(Math.floor(response2.data.hourly[10].temp));
      temp_cel.push(Math.floor(response2.data.hourly[13].temp));
      temp_cel.push(Math.floor(response2.data.hourly[16].temp));
      temp_cel.push(Math.floor(response2.data.hourly[19].temp));
      temp_cel.push(Math.floor(response2.data.hourly[22].temp));
  
      const temp_fah = [];
      temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[1].temp)));
      temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[4].temp)));
      temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[7].temp)));
      temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[10].temp)));
      temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[13].temp)));
      temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[16].temp)));
      temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[19].temp)));
      temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[22].temp)));
  
      setChartData_cel({
        labels: time,
        datasets: [
          {
            label: 'tempareture(℃)',
            backgroundColor: 'rgb(255, 248, 248,0.4)',
            borderColor: 'rgb(255, 248, 248,1)',
            pointBorderColor: 'rgb(245, 239, 239)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 4,
            pointHoverBackgroundColor: 'black',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: temp_cel,
          }
        ],
      });
  
      setChartData_fah({
        labels: time,
        datasets: [
          {
            label: 'tempareture(℉)',
            backgroundColor: 'rgb(255, 248, 248,0.4)',
            borderColor: 'rgb(255, 248, 248,1)',
            pointBorderColor: 'rgb(245, 239, 239)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 4,
            pointHoverBackgroundColor: 'black',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: temp_fah,
          }
        ],
      });  
    setLoading(false);
    }catch (e) {
      setLoading(false);
      setError(true);
    }
  };
  
  const searchWeather = async() =>{
    setLoading(true);
    try {
      const response = await axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchWords}&APPID=${OPEN_KEY}&units=metric`
      );
      setResults(response.data);

      const response2 = await axios(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&APPID=${OPEN_KEY}&units=metric`
      );
      setDetails(response2.data);

      const time = [];
      time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[1].dt,response.data.timezone));
      time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[4].dt,response.data.timezone));
      time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[7].dt,response.data.timezone));
      time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[10].dt,response.data.timezone));
      time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[13].dt,response.data.timezone));
      time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[16].dt,response.data.timezone));
      time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[19].dt,response.data.timezone));
      time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[22].dt,response.data.timezone));
  
      const temp_cel = [];
      temp_cel.push(Math.floor(response2.data.hourly[1].temp));
      temp_cel.push(Math.floor(response2.data.hourly[4].temp));
      temp_cel.push(Math.floor(response2.data.hourly[7].temp));
      temp_cel.push(Math.floor(response2.data.hourly[10].temp));
      temp_cel.push(Math.floor(response2.data.hourly[13].temp));
      temp_cel.push(Math.floor(response2.data.hourly[16].temp));
      temp_cel.push(Math.floor(response2.data.hourly[19].temp));
      temp_cel.push(Math.floor(response2.data.hourly[22].temp));
  
      const temp_fah = [];
      temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[1].temp)));
      temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[4].temp)));
      temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[7].temp)));
      temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[10].temp)));
      temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[13].temp)));
      temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[16].temp)));
      temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[19].temp)));
      temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[22].temp)));
  
      setChartData_cel({
        labels: time,
        datasets: [
          {
            label: 'tempareture(℃)',
            backgroundColor: 'rgb(255, 248, 248,0.4)',
            borderColor: 'rgb(255, 248, 248,1)',
            pointBorderColor: 'rgb(245, 239, 239)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 4,
            pointHoverBackgroundColor: 'black',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: temp_cel,
          }
        ],
      });
  
      setChartData_fah({
        labels: time,
        datasets: [
          {
            label: 'tempareture(℉)',
            backgroundColor: 'rgb(255, 248, 248,0.4)',
            borderColor: 'rgb(255, 248, 248,1)',
            pointBorderColor: 'rgb(245, 239, 239)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 4,
            pointHoverBackgroundColor: 'black',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: temp_fah,
          }
        ],
      });  
      setLoading(false);
      setError(false);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  }

  const getPicture = () => {
    unsplash.search
    .photos(searchWords, 1)
    .then(toJson)
    .then(json => {
      let result = json.results[Math.floor(Math.random()*json.results.length)];
      if(!result){
        setPicture('https://images.unsplash.com/photo-1515446808777-87f69cb475aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
        setLoading(false);
      }else{
        setPicture(result.urls.regular);
        setLoading(false); 
      }
    });
  };

  const celciusToFahrenheit = celsius => {
    var cToFahr = celsius * 9 / 5 + 32;
    return cToFahr;
  }

  const ConvertUTCTimeToLocalTime=(dt,timezone)=>{
    let timetime = dt * 1000 + timezone * 1000;
    var convertdLocalTime = new Date(timetime);
    let hours = convertdLocalTime.getUTCHours();
    let minutes = convertdLocalTime.getUTCMinutes();
    
    return hours.toString().padStart(2, '0') + ':' +  
    minutes.toString().padStart(2, '0')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    searchWeather();
    getPicture();
    setIsActive(false);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const toggleUnits = () => {
    if(tempUnit ==='F'){
      settempUnit('C');
      setIsActive(true);
    }else{
      settempUnit('F');
      setIsActive(false);
    }
  }

  useEffect(() => {
    loadWeather();
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        loading,
        searchWords,
        results,
        details,
        picture,
        error,
        chartData_cel,
        chartData_fah,
        tempUnit,
        isActive,
        
        handleChange,
        handleSubmit,
        celciusToFahrenheit,
        toggleUnits,
        ConvertUTCTimeToLocalTime
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};
const WeatherConsumer = WeatherContext.Consumer;
export { WeatherProvider, WeatherConsumer, WeatherContext };