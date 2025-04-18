import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Header from './components/Header.jsx'
import LocalizedMeteo from './components/LocalizedMeteo.jsx'
import SearchWeather from './components/SearchWeather.jsx'
import ForecastWeather from './components/ForecastWeather.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <SearchWeather />
    <LocalizedMeteo />
    <ForecastWeather />
  </React.StrictMode>
)
