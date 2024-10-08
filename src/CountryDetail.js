// src/CountryDetail.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CountryDetail = ({ countries }) => {
  const { countryId } = useParams();
  const country = countries.find(c => c.cca3 === countryId);

  if (!country) {
    return <div>Country information not found.</div>;
  }

  return (
    <div>
      <h2>{country.name.common}</h2>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} style={{ width: '100px' }} />
      <p>Region: {country.region}</p>
      <p>Sub Region: {country.subregion}</p>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Area: {country.area} km²</p>
      <h3>Bordering Countries:</h3>
      <ul>
        {country.borders ? country.borders.map(border => {
          const borderCountry = countries.find(c => c.cca3 === border);
          return (
            <li key={border}>
              <Link to={`/country/${border}`}>{borderCountry ? borderCountry.name.common : border}</Link>
            </li>
          );
        }) : <li>This country has no neighbors.</li>}
      </ul>

      <Link to="/">Back</Link>
    </div>
  );
};

export default CountryDetail;
