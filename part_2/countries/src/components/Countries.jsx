const Countries = ({ countries, selectCountry }) => (
  <ul className="country-list" aria-label="Matching countries">
    {countries.map((country) => (
      <li className="country-list__item" key={country.cca3}>
        <span>{country.name.common}</span>
        <button className="button button--quiet" type="button" onClick={() => selectCountry(country)}>View details <span aria-hidden="true">→</span></button>
      </li>
    ))}
  </ul>
);

export default Countries;
