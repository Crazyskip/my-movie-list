import type { NextPage } from "next";
import Head from "next/head";

const PopularShows: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Popular TV Shows - My Movie List</title>
        <meta
          name="description"
          content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Popular TV Shows</h1>
    </div>
  );
};

export default PopularShows;
