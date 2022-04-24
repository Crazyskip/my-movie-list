import styled from "styled-components";

export const ReviewContainer = styled.div`
  margin: 5px;
  padding: 20px;
  width: 100%;
  border: 1px solid #cccccc;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const TitleContainer = styled.div`
  margin: 0 15px;

  h3 {
    margin: 0;
  }

  p {
    font-size: 0.8rem;
    margin: 0;
  }
`;

export const LinesContainer = styled.div`
  a {
    text-decoration: underline;

    &:hover {
      color: #7d7d7d;
    }
  }
`;
