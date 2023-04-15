import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/material'
import PlantSuggestions from '../PlantSuggestions'
import {data} from '../PlantData'

const WeatherDetails = () => {
  const { location } = useParams();
  const [weatherData, setWeatherData] = useState(null)
  const [suggestedPlants, setSuggestedPlants] = useState([])
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`

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

  const getSuggestedPlants = (climateZone) => {
    const plants = data.filter(plant => plant.climate_zones.includes(climateZone));
    setSuggestedPlants(plants);
  };
  const getClimateZone = (temperature) => {
    let climateZone = '';
    if (temperature < 5) {
      climateZone = 'Alpine';
    } else if (temperature >= 5 && temperature < 18) {
      climateZone = 'Cool Temperate';
    } else if (temperature >= 18 && temperature < 23) {
      climateZone = 'Temperate';
    } else if (temperature >= 23 && temperature < 30) {
      climateZone = 'Subtropical';
    } else if (temperature >= 30) {
      climateZone = 'Tropical';
    }
    return climateZone;
  };


  useEffect(() => {
    if (weatherData) {
      const temp = Math.round(weatherData.main.temp - 273.15);
      const climateZone = getClimateZone(temp);
      getSuggestedPlants(climateZone);
    }
  }, [weatherData]);


  if (!weatherData) {
    return <CircularProgress />;
  }

  console.log(weatherData); 

  const temperature = Math.round(weatherData.main.temp - 273.15);
  const weatherDescription = weatherData.weather[0].description; 

  return (
    <>
      <h2>Weather Details</h2>
      <p>Temperature: {temperature}°C</p>
      <p>Weather: {weatherDescription}</p>
      {suggestedPlants.length > 0 ? (
        <PlantSuggestions climateZone={getClimateZone(temperature)} />
      ) : (
        <Typography variant="h4">No suggested plants for this climate zone.</Typography>
      )}
    </>
  );
}  

export default WeatherDetails;


