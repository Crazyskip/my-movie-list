import styled from "styled-components";
import device from "../../commons/breakpoints";

export const ListBannerContainer = styled.a`
  width: 100%;
  background-color: #101010;
  color: #fff;
  display: flex;
  margin: 10px;

  @media only screen and (${device.lg}) {
    width: calc(50% - 20px);
  }
`;

export const ImageContainer = styled.div`
  width: 25%;
`;

export const DetailsContainer = styled.div`
  padding: 20px 40px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;

  @media only screen and (${device.sm}) {
    font-size: 2rem;
  }
`;
