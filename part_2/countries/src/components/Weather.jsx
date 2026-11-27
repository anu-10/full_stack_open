import { useEffect, useState } from "react";
import getWeather from "../services/weather";

const Weather = ({ name, lat, lon }) => {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    getWeather(lat, lon).then((result) => {
      if (!cancelled) setWeather(result);
    }).catch(() => {
      if (!cancelled) setWeather(null);
    }).finally(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => { cancelled = true; };
  }, [lat, lon]);

  return (
    <section className="weather-card" aria-live="polite">
      <h3>Weather in {name}</h3>
      {isLoading && <p className="weather-note">Loading current weather…</p>}
      {!isLoading && !weather && <p className="weather-note">Weather data is unavailable right now.</p>}
      {!isLoading && weather && <div className="weather-data">
        <div className="weather-temperature">{Math.round(weather.main.temp)}<span>°C</span></div>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
        <p>{weather.weather[0].description}</p>
        <p className="weather-wind">Wind {weather.wind.speed} m/s</p>
      </div>}
    </section>
  );
};

export default Weather;
