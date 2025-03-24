import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Thermometer, Wind, Sun, Moon, MapPin } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import { WeatherData } from './types';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=3035c7e3f75347e68d352530241007&q=${city}`);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=3035c7e3f75347e68d352530241007&q=${latitude},${longitude}`
          );
          if (!response.ok) throw new Error('Failed to fetch weather data');
          const data = await response.json();
          setWeather(data);
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError('Failed to get your location. Please enable location access.');
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-800 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold text-white mb-8">Weather App</h1>
      
      <div className="w-full max-w-md flex flex-col gap-4">
        <SearchBar onSearch={fetchWeather} />
        
        <button
          onClick={getCurrentLocation}
          className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
        >
          <MapPin className="w-5 h-5" />
          Use My Location
        </button>
      </div>
      
      {loading && (
        <div className="text-white text-xl mt-8">Loading...</div>
      )}
      
      {error && (
        <div className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4">
          {error}
        </div>
      )}
      
      {weather && <WeatherCard weather={weather} />}
      
      {!weather && !loading && !error && (
        <div className="text-white text-xl mt-8">
          Search for a city or use your location to see the weather
        </div>
      )}
    </div>
  );
}

export default App;