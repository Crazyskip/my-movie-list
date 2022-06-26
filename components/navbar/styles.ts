import styled from "styled-components";
import device from "../../commons/breakpoints";

interface MenuProps {
  active: boolean;
}

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
  margin-right: 20px;
`;

export const MenuLinks = styled.div<MenuProps>`
  display: ${({ active }) => (active ? "block" : "none")};
  position: absolute;
  top: 64px;
  right: 0;
  height: 100%;
  width: 300px;
  background-color: #490082;
  z-index: 1000;

  @media only screen and (${device.lg}) {
    display: none;
  }
`;

export const NavLinks = styled.div<MenuProps>`
  display: none;
  justify-content: space-between;
  margin: 0 20px;
  width: 100%;

  @media only screen and (${device.lg}) {
    display: flex;
  }
`;

export const NavLinkGroup = styled.div`
  display: flex;
`;

export const Dropdown = styled.div`
  position: relative;
  margin: 0 20px;
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

      border-style: none;
      color: #000000;

      &:hover {
        background-color: #eeeeee;
      }

      a {
        padding: 5px 10px;
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
  cursor: pointer;

  &:hover {
    color: #e0e0e0;
  }
`;

export const MenuToggle = styled.div<MenuProps>`
  position: absolute;
  top: 20px;
  right: ${({ active }) => (active ? "13px" : "10px")};
  height: 25px;
  width: ${({ active }) => (active ? "25px" : "33px")};
  transition: all 0.2s ease-in-out;

  @media only screen and (${device.sm}) {
    right: ${({ active }) => (active ? "23px" : "20px")};
  }

  div {
    position: absolute;
    width: 33px;
    height: 3px;
    background-color: #fff;
    border-radius: 5px;
    transition: all 0.2s linear;
    position: relative;
    transform-origin: 1px;
  }

  div:nth-child(1) {
    top: 0px;
    transform: ${({ active }) => (active ? "rotate(45deg)" : "rotate(0)")};
  }

  div:nth-child(2) {
    top: 8px;
    opacity: ${({ active }) => (active ? "0" : "1")};
    width: ${({ active }) => (active ? "0" : "33px")};
  }

  div:nth-child(3) {
    top: 16px;
    transform: ${({ active }) => (active ? "rotate(-45deg)" : "rotate(0)")};
  }

  &:hover {
    cursor: pointer;
  }

  @media only screen and (${device.lg}) {
    display: none;
  }
`;

export const MobileLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  & > a,
  & > div {
    width: 100%;
    border-bottom: 1px solid #000;
    font-size: 1rem;
    font-weight: 500;
    margin: 0 30px;
    padding: 10px;
    cursor: pointer;
  }
`;
