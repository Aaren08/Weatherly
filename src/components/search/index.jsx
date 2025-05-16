import SearchInput from "./searchInput";

export default function SearchBar({ search, setSearch, fetchWeatherData }) {
  return (
    <SearchInput
      search={search}
      setSearch={setSearch}
      fetchWeatherData={fetchWeatherData}
    />
  );
}
