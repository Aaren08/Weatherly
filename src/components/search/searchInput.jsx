import React, { useState, useEffect, useRef } from "react";
import { fetchCitySuggestions } from "../utils/api";

export default function SearchInput({ search, setSearch, fetchWeatherData }) {
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleInputChange(e) {
    const value = e.target.value;
    setSearch(value);
    setHighlightedIndex(-1);
    const data = await fetchCitySuggestions(value);

    if (data.some((city) => city.name.toLowerCase() === value.toLowerCase())) {
      setSuggestions([]); // No need to show suggestions for exact match
    } else {
      setSuggestions(data);
    }
  }

  function handleSuggestionClick(city) {
    if (!city) return;
    setSearch(city.name);
    setSuggestions([]);
    fetchWeatherData(city.name);
  }

  function handleInputFocus() {
    setSearch(""); // Clear input when clicked
    setSuggestions([]); // Hide previous suggestions
    setHighlightedIndex(-1);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();

      // If a suggestion is highlighted, use it instead of the input value
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        const selectedCity = suggestions[highlightedIndex];
        setSearch(selectedCity.name);
        setSuggestions([]);
        fetchWeatherData(selectedCity.name);
      } else if (search.trim()) {
        fetchWeatherData(search.trim());
      }

      setSuggestions([]); // Clear suggestions after selection
      setHighlightedIndex(-1);
    }

    // Handle arrow key navigation for suggestions
    if (
      suggestions.length > 0 &&
      (e.key === "ArrowDown" || e.key === "ArrowUp")
    ) {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => {
        let newIndex =
          e.key === "ArrowDown"
            ? Math.min(prevIndex + 1, suggestions.length - 1)
            : Math.max(prevIndex - 1, 0);
        return newIndex;
      });
    }
  }

  return (
    <div className="search-engine" ref={searchRef}>
      <input
        type="text"
        value={search}
        onFocus={handleInputFocus}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for a city"
      />
      <button
        onClick={() => {
          fetchWeatherData(search);
          setSuggestions([]);
        }}
      >
        Search
      </button>

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((city, index) => (
            <li
              key={`${city.name}-${city.country}-${index}`}
              onClick={() => handleSuggestionClick(city)}
              className={highlightedIndex === index ? "highlighted" : ""}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
