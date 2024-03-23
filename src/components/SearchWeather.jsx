import styled from 'styled-components';

const Wrapper = styled.div`
    border-bottom: 5px solid white;
    padding: 3rem;
    margin: 0rem 4rem;
`;

const InputSeach = styled.input`
    border-radius: 15px;
    margin-bottom: 15px;
    padding: 10px;
`;

const BtnSearch = styled.button`
    border-radius: 0.5rem;
`;


export default function SearchWeather() {
  return (
      <Wrapper>
          <InputSeach type="text" id="inputCity" placeholder="Quel temps fait-il  à ..."></InputSeach>
          <BtnSearch><i class="bi bi-search"></i></BtnSearch>
      </Wrapper>
  )
}
