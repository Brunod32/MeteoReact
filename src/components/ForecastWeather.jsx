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

export default function ForecastWeather() {
    const [forecastData, setForecastData] = useState([]);
    const [cityName, setCityName] = useState("");

    useEffect(() => {
        const apiKey = '7d4a696f4e46055b073d599ec89e157b';

        navigator.geolocation.getCurrentPosition(
            function (position) {
                const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric&lang=fr`;

                fetch(urlForecast)
                    .then(response => response.json())
                    .then(data => {
                        setCityName(data.city.name);
                        setForecastData(data.list);
                    })
                    .catch(err => console.log('Erreur: ' + err));
            }
        )
    }, []);

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
                                {forecast.weather[0].main === 'Thunderstorm' ? (
                                    <IoIosThunderstorm />
                                ) : forecast.weather[0].main === 'Rain' ? (
                                    <IoRainyOutline />
                                ) : forecast.weather[0].main === 'Snow' ? (
                                    <FaRegSnowflake />
                                ) : forecast.weather[0].main === 'Mist' ? (
                                    <RiMistFill />
                                ) : forecast.weather[0].main === 'Clear' ? (
                                    <CiBrightnessDown />
                                ) : forecast.weather[0].main === 'Clouds' ? (
                                    <IoSunnyOutline />
                                ) : (
                                    <span>Tendance : inconnue</span>
                                )}
                            </div>
                            <div>
                            <FaThermometerHalf /> {forecast.main.temp}°C
                            </div>
                            <div>
                            <IoStopwatchOutline /> {forecast.main.pressure}
                            </div>
                            <div>
                            <FaWind /> {forecast.wind.speed} km/h
                            </div>
                            <div>
                            <BsDroplet /> {forecast.main.humidity} %
                            </div>
                        </WeatherInfo>
                    </WeatherTile>
                ))}
            </WeatherForeCastContainer>
        </Wrapper>
    )
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
