import Link from "next/link";
import { useState } from "react";
import {
  DropdownContainer,
  DropdownItem,
  DropdownItems,
  Title,
} from "./styles";

const MobileDropdown = ({
  title,
  linkItems,
}: {
  title: string;
  linkItems: { name: string; link: string }[];
}) => {
  const [active, setActive] = useState(false);
  return (
    <DropdownContainer>
      <Title onClick={() => setActive(!active)}>{title}</Title>
      <DropdownItems active={active}>
        {linkItems.map((item: { name: string; link: string }) => (
          <Link key={item.name} href={item.link} passHref>
            <DropdownItem>{item.name}</DropdownItem>
          </Link>
        ))}
      </DropdownItems>
    </DropdownContainer>
  );
};

export default MobileDropdown;
