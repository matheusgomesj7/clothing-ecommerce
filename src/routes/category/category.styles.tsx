import styled from 'styled-components';

export const CategoryTitle = styled.h2`
  font-size: 36px;
  margin-bottom: 25px;
  text-align: center;
`

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
  
  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
    gap: 15px;

    button {
        display: block;
        opacity: 0.9;
        min-width: unset;
        padding: 0 10px;
        font-size: 2.5vw;
      }
  }

  @media screen and (max-width: 500px) {
    button {
      display: block;
      opacity: 0.9;
      min-width: unset;
      padding: 0 10px;
      font-size: 3.5vw;
    }
  }
`