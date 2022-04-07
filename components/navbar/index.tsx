import {
  NavContainer,
  NavLink,
  NavLinkGroup,
  NavLinks,
  NavLogo,
} from "./styles";
import Link from "next/link";

interface NavLink {
  name: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Posts", href: "/posts" },
];

const Navbar = () => (
  <NavContainer>
    <Link href="/" passHref>
      <NavLogo>MyMovieList</NavLogo>
    </Link>
    <NavLinks>
      <NavLinkGroup>
        <Link href="/" passHref>
          <NavLink>Movies</NavLink>
        </Link>
        <Link href="/" passHref>
          <NavLink>TV Shows</NavLink>
        </Link>
      </NavLinkGroup>
      <NavLinkGroup>
        <Link href="/" passHref>
          <NavLink>Login</NavLink>
        </Link>
        <Link href="/" passHref>
          <NavLink>Signup</NavLink>
        </Link>
      </NavLinkGroup>
    </NavLinks>
  </NavContainer>
);

export default Navbar;
