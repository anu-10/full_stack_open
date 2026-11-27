import Countries from "./Countries";
import Country from "./Country";

const Content = ({ countries, selectedCountry, selectCountry, hasQuery }) => {
  if (selectedCountry) return <Country country={selectedCountry} />;
  if (!hasQuery) return <p className="empty-state">Start typing to find a country.</p>;
  if (countries.length > 10) return <p className="status-message">{countries.length} matches. Add a few more letters to narrow your search.</p>;
  if (countries.length > 1) return <Countries countries={countries} selectCountry={selectCountry} />;
  if (countries.length === 1) return <Country country={countries[0]} />;
  return <p className="status-message">No countries match that search.</p>;
};

export default Content;
