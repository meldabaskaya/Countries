import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import CountryDetail from './CountryDetail';

function App() {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Ülkeler alınamadı:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const filteredCountries = countries.filter(country => {
    const matchesRegion = region ? country.region === region : true;
    const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark' : ''}`}>
        <header className="App-header">
          <h1>Where in the world?</h1>
          <button onClick={handleToggleDarkMode} className="dark-mode-toggle">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ 
              padding: '10px', 
              marginBottom: '20px', 
              width: '25%', 
              marginRight: '10px'
            }}
          />

          <select onChange={handleRegionChange}>
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        <Routes>
          <Route path="/" element={
            <div className="container" style={{ marginTop: '30px' }}>
              {filteredCountries.map(country => (
                <div key={country.cca3} className="card">
                  <Link to={`/country/${country.cca3}`}>
                    <img src={country.flags.png} alt={`Bayrak of ${country.name.common}`} />
                    <h3>{country.name.common}</h3>
                    <p>Population: {country.population}</p>
                    <p>Region: {country.region}</p>
                    <p>Capital: {country.capital}</p>
                  </Link>
                </div>
              ))}
            </div>
          } />
          <Route path="/country/:countryId" element={<CountryDetail countries={countries} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
