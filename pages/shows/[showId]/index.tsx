import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";
import CastCard from "../../../components/castCard";
import ContentContainer from "../../../components/contentContainer";
import FilmHeader from "../../../components/filmHeader";
import Review from "../../../components/review";
import Spinner from "../../../components/spinner";

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

const Separator = styled.hr`
  border: 0;
  height: 1px;
  width: 100%;
  background-color: #d9d9d9;
  margin: 35px 0;
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Show: NextPage = () => {
  const router = useRouter();
  const { showId } = router.query;

  const { data, error } = useSWR(`/api/shows/${showId}`, fetcher);

  if (error || data?.success === false)
    return <ContentContainer>An error has occurred.</ContentContainer>;
  if (!data)
    return (
      <ContentContainer>
        <Spinner />
      </ContentContainer>
    );

  data.release_date = new Date(data.first_air_date);

  return (
    <>
      <Head>
        <title>{data.name} - My Movie List</title>
        <meta
          name="description"
          content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FilmHeader film={data} type="show" />
      <ContentContainer>
        {data.cast.length ? (
          <>
            <h3>Top Billed Cast</h3>
            <ScrollContainer>
              {data.cast.slice(0, 10).map((member: any) => {
                return <CastCard key={member.id} member={member}></CastCard>;
              })}
              <ViewMore>
                <Link href={`/shows/${showId}/cast`} passHref>
                  <StyledLinkContainer>
                    <h4>View More</h4>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </StyledLinkContainer>
                </Link>
              </ViewMore>
            </ScrollContainer>
            <Link href={`/shows/${showId}/cast`} passHref>
              <StyledLink>Full Cast &#38; Crew</StyledLink>
            </Link>
            <Separator />
          </>
        ) : null}

        {data.reviews.length ? (
          <div>
            <h3>Reviews ({data.reviews.length})</h3>
            <Review review={data.reviews[0]} />
            <Link href={`/shows/${showId}/reviews`} passHref>
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
                    href={`/shows/${recommended.id}`}
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
                        <h4>{recommended.name}</h4>
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

export default Show;
