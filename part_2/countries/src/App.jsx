import { useEffect, useMemo, useState } from "react";
import getAllCountries from "./services/countries";
import CountryFilter from "./components/CountryFilter";
import Content from "./components/Content";
import "./index.css";

const App = () => {
  const [filter, setFilter] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    getAllCountries().then(setAllCountries).catch(() => setHasError(true)).finally(() => setIsLoading(false));
  }, []);

  const filteredCountries = useMemo(() => {
    const query = filter.trim().toLowerCase();
    if (!query) return [];
    return allCountries.filter((country) => country.name.common.toLowerCase().includes(query));
  }, [allCountries, filter]);

  const selectCountry = (country) => {
    setSelectedCountry(country);
    setFilter(country.name.common);
  };

  return (
    <main className="countries-app">
      <header className="page-heading">
        <p className="eyebrow">Explore the world</p>
        <h1>Country finder</h1>
        <p className="intro">Search for a country to see its details and local weather.</p>
      </header>
      <CountryFilter filter={filter} handleFilterChange={(event) => { setFilter(event.target.value); setSelectedCountry(null); }} />
      {isLoading && <p className="status-message">Loading countries…</p>}
      {!isLoading && hasError && <p className="status-message status-message--error">Could not load countries. Please try again later.</p>}
      {!isLoading && !hasError && <Content countries={filteredCountries} selectedCountry={selectedCountry} selectCountry={selectCountry} hasQuery={filter.trim().length > 0} />}
    </main>
  );
};

export default App;
