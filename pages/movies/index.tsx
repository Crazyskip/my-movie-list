import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PopularMovies: NextPage = () => {
  const { data, error } = useSWR("/api/movies/popular?page=1", fetcher);

  if (error) return <span>An error has occurred.</span>;
  if (!data) return <span>Loading...</span>;

  console.log(data);

  return (
    <>
      <Head>
        <title>Popular Movies - My Movie List</title>
        <meta
          name="description"
          content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Popular Movies</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data.results.map((movie: any) => (
          <div
            key={movie.id}
            style={{
              border: "1px solid #aaaaaa",
              margin: "5px",
              width: "252px",
            }}
          >
            <Link href={`/movies/${movie.id}`}>
              <a>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  width="250"
                  height="375"
                  alt={data.title}
                />
              </a>
            </Link>
            <div style={{ padding: "10px" }}>
              <Link href={`/movies/${movie.id}`}>
                <a>
                  <h3 style={{ margin: "8px 0" }}>{movie.title}</h3>
                </a>
              </Link>
              <div>Rating: {movie.vote_average * 10}%</div>
              <div>Released: {movie.release_date}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularMovies;
