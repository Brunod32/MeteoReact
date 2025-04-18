import styled from 'styled-components';

export default function LocalizedMeteo() {
    const apiKey = '7d4a696f4e46055b073d599ec89e157b';
    // localisation from API Geolocalisation
    navigator.geolocation.getCurrentPosition(
        function (position) {
            //console.log(position)

            // Call to openWeather API with city for parameter
            let apiCall = function (lat, lon) {
                let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`;

                // Current weather
                fetch(url)
                    .then(response => response.json()
                        .then((data) => {   
                            //console.log(data);

                        switch (data.weather[0].main) {
                            case 'Thunderstorm':
                                document.querySelector('#city').innerHTML =
                                "<i class='bi bi-geo-alt'></i> " + data.name + ", tendance <i class='bi bi-cloud-lightning'></i>";
                                break;
                            case 'Clouds':
                                document.querySelector('#city').innerHTML =
                                "<i class='bi bi-geo-alt'></i> " + data.name + ", tendance <i class='bi bi-cloud'></i>";
                                break;
                            case 'Rain':
                                document.querySelector('#city').innerHTML =
                                "<i class='bi bi-geo-alt'></i> " + data.name + ", tendance <i class='bi bi-cloud-drizzle'></i>";
                                break;
                            case 'Clear':
                                document.querySelector('#city').innerHTML =
                                "<i class='bi bi-geo-alt'></i> " + data.name + ", tendance <i class='bi bi-brightness-high'></i>";
                                break;
                            case 'Mist' || 'Smoke' || 'Haze' || 'Dust' || 'Fog' || 'Sand' || 'Ash' || 'Squall' || 'Tornado':
                                document.querySelector('#city').innerHTML =
                                "<i class='bi bi-geo-alt'></i> " + data.name + ", tendance <i class='bi bi-cloud-drizzle'></i>";
                                break;
                            case 'Snow':
                                document.querySelector('#city').innerHTML =
                                "<i class='bi bi-geo-alt'></i> " + data.name + ", tendance <i class='bi bi-cloud-snow'></i>";
                                break;              
                            default:
                                document.querySelector('#city').innerHTML = "Tendance : inconnue";
                                break;
                        }

                        document.querySelector('#temp').innerHTML =
                            "<i class='bi bi-thermometer-half'></i> "+ data.main.temp + '°C' + ", ressenti " + data.main.feels_like + '°C';
                        document.querySelector('#wind').innerHTML =
                            "<i class='bi bi-wind'></i> " + data.wind.speed + ' km/h';
                        document.querySelector('#humidity').innerHTML =
                            "<i class='bi bi-droplet'></i> " + data.main.humidity + ' %';

                    })
                ).catch(err => console.log('Erreur: ' + err));
            }
            apiCall(position.coords.latitude, position.coords.longitude)
        }
    )

    return (
        <>
            <Wrapper>
                <Title>Météo du moment</Title>
                <WeatherWrapper>
                    <WeatherTile id="city" $backgroundurl="src/assets/img/map.webp">Ville: </WeatherTile>
                    <WeatherTile id="temp" $backgroundurl="src/assets/img/weather.webp">Température: </WeatherTile>
                    <WeatherTile id="wind" $backgroundurl="src/assets/img/wind.webp">Vent: </WeatherTile>
                    <WeatherTile id="humidity" $backgroundurl="src/assets/img/drops.jpg">Taux d'humidité: </WeatherTile>
                </WeatherWrapper>
            </Wrapper>
      
      </>
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