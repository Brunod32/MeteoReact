import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    border-bottom: 5px solid white;
    padding: 3rem;
    margin: 0rem 4rem;
`;

const Title = styled.h2`
    color: blueviolet;
    padding-bottom: 1.5rem;
`

export default function ForecastWeather() {
    return (
      <Wrapper>
          <Title>Prévisions pour</Title>
      </Wrapper>
  )
}
