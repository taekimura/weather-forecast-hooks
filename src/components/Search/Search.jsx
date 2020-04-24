import React, { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import ConvertTempButton from '../SwitchUnit/ToggleUnit';
import './Search.styles.scss'

export default function Search() {
  const appContext = useContext(WeatherContext);
  const { error, handleSubmit, handleChange ,tempUnit} = appContext;
  return (
    <>
    <div className="container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>{error ? showError() : ""}</div>
          <div className="row">
            <div className="colum">
            <div className='toggle-2'> <ConvertTempButton tempUnit={tempUnit}/></div>
              <input 
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Enter city"
                className="form"
                name="searhWords"
                autoComplete="off"
              />
              <button className="searchbtn" type="submit">
              Search
              </button>
            </div>
            {/* <div className="col-md-3">
              <input 
                onChange={value.handleChange}
                type="text"
                className="form"
                placeholder="Country"
                name="country"
                autoComplete="off"
              />
            </div> */}
          </div>
        </form>
      </div>
    </>    
  );
}
const showError = () => {
  return (
    <div className="alert" height='20px'>  
      Invalid name... Please Enter City and Country again.
    </div>
  );
};