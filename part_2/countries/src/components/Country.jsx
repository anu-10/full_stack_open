import Weather from "./Weather";

const Country = ({ country }) => {
  const capital = country.capital?.[0];
  const languages = Object.values(country.languages || {});
  const capitalCoordinates = country.capitalInfo?.latlng;

  return (
    <article className="country-card">
      <div className="country-card__main">
        <p className="eyebrow">Country profile</p>
        <h2>{country.name.common}</h2>
        <p className="official-name">{country.name.official}</p>
        <dl className="country-facts">
          <div><dt>Capital</dt><dd>{capital || "Not available"}</dd></div>
          <div><dt>Area</dt><dd>{country.area.toLocaleString()} km²</dd></div>
          <div><dt>Region</dt><dd>{country.region}</dd></div>
          <div><dt>Population</dt><dd>{country.population.toLocaleString()}</dd></div>
        </dl>
        {languages.length > 0 && <div className="language-section"><h3>Languages</h3><ul>{languages.map((language) => <li key={language}>{language}</li>)}</ul></div>}
      </div>
      <div className="country-card__aside">
        <img className="country-flag" src={country.flags.svg || country.flags.png} alt={country.flags.alt || `Flag of ${country.name.common}`} />
        {capital && capitalCoordinates?.length >= 2
          ? <Weather name={capital} lat={capitalCoordinates[0]} lon={capitalCoordinates[1]} />
          : <p className="weather-note">Capital weather is not available for this country.</p>}
      </div>
    </article>
  );
};

export default Country;
