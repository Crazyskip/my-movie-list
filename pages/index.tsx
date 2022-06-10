import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import useSWR from "swr";
import device from "../commons/breakpoints";
import { Movie, Show } from "../commons/types";
import ContentContainer from "../components/contentContainer";
import FilmCard from "../components/filmCard";
import Spinner from "../components/spinner";

const Hero = styled.div`
  position: relative;

  div {
    position: absolute;
    top: 20%;
    left: 50px;
    color: #ffffff;
    font-size: 1.25rem;

    @media only screen and (${device.md}) {
      top: 30%;
    }

    @media only screen and (${device.lg}) {
      font-size: 1.5rem;
    }

    @media only screen and (${device.xl}) {
      font-size: 2rem;
    }

    h2,
    p {
      margin: 0;
    }
  }
`;

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  padding-bottom: 15px;

  div {
    height: inherit !important;
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

const Home: NextPage = () => {
  const { data: popularMovies, error: popularMoviesError } = useSWR(
    "/api/movies/popular?page=1",
    fetcher
  );

  const { data: airingShows, error: airingShowsError } = useSWR(
    "/api/shows/airing?page=1",
    fetcher
  );

  if (popularMoviesError || airingShowsError)
    return <ContentContainer>An error has occurred.</ContentContainer>;
  if (!popularMovies || !airingShows)
    return (
      <ContentContainer>
        <Spinner />
      </ContentContainer>
    );

  return (
    <div style={{ marginTop: "-30px" }}>
      <Head>
        <title>Home - My Movie List</title>
        <meta
          name="description"
          content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentContainer as="main">
        <Hero>
          <Image
            src="https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,28044a,aa00d1)/uozb2VeD87YmhoUP1RrGWfzuCrr.jpg"
            height="600"
            width="1920"
            alt="header"
            layout="responsive"
          />
          <div>
            <h2>Welcome.</h2>
            <p>
              Millions of movies, TV shows and people to discover. Explore now.
            </p>
          </div>
        </Hero>
        <h2>What&apos;s Popular</h2>
        <ScrollContainer>
          {popularMovies.results.map((movie: Movie) => {
            return <FilmCard key={movie.id} film={movie} />;
          })}
        </ScrollContainer>

        <Separator />

        <h2>What&apos;s Playing</h2>
        <ScrollContainer>
          {airingShows.results.map((show: Show) => {
            return <FilmCard key={show.id} film={show} />;
          })}
        </ScrollContainer>
      </ContentContainer>
    </div>
  );
};

export default Home;
