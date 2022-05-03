import type { NextPage } from "next";
import Head from "next/head";
import ContentContainer from "../components/contentContainer";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login - My Movie List</title>
        <meta
          name="description"
          content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentContainer as="main">
        <h1>Login</h1>
      </ContentContainer>
    </>
  );
};

export default Login;
