import styled from "styled-components";
import Image from "next/image";
import device from "../../commons/breakpoints";

type HeaderProps = {
  posterImage: string;
};

export const Header = styled.div<HeaderProps>`
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: linear-gradient(
      to bottom right,
      rgba(32, 32, 32, 1),
      rgba(32, 32, 32, 0.65)
    ),
    url(${(props) => props.posterImage});
  color: #ffffff;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;

  @media only screen and (${device.lg}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const StyledImage = styled(Image)`
  border-radius: 8px;

  @media only screen and (${device.lg}) {
    position: relative;
    width: 500px;
    height: 900px;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 1;

  @media only screen and (${device.md}) {
    width: 650px;
  }

  @media only screen and (${device.lg}) {
    align-items: flex-start;
    margin: 20px 0 0 30px;
    width: calc(100% - 340px);
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 1.6rem;

  text-align: center;

  @media only screen and (${device.lg}) {
    font-size: 2.1rem;
    text-align: start;
  }
`;

export const Year = styled.span`
  color: #d4d4d4;
  font-weight: 400;
`;

export const Description = styled.div`
  margin: 5px 0 15px 0;
  font-size: 1rem;
`;

export const FunctionsContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
`;

export const FunctionButton = styled.div`
  font-size: 1.1rem;
  height: 50px;
  width: 50px;
  background-color: rgb(3, 37, 65);
  border-radius: 100%;
  margin-left: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const Tagline = styled.h3`
  margin-bottom: 0;
  font-size: 1.1em;
  font-weight: 300;
  font-style: italic;
  opacity: 0.8;
  letter-spacing: 0.5px;
`;

export const Overview = styled.div`
  margin-top: 15px;
  text-align: center;

  @media only screen and (${device.lg}) {
    text-align: start;
  }

  h3 {
    margin: 0 0 10px 0;
    font-size: 1.3rem;
    font-weight: 600;
  }
`;

export const DetailsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`;

export const Detail = styled.div`
  margin-left: 30px;

  @media only screen and (${device.sm}) {
    margin-left: 50px;
  }

  h4 {
    margin: 0;
    font-weight: 500;
  }

  p {
    margin: 0;
  }

  &:first-child {
    margin: 0px;
  }
`;
