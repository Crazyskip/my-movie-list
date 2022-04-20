import React, { ReactNode } from "react";
import styled from "styled-components";
import device from "../../commons/breakpoints";

interface Props {
  children?: ReactNode;
  as?: React.ElementType;
}

const Container = styled.div`
  padding: 0 10px;
  margin: 0 auto;
  max-width: 1400px;

  @media only screen and (${device.sm}) {
    padding: 0 20px;
  }

  @media only screen and (${device.md}) {
    padding: 0 50px;
  }
`;

const ContentContainer = ({ children, as = "div" }: Props) => (
  <>
    <Container as={as}>{children}</Container>
  </>
);

export default ContentContainer;
