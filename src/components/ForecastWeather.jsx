import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaThermometerHalf } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import { BsDroplet } from "react-icons/bs";
import { IoStopwatchOutline } from "react-icons/io5";
import { IoCalendar } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { IoRainyOutline } from "react-icons/io5";
import { IoIosThunderstorm } from "react-icons/io";
import { FaRegSnowflake } from "react-icons/fa";
import { RiMistFill } from "react-icons/ri";
import { CiBrightnessDown } from "react-icons/ci";

export default function ForecastWeather({ city }) {
    const [forecastData, setForecastData] = useState([]);
    const [cityName, setCityName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiKey = '7d4a696f4e46055b073d599ec89e157b';
        setLoading(true);
        setError(null);

        let urlForecast = '';

        if (city) {
            // Utiliser le nom de la ville si fourni
            urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=fr`;
        } else {
            // Géolocalisation si aucune ville n'est fournie
            navigator.geolocation.getCurrentPosition(
                position => {
                    urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric&lang=fr`;
                    fetchForecastData(urlForecast);
                },
                error => {
                    setError("Erreur de géolocalisation pour les prévisions.");
                    setLoading(false);
                    console.error("Erreur de géolocalisation (prévisions):", error);
                }
            );
            return;
        }

        if (urlForecast) {
            fetchForecastData(urlForecast);
        }

        async function fetchForecastData(url) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! statut: ${response.status}`);
                }
                const data = await response.json();
                setCityName(data.city?.name || city || "Localisation");
                setForecastData(data.list);
                setLoading(false);
            } catch (err) {
                setError(`Erreur lors de la récupération des prévisions pour ${city || 'la localisation'}: ${err.message}`);
                setLoading(false);
                console.error("Erreur (prévisions):", err);
            }
        }

    }, [city]); // L'effet se relance si la prop 'city' change

    const getWeatherIcon = (main) => {
        switch (main) {
            case 'Thunderstorm': return <IoIosThunderstorm />;
            case 'Rain': return <IoRainyOutline />;
            case 'Snow': return <FaRegSnowflake />;
            case 'Mist': return <RiMistFill />;
            case 'Clear': return <CiBrightnessDown />;
            case 'Clouds': return <IoSunnyOutline />;
            default: return <span>Tendance : inconnue</span>;
        }
    };

    if (loading) {
        return <Wrapper><Title>Chargement des prévisions...</Title></Wrapper>;
    }

    if (error) {
        return <Wrapper><Title>Erreur lors du chargement des prévisions</Title><p>{error}</p></Wrapper>;
    }

    return (
        <Wrapper>
            <Title>Prévisions pour {cityName}</Title>
            <WeatherForeCastContainer>
                {forecastData.map((forecast, index) => (
                    <WeatherTile key={index}>
                        <WeatherInfo>
                            <HeaderTile>
                                <IoCalendar /> {forecast.dt_txt}
                            </HeaderTile>
                            <div>
                                {getWeatherIcon(forecast.weather[0].main)}
                            </div>
                            <div>
                                <FaThermometerHalf /> {forecast.main.temp}°C
                            </div>
                            <div>
                                <IoStopwatchOutline /> {forecast.main.pressure} hPa
                            </div>
                            <div>
                                <FaWind /> {forecast.wind.speed} m/s
                            </div>
                            <div>
                                <BsDroplet /> {forecast.main.humidity} %
                            </div>
                        </WeatherInfo>
                    </WeatherTile>
                ))}
            </WeatherForeCastContainer>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    border-bottom: 5px solid white;
    padding: 3rem;
    margin: 0rem 4rem;
`;

const Title = styled.h2`
    color: blueviolet;
    padding-bottom: 1.5rem;
`

const WeatherForeCastContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
`;

const HeaderTile = styled.h3`
    text-align: center;
`;

const WeatherTile = styled.div`
    border: 2px solid blueviolet;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc(100% - 2rem); /* Prendre toute la largeur, moins les marges */
    max-width: 20rem; /* Limiter la largeur maximale */
    font-size: 1.5rem;
    background-color: #5f5d5d;
    background-image: ${(props) => props.backgroundurl ? `linear-gradient(rgba(95, 93, 93, 0.5), rgba(95, 93, 93, 0.5)), url(${props.backgroundurl})` : 'none'};
    background-size: cover;
    background-position: center;
    color: black;
    font-weight: bold;
    background-color: rgba(235, 228, 228, 0.5);
    overflow: hidden;

    @media (min-width: 900px) {
        width: calc(50% - 2rem); /* Afficher 4 éléments par ligne, moins les marges */
    }
`

const WeatherInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;
    text-align: center; /* Centrer le texte horizontalement */

    & > * {
        margin: auto; /* Centrer les éléments en ligne */
    }
`
