import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Movie, Show } from "../../commons/types";
import { CardContainer, CardContent, CardImage, CardTitle } from "./styles";

// Returns date in format dd mon YYYY
const getDateString = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return formattedDate;
};

const isMovie = (film: any): film is Movie => {
  return film.release_date;
};

const FilmCard = ({ film }: { film: Movie | Show }) => {
  if (isMovie(film) && (film.release_date === "" || !film.poster_path))
    return null;
  if (!isMovie(film) && (film.first_air_date === "" || !film.poster_path))
    return null;

  const link = `/${isMovie(film) ? "movies" : "shows"}/${film.id}`;

  return (
    <CardContainer>
      <Link href={link}>
        <a>
          <CardImage
            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
            width="250"
            height="375"
            alt={isMovie(film) ? film.title : film.name}
            layout="responsive"
          />
        </a>
      </Link>
      <CardContent>
        <Link href={link}>
          <a>
            <CardTitle>{isMovie(film) ? film.title : film.name}</CardTitle>
          </a>
        </Link>
        <FontAwesomeIcon
          style={{ marginRight: "5px", color: "#e6d817" }}
          icon={faStar}
        />
        {film.vote_average.toFixed(1)}
        <div>
          {isMovie(film)
            ? getDateString(film.release_date)
            : getDateString(film.first_air_date)}
        </div>
      </CardContent>
    </CardContainer>
  );
};

export default FilmCard;
