import {
  NavContainer,
  NavLink,
  NavLinkGroup,
  NavLinks,
  NavLogo,
} from "./styles";
import Link from "next/link";

const Navbar = () => (
  <NavContainer>
    <Link href="/" passHref>
      <NavLogo>MyMovieList</NavLogo>
    </Link>
    <NavLinks>
      <NavLinkGroup>
        <Link href="/movies" passHref>
          <NavLink>Movies</NavLink>
        </Link>
        <Link href="/shows" passHref>
          <NavLink>TV Shows</NavLink>
        </Link>
      </NavLinkGroup>
      <NavLinkGroup>
        <Link href="/login" passHref>
          <NavLink>Login</NavLink>
        </Link>
        <Link href="/signup" passHref>
          <NavLink>Signup</NavLink>
        </Link>
      </NavLinkGroup>
    </NavLinks>
  </NavContainer>
);

export default Navbar;
