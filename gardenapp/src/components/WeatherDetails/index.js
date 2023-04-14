import React, { useEffect, useState, useCallback } from 'react';
import { CircularProgress } from '@mui/material';

const WeatherDetails = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  const fetchWeatherData = useCallback(() => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Unable to fetch weather data');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
      })
      .catch(error => console.error(error));
  }, [apiUrl]);
  

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [fetchWeatherData, location]);

  if (!weatherData) {
    return <CircularProgress />;
  }

  // const temperature = Math.round(weatherData.main.temp - 273.15);
  // const weatherDescription = weatherData.weather[0].description;
  console.log(weatherData); 

  // return (
  //   <div>
  //     <h2>Weather Details</h2>
  //     <p>Temperature: {temperature}°C</p>
  //     <p>Weather: {weatherDescription}</p>
  //   </div>
  // );

  return (
    <div>
      {weatherData ? (
        <>
          <h2>Weather Details</h2>
          <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
  
};

export default WeatherDetails;


