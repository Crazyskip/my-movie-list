import Image from "next/image";
import styled from "styled-components";
import device from "../../commons/breakpoints";

export const CardContainer = styled.div`
  margin: 5px;
  width: 100%;
  min-width: 175px;
  height: 100%;
  border: 1px solid #cccccc;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

  @media only screen and (${device.sm}) {
    max-width: 250px;
  }
`;

export const CardImage = styled(Image)`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const CardContent = styled.div`
  padding: 5px 10px;
`;

export const CardTitle = styled.h3`
  font-size: 1rem;
  margin: 5px 0;
`;
