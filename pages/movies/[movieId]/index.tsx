import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import CastCard from "../../../components/castCard";
import ContentContainer from "../../../components/contentContainer";
import FilmHeader from "../../../components/filmHeader";
import Link from "next/link";
import Review from "../../../components/review";
import styled from "styled-components";
import Image from "next/image";

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-bottom: 15px;
`;

const ViewMore = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  min-width: 150px;
`;

const StyledLinkContainer = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;

  h4 {
    margin: 0 8px;
  }
`;

const StyledLink = styled.a`
  font-size: 1.1rem;
  font-weight: 500;

  &:hover {
    color: #7d7d7d;
  }
`;

const Recommended = styled.a`
  min-width: 300px;
  margin: 0 0 10px 20px;
  border-radius: 10px;

  div {
    display: flex;
    justify-content: space-between;

    h4 {
      margin: 0;
      font-weight: 400;
    }
  }

  img {
    border-radius: 10px;
  }

  &:first-child {
    margin-left: 0;
  }
`;

const Separator = styled.hr`
  border: 0;
  height: 1px;
  width: 100%;
  background-color: #d9d9d9;
  margin: 35px 0;
`;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Movie: NextPage = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data, error } = useSWR(`/api/movies/${movieId}`, fetcher);

  if (error || data?.success === false)
    return <span>An error has occurred.</span>;
  if (!data) return <span>Loading...</span>;

  data.release_date = new Date(data.release_date);

  console.log(data);

  return (
    <>
      <FilmHeader film={data} type="movie" />
      <ContentContainer>
        {data.cast.length ? (
          <>
            <h3>Top Billed Cast</h3>
            <ScrollContainer>
              {data.cast.slice(0, 10).map((member: any) => {
                return <CastCard key={member.id} member={member}></CastCard>;
              })}
              <ViewMore>
                <Link href={`/movies/${movieId}/cast`} passHref>
                  <StyledLinkContainer>
                    <h4>View More</h4>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </StyledLinkContainer>
                </Link>
              </ViewMore>
            </ScrollContainer>
            <Link href={`/movies/${movieId}/cast`} passHref>
              <StyledLink>Full Cast &#38; Crew</StyledLink>
            </Link>
            <Separator />
          </>
        ) : null}

        {data.reviews.length ? (
          <div>
            <h3>Reviews ({data.reviews.length})</h3>
            <Review review={data.reviews[0]} />
            <Link href={`/movies/${movieId}/reviews`} passHref>
              <StyledLink>View all reviews</StyledLink>
            </Link>
            <Separator />
          </div>
        ) : null}

        {data.recommended.length ? (
          <>
            <h3>Recommended</h3>
            <ScrollContainer>
              {data.recommended.map((recommended: any) =>
                recommended.backdrop_path ? (
                  <Link
                    key={recommended.id}
                    href={`/movies/${recommended.id}`}
                    passHref
                  >
                    <Recommended>
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${recommended.backdrop_path}`}
                        width="300"
                        height="169"
                        alt="movie"
                      />
                      <div>
                        <h4>{recommended.title}</h4>
                        <span>
                          <FontAwesomeIcon
                            style={{ marginRight: "5px", color: "#e6d817" }}
                            icon={faStar}
                          />
                          {recommended.vote_average.toFixed(1)}
                        </span>
                      </div>
                    </Recommended>
                  </Link>
                ) : null
              )}
            </ScrollContainer>
          </>
        ) : null}
      </ContentContainer>
    </>
  );
};

export default Movie;
