import React from "react";

export default function WeatherInfo({ weatherData, loading }) {
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!weatherData) {
    return <div className="error">No weather data available</div>;
  }

  return (
    <div>
      <div className="city-name">
        <h2>
          {weatherData.name}, <span>{weatherData.sys?.country}</span>
        </h2>
      </div>
      <div className="date">
        <span>
          {new Date().toLocaleDateString("en-us", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
      <div className="temp">
        {weatherData.main?.temp && (
          <span className="temp-values">
            <span>
              {Math.round(((weatherData.main.temp - 273.15) * 9) / 5 + 32)}°F
            </span>
            <span>{Math.round(weatherData.main.temp - 273.15)}°C</span>
          </span>
        )}
      </div>
      <p className="description">
        {weatherData.weather?.[0]?.description || ""}
      </p>
      <div className="weather-info">
        <div className="column">
          <div>
            <p className="wind">{weatherData.wind?.speed}</p>
            <p>Wind Speed</p>
          </div>
        </div>
        <div className="column">
          <div>
            <p className="humidity">{weatherData.main?.humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
      </div>
    </div>
  );
}
