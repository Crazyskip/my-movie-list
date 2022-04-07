import { ReactNode } from "react";
import styled from "styled-components";
import device from "../../commons/breakpoints";
import Navbar from "../navbar";

interface Props {
  children: ReactNode;
}

const MainContainer = styled.main`
  margin: 15px 10px;

  @media only screen and (${device.sm}) {
    margin: 15px 20px;
  }

  @media only screen and (${device.md}) {
    margin: 15px 50px;
  }

  @media only screen and (${device.xl}) {
    margin: 15px 132px;
  }
`;

const Layout = ({ children }: Props) => (
  <>
    <Navbar />
    <MainContainer>{children}</MainContainer>
  </>
);

export default Layout;
