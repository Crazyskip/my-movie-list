import styled from "styled-components";

interface MenuProps {
  active: boolean;
}

export const DropdownContainer = styled.div`
  color: #fff;

  &:first-of-type {
    border-top: 1px solid #000;
  }
`;

export const Title = styled.div``;

export const DropdownItems = styled.div<MenuProps>`
  display: ${({ active }) => (active ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: ${({ active }) => (active ? "10px" : "0")}; ;
`;

export const DropdownItem = styled.a`
  width: 100%;
  border-bottom: 1px solid #000;
  font-size: 1rem;
  font-weight: 500;
  margin: 0 30px;
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  color: #000;
`;
