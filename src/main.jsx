import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Header from './components/Header.jsx'
import LocalizedMeteo from './components/LocalizedMeteo.jsx'
import SearchWeather from './components/SearchWeather.jsx'
import ForecastWeather from './components/ForecastWeather.jsx'
import { useState } from 'react'; // Importez useState

function App() {
    const [searchedCity, setSearchedCity] = useState('');

    const handleCitySearch = (city) => {
        setSearchedCity(city);
    };

    return (
        <React.StrictMode>
        <Header />
        <SearchWeather onSearch={handleCitySearch} city={searchedCity}/> {/* Passez la fonction de callback */}
        <LocalizedMeteo city={searchedCity} /> {/* Passez la ville recherchée comme prop */}
        <ForecastWeather city={searchedCity} />
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);