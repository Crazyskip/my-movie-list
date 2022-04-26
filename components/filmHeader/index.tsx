import {
  faBookmark,
  faHeart,
  faList,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
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
const getDateString = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date
    .toLocaleDateString("en-AU", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    })
    .replaceAll(" ", "/");
  return formattedDate;
};

const FilmHeader = ({ film, type }: { film: any; type: "movie" | "show" }) => (
  <Header posterImage={`https://image.tmdb.org/t/p/w1280${film.backdrop_path}`}>
    <ContentContainer>
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
              {film.vote_average}
            </span>
            <FunctionButton data-tip={`Add ${type} to favourite list`}>
              <FontAwesomeIcon icon={faHeart} />
            </FunctionButton>
            <FunctionButton data-tip={`Add ${type} to watchlist`}>
              <FontAwesomeIcon icon={faBookmark} />
            </FunctionButton>
            <FunctionButton data-tip={`Add ${type} to custom list`}>
              <FontAwesomeIcon icon={faList} />
            </FunctionButton>
          </FunctionsContainer>
          <Tagline>{film.tagline}</Tagline>
          <Overview>
            <h3>Overview</h3>
            <div>{film.overview}</div>
          </Overview>
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
        </HeaderContent>
      </FlexContainer>
    </ContentContainer>
    <ReactTooltip type="light" effect="solid" place="bottom" />
  </Header>
);

export default FilmHeader;
