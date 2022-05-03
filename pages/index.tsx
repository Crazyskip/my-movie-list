import type { NextPage } from "next";
import Head from "next/head";
import ContentContainer from "../components/contentContainer";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home - My Movie List</title>
        <meta
          name="description"
          content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentContainer as="main">
        <h1>Home</h1>
      </ContentContainer>
    </div>
  );
};

export default Home;
