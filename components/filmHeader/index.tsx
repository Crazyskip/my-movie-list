import { faBookmark, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSWRConfig } from "swr";
import ContentContainer from "../contentContainer";
import {
  Description,
  Detail,
  DetailsContainer,
  FlexContainer,
  FunctionButton,
  FunctionsContainer,
  Header,
  HeaderContent,
  Overview,
  StyledImage,
  Tagline,
  Title,
  Year,
} from "./styles";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

// Returns date in format dd/mm/YYYY
const getDateString = (dateString: Date) => {
  const formattedDate = dateString
    .toLocaleDateString("en-AU", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    })
    .replaceAll(" ", "/");
  return formattedDate;
};

const FilmHeader = ({
  filmData,
  type,
}: {
  filmData: any;
  type: "movie" | "show";
}) => {
  const [film, setFilm] = useState(filmData);
  const { mutate } = useSWRConfig();
  const { data: session } = useSession();
  const router = useRouter();

  const updateList = (listName: "watchlist" | "favourites") => {
    if (session) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filmId: film.id, filmType: type + "s" }),
      };

      fetch(`/api/user/${session.userId}/${listName}`, requestOptions).then(
        (response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              if (listName === "watchlist") {
                setFilm({ ...film, inWatchlist: data.inList });
              } else if (listName === "favourites") {
                setFilm({ ...film, inFavourites: data.inList });
              }
              document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              mutate(`/api/${type + "s"}/${film.id}`);
            });
          }
        }
      );
    } else {
      router.push("/login");
    }
  };

  return (
    <Header
      posterImage={`https://image.tmdb.org/t/p/w1280${film.backdrop_path}`}
    >
      <ContentContainer minHeight={"0px"}>
        <FlexContainer>
          <StyledImage
            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
            width="300"
            height="450"
            alt={type === "movie" ? film.title : film.name}
          />
          <HeaderContent>
            <Title>
              {type === "movie" ? film.title : film.name}{" "}
              <Year>({film.release_date.getUTCFullYear()})</Year>
            </Title>
            <Description>
              {getDateString(film.release_date)} -{" "}
              {film.genres.map(
                (genre: { id: number; name: string }, index: number) => (
                  <span key={genre.id}>
                    {index > 0 ? ", " : null}
                    {genre.name}
                  </span>
                )
              )}
              {type === "movie"
                ? ` - ${Math.floor(film.runtime / 60)}h ${Math.floor(
                    film.runtime % 60
                  )}m`
                : null}
            </Description>
            <FunctionsContainer>
              <span>
                <FontAwesomeIcon
                  style={{ marginRight: "5px", color: "#e6d817" }}
                  icon={faStar}
                />
                {film.vote_average.toFixed(1)}
              </span>
              <FunctionButton
                data-tip={`Add ${type} to favourite list`}
                onClick={() => updateList("favourites")}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ color: film.inFavourites ? "#fc0f0f" : "#fff" }}
                />
              </FunctionButton>
              <FunctionButton
                data-tip={`Add ${type} to watchlist`}
                onClick={() => updateList("watchlist")}
              >
                <FontAwesomeIcon
                  icon={faBookmark}
                  style={{ color: film.inWatchlist ? "#00c8ff" : "#fff" }}
                />
              </FunctionButton>
            </FunctionsContainer>

            <Tagline>{film.tagline}</Tagline>

            <Overview>
              <h3>Overview</h3>
              <div>{film.overview}</div>
            </Overview>

            {type === "movie" ? (
              <DetailsContainer>
                <Detail>
                  <h4>Status</h4>
                  <p>{film.status}</p>
                </Detail>
                <Detail>
                  <h4>Budget</h4>
                  <p>
                    {film.budget !== 0
                      ? `$${film.budget.toLocaleString()}.00`
                      : "-"}
                  </p>
                </Detail>
                <Detail>
                  <h4>Revenue</h4>
                  <p>
                    {film.revenue !== 0
                      ? `$${film.revenue.toLocaleString()}.00`
                      : "-"}
                  </p>
                </Detail>
              </DetailsContainer>
            ) : null}
          </HeaderContent>
        </FlexContainer>
      </ContentContainer>
      <ReactTooltip type="light" effect="solid" place="bottom" />
    </Header>
  );
};

export default FilmHeader;
