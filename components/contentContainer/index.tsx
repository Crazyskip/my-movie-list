import React, { ReactNode } from "react";
import styled from "styled-components";
import device from "../../commons/breakpoints";

interface Props {
  children?: ReactNode;
  as?: React.ElementType;
}

const Container = styled.div`
  margin: 0 10px;

  @media only screen and (${device.sm}) {
    margin: 0 20px;
  }

  @media only screen and (${device.md}) {
    margin: 0 50px;
  }

  @media only screen and (${device.lg}) {
    margin: 0 100px;
  }

  @media only screen and (${device.xl}) {
    margin: 0 150px;
  }
`;

const ContentContainer = ({ children, as = "div" }: Props) => (
  <>
    <Container as={as}>{children}</Container>
  </>
);

export default ContentContainer;
