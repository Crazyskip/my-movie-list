import styled from "styled-components";
import device from "../../commons/breakpoints";

export const NavContainer = styled.nav`
  height: 64px;
  width: 100%;
  color: #ffffff;
  background-color: #490082;
  display: flex;
  align-items: center;
  padding: 0 10px;

  @media only screen and (${device.sm}) {
    padding: 0 20px;
  }

  @media only screen and (${device.md}) {
    padding: 0 50px;
  }

  @media only screen and (${device.xl}) {
    padding: 0 132px;
  }
`;

export const NavLogo = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  width: 100%;
`;

export const NavLinkGroup = styled.div`
  margin: 0 10px;
`;

export const NavLink = styled.a`
  font-size: 1rem;
  font-weight: 500;
  margin: 0 30px;

  &:hover {
    color: lightgray;
  }
`;
