import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import Header from './components/Header.jsx'
import LocalizedMeteo from './components/LocalizedMeteo.jsx'
import SearchWeather from './components/SearchWeather.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Header />
    <SearchWeather />
    <LocalizedMeteo />
  </React.StrictMode>,
)
