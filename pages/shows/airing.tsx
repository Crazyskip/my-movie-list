import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import CardsContainer from "../../components/cardsContainer";
import ContentContainer from "../../components/contentContainer";
import FilmCard from "../../components/filmCard";

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

const AiringShows: NextPage = () => {
  const [page, setPage] = useState(1);
  const [shows, setShows] = useState([]);
  const { data, error } = useSWR("/api/shows/airing?page=1", fetcher);

  useEffect(() => {
    if (data) setShows(data.results);
  }, [data]);

  if (error || data?.success === false)
    return <span>An error has occurred.</span>;
  if (!data) return <span>Loading...</span>;

  const addShows = async () => {
    const response = await fetch(`/api/shows/airing?page=${page + 1}`);
    const showsRes = await response.json();
    setShows(shows.concat(showsRes.results));
    setPage(page + 1);
  };

  return (
    <>
      <Head>
        <title>Currently Airing TV Shows - My Movie List</title>
        <meta
          name="description"
          content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentContainer as="main">
        <h1>Currently Airing TV Shows</h1>
        <CardsContainer>
          {shows.map((movie: any) => (
            <FilmCard key={movie.id} film={movie} type="shows" />
          ))}
        </CardsContainer>
        <StyledButton onClick={addShows}>Load More</StyledButton>
      </ContentContainer>
    </>
  );
};

export default AiringShows;
