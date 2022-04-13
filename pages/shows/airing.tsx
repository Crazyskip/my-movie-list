import type { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";
import CardsContainer from "../../components/cardsContainer";
import FilmCard from "../../components/filmCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AiringShows: NextPage = () => {
  const { data, error } = useSWR("/api/shows/popular?page=1", fetcher);

  if (error) return <span>An error has occurred.</span>;
  if (!data) return <span>Loading...</span>;

  return (
    <div>
      <Head>
        <title>Currently Airing TV Shows - My Movie List</title>
        <meta
          name="description"
          content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Currently Airing TV Shows</h1>
      <CardsContainer>
        {data.results.map((movie: any) => (
          <FilmCard key={movie.id} film={movie} type="shows" />
        ))}
      </CardsContainer>
    </div>
  );
};

export default AiringShows;
