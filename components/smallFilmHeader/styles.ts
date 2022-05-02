import styled from "styled-components";

export const Header = styled.div`
  width: 100%;
  background: linear-gradient(
    to bottom right,
    rgba(32, 32, 32, 1),
    rgba(32, 32, 32, 0.65)
  );
  color: #ffffff;
`;

export const Content = styled.div`
  height: 138px;
  display: flex;
  align-items: center;
`;

export const Details = styled.div`
  margin-left: 15px;
`;

export const Title = styled.div`
  display: flex;

  h1 {
    margin: 0 10px 10px 0;
  }
`;

export const Year = styled.span`
  color: #d4d4d4;
  font-weight: 400;
  font-size: 2rem;
`;
