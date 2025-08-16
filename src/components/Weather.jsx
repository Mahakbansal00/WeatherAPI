import React, { useState, useEffect } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = () => {
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Weather icon mapping
  const weatherIcons = {
    '01d': clear_icon,
    '01n': clear_icon,
    '02d': cloud_icon,
    '02n': cloud_icon,
    '03d': cloud_icon,
    '03n': cloud_icon,
    '04d': cloud_icon,
    '04n': cloud_icon,
    '09d': drizzle_icon,
    '09n': drizzle_icon,
    '10d': rain_icon,
    '10n': rain_icon,
    '11d': rain_icon,
    '11n': rain_icon,
    '13d': snow_icon,
    '13n': snow_icon,
    '50d': drizzle_icon,
    '50n': drizzle_icon,
  };

  // Fetch weather data
  const fetchWeatherData = async (city) => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Using a demo API key - replace with your own from openweathermap.org
      const API_KEY = '4d8fb5b93d4af21d66a2948710284366';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData(searchInput);
  };

  // Load default city on mount
  useEffect(() => {
    fetchWeatherData('London');
  }, []);

  if (loading) {
    return (
      <div className="weather">
        <div className="loading">Loading weather data...</div>
      </div>
    );
  }

  return (
    <div className="weather">
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search city..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">
          <img src={search_icon} alt="Search" />
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {weatherData && (
        <>
          <img 
            src={weatherIcons[weatherData.weather[0].icon] || clear_icon} 
            alt={weatherData.weather[0].description}
            className="weather-icon"
          />
          <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
          <p className="location">{weatherData.name}, {weatherData.sys.country}</p>
          
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.main.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            
            <div className="col">
              <img src={wind_icon} alt="Wind speed" />
              <div>
                <p>{Math.round(weatherData.wind.speed)} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
          
          <div className="weather-condition">
            <p>{weatherData.weather[0].description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
