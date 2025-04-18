import { useEffect, useState } from 'react';
import styled from 'styled-components'

function Header() {

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const formattedCurrentDate = new Date().toLocaleDateString('fr-FR', options);
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const secondes = currentTime.getSeconds() < 10 ? '0' + currentTime.getSeconds() : currentTime.getSeconds();

    return (
        <>
            <Wrapper>
                <Title>Météo</Title>
                <DateWrapper>Nous sommes le {formattedCurrentDate} et il est {hours}:{minutes}:{secondes}</DateWrapper>
            </Wrapper>
        </>
    )

}

export default Header;

const Wrapper = styled.div`
    border-bottom: 5px solid white;
    margin: 0rem 5rem;
`;

const Title = styled.h1`
    margin: 1rem 0rem;
    color: blueviolet;
    text-align: center;
`;

const DateWrapper = styled.div`
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    margin: 3rem;
    text-align: center;
`;