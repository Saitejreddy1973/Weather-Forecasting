import React from 'react';
import { Cloud, Droplets, Thermometer, Wind, Sun, Moon } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const { location, current } = weather;
  
  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 w-full max-w-2xl shadow-lg mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{location.name}</h2>
          <p className="text-white/80">{location.region}, {location.country}</p>
          <p className="text-white/80">{location.localtime}</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <Thermometer className="w-8 h-8 text-white" />
            <span className="text-5xl font-bold text-white">{current.temp_c}°C</span>
          </div>
          <p className="text-white/80 mt-2">Feels like {current.feelslike_c}°C</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Cloud className="w-6 h-6 text-white mx-auto mb-2" />
          <p className="text-white/80">Cloud Cover</p>
          <p className="text-xl font-semibold text-white">{current.cloud}%</p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Droplets className="w-6 h-6 text-white mx-auto mb-2" />
          <p className="text-white/80">Humidity</p>
          <p className="text-xl font-semibold text-white">{current.humidity}%</p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Wind className="w-6 h-6 text-white mx-auto mb-2" />
          <p className="text-white/80">Wind Speed</p>
          <p className="text-xl font-semibold text-white">{current.wind_kph} km/h</p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 text-center">
          {current.is_day ? (
            <Sun className="w-6 h-6 text-white mx-auto mb-2" />
          ) : (
            <Moon className="w-6 h-6 text-white mx-auto mb-2" />
          )}
          <p className="text-white/80">Condition</p>
          <p className="text-xl font-semibold text-white">{current.condition.text}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;