import styled from "styled-components";
import Image from "next/image";

export const Header = styled.div`
  width: 100%;
  background: linear-gradient(
    to bottom right,
    rgba(41, 41, 104, 1),
    rgba(41, 41, 104, 0.84)
  );
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

export const Overview = styled.div`
  margin-top: 15px;

  h3 {
    margin: 0 0 10px 0;
    font-size: 1.3rem;
    font-weight: 600;
  }
`;
