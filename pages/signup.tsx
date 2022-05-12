import type { NextPage } from "next";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import GoogleButton from "react-google-button";
import ContentContainer from "../components/contentContainer";
import { useRouter } from "next/router";

const Signup: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  } else if (status === "authenticated") {
    router.push("/");
    return <></>;
  }

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
        <>
          <GoogleButton
            label="Sign up with Google"
            onClick={() => signIn("google")}
          />
        </>
      </ContentContainer>
    </>
  );
};

export default Signup;
