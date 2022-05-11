import type { NextPage } from "next";
import Head from "next/head";
import ContentContainer from "../components/contentContainer";
import { useSession, signIn, signOut } from "next-auth/react";

const Login: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);

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
        {session ? (
          <>
            Signed in as {session.user?.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            Not signed in <br />
            <button onClick={() => signIn("google")}>Sign in</button>
          </>
        )}
      </ContentContainer>
    </>
  );
};

export default Login;
