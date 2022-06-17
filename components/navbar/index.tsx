import {
  Dropdown,
  MenuLinks,
  MenuToggle,
  MobileLinks,
  NavContainer,
  NavLink,
  NavLinkGroup,
  NavLinks,
  NavLogo,
} from "./styles";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  return (
    <NavContainer>
      <Link href="/" passHref>
        <NavLogo>MyMovieList</NavLogo>
      </Link>
      <MenuToggle
        role="button"
        tabIndex={0}
        aria-pressed="false"
        aria-label="Toggle nav menu"
        onClick={() => setActive(!active)}
        onKeyDown={(e) =>
          e.code === "Enter" || e.code === "Space" ? setActive(!active) : null
        }
        active={active}
      >
        <div></div>
        <div></div>
        <div></div>
      </MenuToggle>
      <NavLinks active={active}>
        <NavLinkGroup>
          <Dropdown>
            <Link href="/movies" passHref>
              <NavLink>Movies</NavLink>
            </Link>
            <ul>
              <li>
                <Link href="/movies" passHref>
                  <NavLink>Popular</NavLink>
                </Link>
              </li>
              <li>
                <Link href="/movies/now-playing" passHref>
                  <NavLink>Now Playing</NavLink>
                </Link>
              </li>
              <li>
                <Link href="/movies/upcoming" passHref>
                  <NavLink>Upcoming</NavLink>
                </Link>
              </li>
              <li>
                <Link href="/movies/top-rated" passHref>
                  <NavLink>Top Rated</NavLink>
                </Link>
              </li>
            </ul>
          </Dropdown>
          <Dropdown>
            <Link href="/shows" passHref>
              <NavLink>TV Shows</NavLink>
            </Link>
            <ul>
              <li>
                <Link href="/shows" passHref>
                  <NavLink>Popular</NavLink>
                </Link>
              </li>
              <li>
                <Link href="/shows/airing" passHref>
                  <NavLink>Currently Airing</NavLink>
                </Link>
              </li>
              <li>
                <Link href="/shows/top-rated" passHref>
                  <NavLink>Top Rated</NavLink>
                </Link>
              </li>
            </ul>
          </Dropdown>
        </NavLinkGroup>
        {session ? (
          <NavLinkGroup>
            <Link href="/profile" passHref>
              <NavLink>Profile</NavLink>
            </Link>
            <NavLink
              as="div"
              role="button"
              tabIndex={0}
              aria-pressed="false"
              onKeyDown={(e: any) =>
                e.code === "Enter" || e.code === "Space" ? signOut() : null
              }
              onClick={() => signOut()}
            >
              Signout
            </NavLink>
          </NavLinkGroup>
        ) : (
          <NavLinkGroup>
            <Link href="/login" passHref>
              <NavLink>Login</NavLink>
            </Link>
            <Link href="/signup" passHref>
              <NavLink>Signup</NavLink>
            </Link>
          </NavLinkGroup>
        )}
      </NavLinks>
      <MenuLinks active={active}>
        <MobileLinks>
          <div>Movies</div>
          <div>TV Shows</div>
          {session ? (
            <>
              <Link href="/profile" passHref>
                <NavLink>Profile</NavLink>
              </Link>
              <NavLink
                as="div"
                role="button"
                tabIndex={0}
                aria-pressed="false"
                onKeyDown={(e: any) =>
                  e.code === "Enter" || e.code === "Space" ? signOut() : null
                }
                onClick={() => signOut()}
              >
                Signout
              </NavLink>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <NavLink>Login</NavLink>
              </Link>
              <Link href="/signup" passHref>
                <NavLink>Signup</NavLink>
              </Link>
            </>
          )}
        </MobileLinks>
      </MenuLinks>
    </NavContainer>
  );
};

export default Navbar;
