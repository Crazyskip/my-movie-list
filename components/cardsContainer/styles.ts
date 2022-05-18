import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  place-items: start;
  justify-content: start;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;
