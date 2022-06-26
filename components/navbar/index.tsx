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
import { useEffect, useState } from "react";
import MobileDropdown from "./mobileDropdown";
import { useRouter } from "next/router";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) {
      setActive(!active);
    }
  }, [router.asPath]);

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
            <Link href={`/u/${session.userId}`} passHref>
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
          <MobileDropdown
            title="Movies"
            linkItems={[
              { name: "Popular", link: "/movies" },
              { name: "Now Playing", link: "/movies/now-playing" },
              { name: "Upcoming", link: "/movies/upcoming" },
              { name: "Top Rated", link: "/movies/top-rated" },
            ]}
          />
          <MobileDropdown
            title="TV Shows"
            linkItems={[
              { name: "Popular", link: "/shows" },
              { name: "Currently Airing", link: "/movies/airing" },
              { name: "Top Rated", link: "/movies/top-rated" },
            ]}
          />
          {session ? (
            <>
              <Link href={`/u/${session.userId}`} passHref>
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
