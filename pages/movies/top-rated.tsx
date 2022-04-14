import type { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";
import CardsContainer from "../../components/cardsContainer";
import ContentContainer from "../../components/contentContainer";
import FilmCard from "../../components/filmCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TopRatedMovies: NextPage = () => {
  const { data, error } = useSWR("/api/movies/top-rated?page=1", fetcher);

  if (error) return <span>An error has occurred.</span>;
  if (!data) return <span>Loading...</span>;

  return (
    <div>
      <Head>
        <title>Top Rated Movies - My Movie List</title>
        <meta
          name="description"
          content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentContainer as="main">
        <h1>Top Rated Movies</h1>
        <CardsContainer>
          {data.results.map((movie: any) => (
            <FilmCard key={movie.id} film={movie} type="movies" />
          ))}
        </CardsContainer>
      </ContentContainer>
    </div>
  );
};

export default TopRatedMovies;
