import type { NextPage } from "next";
import Head from "next/head";

const UpcomingMovies: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Upcoming Movies - My Movie List</title>
        <meta
          name="description"
          content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Upcoming Movies</h1>
    </div>
  );
};

export default UpcomingMovies;
