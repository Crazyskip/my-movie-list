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

const FilmCard = ({ film, type }: any) => {
  if (type === "movies" && film.release_date === "") return null;
  if (type === "shows" && film.first_air_date === "") return null;

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
        <div>Rating: {film.vote_average * 10}%</div>
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
