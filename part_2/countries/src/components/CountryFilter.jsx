const CountryFilter = ({ filter, handleFilterChange }) => (
  <label className="country-search">
    <span className="field-label">Find a country</span>
    <input type="search" value={filter} onChange={handleFilterChange} placeholder="Start with a country name…" />
  </label>
);

export default CountryFilter;
