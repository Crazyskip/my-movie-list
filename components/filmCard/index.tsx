import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
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

const FilmCard = ({ film, type }: { film: any; type: "movies" | "shows" }) => {
  if (type === "movies" && (film.release_date === "" || !film.poster_path))
    return null;
  if (type === "shows" && (film.first_air_date === "" || !film.poster_path))
    return null;

  return (
    <CardContainer>
      <Link href={`/${type}/${film.id}`}>
        <a>
          <CardImage
            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
            width="250"
            height="375"
            alt={film.title}
            layout="responsive"
          />
        </a>
      </Link>
      <CardContent>
        <Link href={`/${type}/${film.id}`}>
          <a>
            <CardTitle>{type === "movies" ? film.title : film.name}</CardTitle>
          </a>
        </Link>
        <FontAwesomeIcon
          style={{ marginRight: "5px", color: "#e6d817" }}
          icon={faStar}
        />
        {film.vote_average}
        <div>
          {type === "movies"
            ? getDateString(film.release_date)
            : getDateString(film.first_air_date)}
        </div>
      </CardContent>
    </CardContainer>
  );
};

export default FilmCard;
