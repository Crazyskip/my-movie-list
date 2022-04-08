import type { NextPage } from "next";
import Head from "next/head";

const NowPlayingMovies: NextPage = () => {
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
    </div>
  );
};

export default NowPlayingMovies;
