import styled from "styled-components";
import device from "../../commons/breakpoints";

export const Container = styled.div`
  display: grid;
  place-items: start;
  justify-content: start;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;

  @media only screen and (${device.lg}) {
    grid-template-columns: repeat(auto-fit, 230px);
  }
`;
