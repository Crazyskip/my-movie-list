import React, { ReactNode } from "react";
import styled from "styled-components";
import device from "../../commons/breakpoints";

interface Props {
  children?: ReactNode;
  minHeight?: string;
  as?: React.ElementType;
}

interface ContainerProps {
  readonly minHeight: string;
}

const Container = styled.div<ContainerProps>`
  padding: 0 10px;
  margin: 0 auto;
  max-width: 1400px;
  min-height: ${({ minHeight }) =>
    minHeight ? minHeight : "calc(100vh - 64px)"};

  @media only screen and (${device.sm}) {
    padding: 0 20px;
  }

  @media only screen and (${device.md}) {
    padding: 0 50px;
  }
`;

const ContentContainer = ({ children, as = "div", minHeight }: Props) => (
  <>
    <Container as={as} minHeight={minHeight}>
      {children}
    </Container>
  </>
);

export default ContentContainer;
