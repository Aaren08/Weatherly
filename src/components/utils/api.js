const API_KEY = "your-api-key-here"; // Replace with your actual API key

export async function fetchCitySuggestions(query) {
  if (!query) return [];

  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
}

export async function fetchWeatherData(city) {
  if (!city) return null;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch weather data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}
