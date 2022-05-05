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
  display: flex;
`;

export const Dropdown = styled.div`
  position: relative;
  margin: 0 30px;
  padding: 10px;
  cursor: pointer;

  a {
    margin: 0;
    padding: 0;
  }

  &:hover > ul,
  ul:hover {
    list-style: none;
    visibility: visible;
    opacity: 1;
    display: block;
    text-align: left;
    padding: 10px 0;
  }

  ul {
    z-index: 999;
    visibility: hidden;
    opacity: 0;
    position: absolute;
    left: 0;
    padding-left: 0;
    margin-top: 10px;
    display: none;
    background: #ffffff;
    border-radius: 10px;
    border: 1px solid #cccccc;

    li {
      clear: both;
      width: 100%;
      text-align: left;
      padding: 5px 10px;
      border-style: none;
      color: #000000;

      &:hover {
        background-color: #eeeeee;
      }

      a {
        display: block;
        margin: 0;
        min-width: 150px;
        font-weight: 400;

        &:hover {
          color: #000000;
        }
      }
    }
  }
`;

export const NavLink = styled.a`
  font-size: 1rem;
  font-weight: 500;
  margin: 0 30px;
  padding: 10px;
`;
