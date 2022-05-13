import type { NextPage } from "next";
import Head from "next/head";
import ContentContainer from "../components/contentContainer";
import { useSession, signIn } from "next-auth/react";
import GoogleButton from "react-google-button";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  console.log(status);

  if (status === "loading") {
    return <p>Loading...</p>;
  } else if (status === "authenticated") {
    router.push("/");
    return <></>;
  }

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
        <GoogleButton onClick={() => signIn("google")} />
      </ContentContainer>
    </>
  );
};

export default Login;
