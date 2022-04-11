import Link from "next/link";
import { CardContainer, CardContent, CardImage, CardTitle } from "./styles";

const FilmCard = ({ film, type }: any) => (
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
        Released: {type === "movies" ? film.release_date : film.first_air_date}
      </div>
    </CardContent>
  </CardContainer>
);

export default FilmCard;
