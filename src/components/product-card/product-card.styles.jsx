import styled from 'styled-components';

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;
  img {
    width: 100%;
    height: 95%;
    object-fit: cover;
    margin-bottom: 5px;
  }
  button {
  width: 80%;
  opacity: 0.7;
  position: absolute;
  top: 255px;
  display: none;
  }
  &:hover {
    img {
      opacity: 0.8;
    }
    button {
      opacity: 0.85;
      display: flex;
    }
  }
`

export const Footer = styled.footer`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
` 

export const Name = styled.span`
  width: 90%;
  margin-bottom: 15px;

  @media screen and (max-width: 800px) {
    width: 70%;
    font-size: 2.5vw;
  }

  @media screen and (max-width: 700px) {
    width: 70%;
    font-size: 3vw;
  }

  @media screen and (max-width: 550px) {
    width: 70%;
    font-size: 3.5vw;
  }

  @media screen and (max-width: 425px) {
    width: 70%;
    font-size: 4vw;
  }

  @media screen and (max-width: 350px) {
    width: 70%;
    font-size: 5vw;
  }


`

export const Price = styled.span`
  width: 10%;

  @media screen and (max-width: 800px) {
    padding-right: 20%;
    font-size: 2.5vw;
  }

  @media screen and (max-width: 700px) {
    padding-right: 20%;
    font-size: 3vw;
  }

  @media screen and (max-width: 550px) {
    padding-right: 20%;
    font-size: 3.5vw;
  }

  @media screen and (max-width: 425px) {
    padding-right: 20%;
    font-size: 4vw;
  }

  @media screen and (max-width: 350px) {
    padding-right: 20%;
    font-size: 5vw;
  }
`