import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const WeatherContext = createContext();

export const useWeatherContext = () => useContext(WeatherContext);

export const WeatherProvider = (props) => {
  const key = "e00ecd89ab33c012e2411db92f2333b3"; 
  const [city, setCity] = useState({
    lat: 43.7001,
    lon: -79.4163
  });

  // useStates
  const [searchKey, setSearchKey] = useState("Toronto");
  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState([]);
  const [weather, setWeather] = useState({});

  
  // useEffect to fetch Data for input value
  useEffect(() => {
    axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchKey}&appid=${key}`
    ).then(({ data }) => {
       setWeather(data);
      setCity(data.coord)
    });
  }, [searchKey]);

  // useEffect to fetch Weekly weather details for selected location
  useEffect(() => {
    axios(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude=hourly,minutely&units=metric&lang=tr&appid=${key}`
    ).then(({ data }) => {
      setDaily(data.daily);
    });
  }, [city]);

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        current,
        setCurrent,
        daily,
        setDaily,
        searchKey,
        setSearchKey,
        weather,
        setWeather
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};
