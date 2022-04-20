import styled from "styled-components";
import Image from "next/image";

type HeaderProps = {
  posterImage: string;
};

export const Header = styled.div<HeaderProps>`
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
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
  padding: 30px 0;
`;

export const StyledImage = styled(Image)`
  border-radius: 8px;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 0 30px;
  width: calc(100% - 340px);
  z-index: 1;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 2.1rem;
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

  h3 {
    margin: 0 0 10px 0;
    font-size: 1.3rem;
    font-weight: 600;
  }
`;
