import type { NextPage } from "next";
import Head from "next/head";
import ContentContainer from "../components/contentContainer";

const Signup: NextPage = () => {
  return (
    <>
      <Head>
        <title>Signup - My Movie List</title>
        <meta
          name="description"
          content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentContainer as="main">
        <h1>Signup</h1>
      </ContentContainer>
    </>
  );
};

export default Signup;
