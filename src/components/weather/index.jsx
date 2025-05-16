import { useEffect, useState } from "react";
import Search from "../search";
import WeatherInfo from "./weatherInfo";
import WeatherVideo from "./weatherVideo";
import { fetchWeatherData } from "../utils/api";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  async function handleFetchWeather(city) {
    if (!city) return;

    setLoading(true);
    setError(null);

    const data = await fetchWeatherData(city);

    if (data && data.name) {
      setWeatherData(data);
    } else {
      setWeatherData(null);
      setError("Could not fetch weather data. Please try again.");
    }

    setLoading(false);
  }

  useEffect(() => {
    handleFetchWeather("Islamabad"); // Fetch default weather
  }, []);

  return (
    <div className="wrapper">
      <header>
        <div className="logo">
          <img src="./logo.jpg" alt="Logo" />
          <ul className="right-menu">
            <li>
              <a href="#">Log in</a>
            </li>
            <li>
              <a href="#">Sign up</a>
            </li>
          </ul>
        </div>
      </header>
      <div className="container">
        <WeatherVideo description={weatherData?.weather?.[0]?.description} />
        <Search
          search={search}
          setSearch={setSearch}
          fetchWeatherData={handleFetchWeather}
        />
        <WeatherInfo weatherData={weatherData} loading={loading} />
      </div>
      <footer>
        <p>&copy;2025 Weatherly, All Rights Reserved.</p>
      </footer>
    </div>
  );
}
