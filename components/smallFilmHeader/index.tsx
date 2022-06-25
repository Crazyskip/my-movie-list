import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import ContentContainer from "../contentContainer";
import { Content, Details, Header, Title, Year } from "./styles";

const SmallFilmHeader = ({
  film,
  type,
}: {
  film: any;
  type: "movie" | "show";
}) => (
  <Header>
    <ContentContainer minHeight="0">
      <Content>
        <Image
          src={`https://image.tmdb.org/t/p/w92${film.poster_path}`}
          alt="poster"
          width="80"
          height="120"
        />
        <Details>
          <Link href={`/${type}s/${film.id}`}>
            <a>
              <Title>
                <h1>{type === "movie" ? film.title : film.name}</h1>
                <Year>({film.release_date.getUTCFullYear()})</Year>
              </Title>
            </a>
          </Link>

          <FontAwesomeIcon
            style={{ marginRight: "5px", color: "#e6d817" }}
            icon={faStar}
          />
          {film.vote_average.toFixed(1)}
        </Details>
      </Content>
    </ContentContainer>
  </Header>
);

export default SmallFilmHeader;
