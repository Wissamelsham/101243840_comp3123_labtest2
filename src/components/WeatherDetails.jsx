import React, { useState } from 'react';
import { useWeatherContext } from "../contexts/WeatherContext";
import { TodayInfo } from "./InfoSide/TodayInfo";
import { WeekInfo } from "./InfoSide/WeekInfo";
 
const WeatherDetails  =()=> {

  const { weather, setSearchKey } = useWeatherContext();

  const [query, setQuery] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
        setSearchKey(query)
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className='app'>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div className='content'>
            <div className='today-details'>
            <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>            
            </div>
            <div className="weather-box">
                <div className="temp">
                {Math.round(weather.main.temp )}°F
                </div>
                <div className="weather">{weather.weather[0].main}</div>
                <div className="date">{dateBuilder(new Date())}</div>
            </div>
            </div>          
          <div className="info-side">
                <TodayInfo />
                <WeekInfo />
            </div>          
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default WeatherDetails;
