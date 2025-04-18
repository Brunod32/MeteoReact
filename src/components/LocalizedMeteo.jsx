import styled from 'styled-components';
import { useState, useEffect } from 'react';

const apiKey = '7d4a696f4e46055b073d599ec89e157b';

export default function LocalizedMeteo({ city }) { // city est maintenant une prop
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchWeather = async () => {
            let url = '';
            if (city) {
                // Recherche par ville si une ville est fournie en prop
                url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`Erreur HTTP! statut: ${response.status}`);
                    }
                    const data = await response.json();
                    setWeatherData(data);
                    setLoading(false);
                } catch (err) {
                    setError(err.message);
                    setLoading(false);
                }
            } else {
                // Géolocalisation uniquement si aucune ville n'est fournie
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=fr`;
                        try {
                            const response = await fetch(url);
                            if (!response.ok) {
                                throw new Error(`Erreur HTTP! statut: ${response.status}`);
                            }
                            const data = await response.json();
                            setWeatherData(data);
                            setLoading(false);
                        } catch (err) {
                            setError(err.message);
                            setLoading(false);
                        }
                    },
                    (err) => {
                        setError("Erreur de géolocalisation.");
                        setLoading(false);
                        console.error("Erreur de géolocalisation:", err);
                    }
                );
                return; // Important de sortir ici
            }
            // Si une URL de recherche par ville a été construite, l'appel API est déjà fait ci-dessus.
            // On ne refait pas l'appel ici.
        };

        fetchWeather();
    }, [city]); // L'effet se relance si la prop 'city' change

    const getWeatherIcon = (main) => {
        switch (main) {
            case 'Thunderstorm': return <i className='bi bi-cloud-lightning'></i>;
            case 'Clouds': return <i className='bi bi-cloud'></i>;
            case 'Rain': return <i className='bi bi-cloud-drizzle'></i>;
            case 'Clear': return <i className='bi bi-brightness-high'></i>;
            case 'Mist': case 'Smoke': case 'Haze': case 'Dust': case 'Fog': case 'Sand': case 'Ash': case 'Squall': case 'Tornado':
                return <i className='bi bi-cloud-fog2'></i>;
            case 'Snow': return <i className='bi bi-cloud-snow'></i>;
            default: return null;
        }
    };

    if (loading) {
        return <p>Chargement de la météo...</p>;
    }

    if (error) {
        return <p>Erreur: {error}</p>;
    }

    if (weatherData) {
        return (
            <Wrapper>
                <Title>Météo {weatherData.name ? `à ${weatherData.name}` : 'du moment'}</Title>
                <WeatherWrapper>
                    <WeatherTile id="city" $backgroundurl="src/assets/img/map.webp">
                        Ville: <p><i className='bi bi-geo-alt'></i> {weatherData.name}</p>
                    </WeatherTile>
                    <WeatherTile id="temp" $backgroundurl="src/assets/img/weather.webp">
                        Température: <p><i className='bi bi-thermometer-half'></i> {weatherData.main.temp}°C, ressenti {weatherData.main.feels_like}°C</p>
                    </WeatherTile>
                    <WeatherTile id="wind" $backgroundurl="src/assets/img/wind.webp">
                        Vent: <p><i className='bi bi-wind'></i> {weatherData.wind.speed} km/h</p>
                    </WeatherTile>
                    <WeatherTile id="humidity" $backgroundurl="src/assets/img/drops.jpg">
                        Humidité: <p><i className='bi bi-droplet'></i> {weatherData.main.humidity} %</p>
                    </WeatherTile>
                    <WeatherTile $backgroundurl="src/assets/img/weather_icon.webp">
                        Tendance: <p>{getWeatherIcon(weatherData.weather[0].main)} {weatherData.weather[0].description}</p>
                    </WeatherTile>
                </WeatherWrapper>
            </Wrapper>
        );
    }
    return null;
}

const Wrapper = styled.div`
    border-bottom: 5px solid white;
    padding: 3rem;
    margin: 0rem 4rem;
`;

const Title = styled.h2`
    color: blueviolet;
    padding-bottom: 1.5rem;

    @media (max-width: 900px) {
        text-align: center;
    }
`
const WeatherWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;

    @media (max-width: 900px) {
        flex-wrap: wrap;
        justify-content: space-around;
    }
`
const WeatherTile = styled.div`
    border: 2px solid blueviolet;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20rem;
    height: 15rem;
    font-size: 1.5rem;
    background-color: #5f5d5d;
    background-image: ${(props) => props.$backgroundurl ? `linear-gradient(rgba(95, 93, 93, 0.5), rgba(95, 93, 93, 0.5)), url(${props.$backgroundurl})` : 'none'};
    background-size: cover;
    background-position: center;
    color: black;
    font-weight: bold;
    background-color: rgba(95, 93, 93, 0.5);


    p {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .bi {
        font-size: 2em;
    }

    @media (max-width: 900px) {
        height: 18rem;
        width: 24rem;
    }
`