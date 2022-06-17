import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import useSWR from "swr";
import { Show } from "../../commons/types";
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

const Loader = styled.h4`
  text-align: center;
  margin: 10px 0;
  font-size: 1.8rem;
`;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AiringShows: NextPage = () => {
  const [page, setPage] = useState(1);
  const [shows, setShows] = useState<Show[]>([]);
  const [loadMore, setLoadMore] = useState(false);
  const { data, error } = useSWR("/api/shows/airing?page=1", fetcher);

  useEffect(() => {
    if (data) setShows(data.results);
  }, [data]);

  if (error || data?.success === false)
    return <ContentContainer>An error has occurred.</ContentContainer>;
  if (!data)
    return (
      <ContentContainer>
        <Spinner />
      </ContentContainer>
    );

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
        <InfiniteScroll
          dataLength={shows.length}
          next={addShows}
          hasMore={loadMore}
          loader={<Loader>Loading...</Loader>}
          scrollThreshold={0.85}
        >
          <CardsContainer>
            {shows.map((show: Show) => (
              <FilmCard key={show.id} film={show} />
            ))}
          </CardsContainer>
        </InfiniteScroll>
        {!loadMore ? (
          <StyledButton
            onClick={() => {
              setLoadMore(true);
              addShows();
            }}
          >
            Load More
          </StyledButton>
        ) : null}
      </ContentContainer>
    </>
  );
};

export default AiringShows;
