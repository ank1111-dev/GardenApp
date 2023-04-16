import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, styled , Box} from '@mui/material'
import PlantSuggestions from '../PlantSuggestions'
import {data} from '../PlantData'

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#f0f0f0',
});

const Title = styled(Typography)({
  fontSize: '2rem',
  marginBottom: '10px',
});

const DateTypography = styled(Typography)({
  fontSize: '1rem',
  marginBottom: '20px',
});

const WeatherBox = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px',
  alignItems: 'center',
  justifyItems: 'center',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  backgroundColor: '#ecebbd'
});

const WeatherIcon = styled('img')({
  marginTop: '10px',
  animation: `pulse 1s ease-in-out infinite`,
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.2)' },
    '100%': { transform: 'scale(1)' },
  },
});



const WeatherDetailsContainer = styled('div')({
  margin: '20px 0',
});

const Weather = styled('div')({
    display: 'inline-flex',
  alignItems: 'center',
})


const SuggestionContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '20px',
});

const WeatherDetails = () => {
  const { location } = useParams();
  const [weatherData, setWeatherData] = useState(null)
  const [suggestedPlants, setSuggestedPlants] = useState([])
  const [error, setError] = useState("");
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location},AU&appid=${apiKey}`
  

  const fetchWeatherData = useCallback(() => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Invalid location entered!');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
      });
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

  if (error) {
    return (
      <Box border={1} 
      p={2} 
      borderRadius={4} 
      borderColor="red" 
      bgcolor="rgba(255, 0, 0, 0.1)" 
      m={2} 
      mt={4}>
        <Typography variant="h5" align="center" color="error">
          {error}
        </Typography>
      </Box>
    );
  }  

  if (!weatherData) {
    return <CircularProgress />
  }

  console.log(weatherData); 
  const weatherIconUrl = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`

  const temperature = Math.round(weatherData.main.temp - 273.15)
  const weatherDescription = weatherData.weather[0].description
  const currentDate = new Date()
  const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' })
  const date = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  

  return (
    <Container>
    {!weatherData && <CircularProgress />}
    {weatherData && (
    <>
    <Title>Weather You Like It or Not, You're Here: {weatherData.name}</Title>
    <DateTypography>{date}, {dayOfWeek}</DateTypography>    
    <WeatherBox>
    <WeatherDetailsContainer>
    <Typography variant="h6">Temperature: {temperature}°C</Typography>
    <Weather>    
    <Typography variant="h6">Description: {weatherDescription} <span></span></Typography>
    <WeatherIcon src={weatherIconUrl} alt="Weather Icon" />
    </Weather>
    <Typography variant="h6" >Humidity: {weatherData.main.humidity}%</Typography>
    <Typography variant="h6" sx={{lineHeight:'3'}}>Wind Speed: {weatherData.wind.speed} m/s</Typography>
    </WeatherDetailsContainer>
    </WeatherBox>
    {suggestedPlants.length > 0 ? (
  <SuggestionContainer>
    <PlantSuggestions climateZone={getClimateZone(temperature)} />
  </SuggestionContainer>
  ) : (
  <Typography variant="h4">No suggested plants for this climate zone.</Typography>
  )}   
  </>
    )}
    </Container>
    )
    }


export default WeatherDetails;


