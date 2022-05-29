import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import CardsContainer from "../../components/cardsContainer";
import ContentContainer from "../../components/contentContainer";
import FilmCard from "../../components/filmCard";
import Spinner from "../../components/spinner";

const StyledButton = styled.button`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 25px 0;
  padding: 15px 0;
  text-align: center;
  width: 100%;
  border-radius: 10px;
  border: none;
  background-color: rgb(1, 180, 228);

  &:hover {
    color: #000000;
    cursor: pointer;
  }
`;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UpcomingMovies: NextPage = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const { data, error } = useSWR("/api/movies/upcoming?page=1", fetcher);

  useEffect(() => {
    if (data) setMovies(data.results);
  }, [data]);

  if (error || data?.success === false)
    return <ContentContainer>An error has occurred.</ContentContainer>;
  if (!data)
    return (
      <ContentContainer>
        <Spinner />
      </ContentContainer>
    );

  const addMovies = async () => {
    const response = await fetch(`/api/movies/upcoming?page=${page + 1}`);
    const moviesRes = await response.json();
    setMovies(movies.concat(moviesRes.results));
    setPage(page + 1);
  };

  return (
    <>
      <Head>
        <title>Upcoming Movies - My Movie List</title>
        <meta
          name="description"
          content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentContainer as="main">
        <h1>Upcoming Movies</h1>
        <CardsContainer>
          {movies.map((movie: any) => (
            <FilmCard key={movie.id} film={movie} type="movies" />
          ))}
        </CardsContainer>
        <StyledButton onClick={addMovies}>Load More</StyledButton>
      </ContentContainer>
    </>
  );
};

export default UpcomingMovies;
