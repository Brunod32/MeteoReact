import styled from 'styled-components';
import { FaSearch } from "react-icons/fa";
import { BsFillGeoAltFill } from "react-icons/bs";

const Wrapper = styled.div`
    border-bottom: 5px solid white;
    padding: 3rem;
    margin: 0rem 4rem;
    display: flex;
    justify-content: space-around;

    @media (max-width: 900px) {
        flex-wrap: wrap;
        justify-content: center;
        gap: 2rem;
    }
`;

const WrapperSearch = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
    
    @media (max-width: 900px) {
        flex-wrap: wrap;
        justify-content: space-around;
        gap: 2rem;
    }
`;

const InputSeach = styled.input`
    border-radius: 15px;
    margin-bottom: 15px;
    padding: 10px;
`;

const LocationButton = styled.button`
    border-radius: 0.5rem;
    height: 3em;
    width: 3em;
    background-color: #5f5d5d;
`;

const BtnSearch = styled.button`
    border-radius: 0.5rem;
    height: 3em;
    width: 3em;
    background-color: #5f5d5d;
`;


export default function SearchWeather() {
  return (
      <Wrapper>
          <LocationButton title="Me géolocaliser">
              <BsFillGeoAltFill style={{ color: 'blue', fontSize: '24px' }} />
          </LocationButton>
          <WrapperSearch>
            <InputSeach type="text" id="inputCity" title="Rechercher" placeholder="Quel temps fait-il  à ..."></InputSeach>
            <BtnSearch>
                <FaSearch style={{ color: 'blue', fontSize: '24px' }} />
            </BtnSearch>    
          </WrapperSearch>
      </Wrapper>
  )
}
