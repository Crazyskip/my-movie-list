import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import ContentContainer from "../../../components/contentContainer";
import {
  Description,
  FlexContainer,
  Header,
  HeaderContent,
  Overview,
  StyledImage,
  Title,
  Year,
} from "./styles";

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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Movie: NextPage = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data, error } = useSWR(`/api/movies/${movieId}`, fetcher);

  if (error) return <span>An error has occurred.</span>;
  if (!data) return <span>Loading...</span>;

  data.release_date = new Date(data.release_date);

  console.log(data);

  return (
    <>
      <Header>
        <ContentContainer>
          <FlexContainer>
            <StyledImage
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              width="300"
              height="450"
              alt={data.title}
            />
            <HeaderContent>
              <Title>
                {data.title} <Year>({data.release_date.getUTCFullYear()})</Year>
              </Title>
              <Description>
                {getDateString(data.release_date)} -{" "}
                {data.genres.map(
                  (genre: { id: number; name: string }, index: number) => (
                    <span key={genre.id}>
                      {index > 0 ? ", " : null}
                      {genre.name}
                    </span>
                  )
                )}{" "}
                -{" "}
                {`${Math.floor(data.runtime / 60)}h ${Math.floor(
                  data.runtime % 60
                )}m`}
              </Description>
              <Overview>
                <h3>Overview</h3>
                <div>{data.overview}</div>
              </Overview>
            </HeaderContent>
          </FlexContainer>
        </ContentContainer>
      </Header>
    </>
  );
};

export default Movie;
