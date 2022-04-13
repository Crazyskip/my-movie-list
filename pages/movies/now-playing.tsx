import type { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";
import CardsContainer from "../../components/cardsContainer";
import FilmCard from "../../components/filmCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const NowPlayingMovies: NextPage = () => {
  const { data, error } = useSWR("/api/movies/now-playing?page=1", fetcher);

  if (error) return <span>An error has occurred.</span>;
  if (!data) return <span>Loading...</span>;

  return (
    <div>
      <Head>
        <title>Now Playing Movies - My Movie List</title>
        <meta
          name="description"
          content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Now Playing Movies</h1>
      <CardsContainer>
        {data.results.map((movie: any) => (
          <FilmCard key={movie.id} film={movie} type="movies" />
        ))}
      </CardsContainer>
    </div>
  );
};

export default NowPlayingMovies;
