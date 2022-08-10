import type { NextPage } from "next";
import Head from "next/head";
import ContentContainer from "../../components/contentContainer";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 5px 10px;
`;

const StyledSubmit = styled.input`
  padding: 5px 10px;
  margin: 0 10px;
  cursor: pointer;
`;

const NewUser: NextPage = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const [username, setUsername] = useState("");

  const updateUsername = (e: any) => {
    e.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    };
    fetch("/api/user", requestOptions).then((response) => {
      if (response.status === 200) {
        router.push(`/u/${session?.userId}`);
      }
    });
  };

  return (
    <>
      <Head>
        <title>New User - My Movie List</title>
        <meta
          name="description"
          content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentContainer as="main">
        <h1>New User</h1>
        <form onSubmit={updateUsername}>
          <StyledInput
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <StyledSubmit type="submit" value="Set Username" />
        </form>
      </ContentContainer>
    </>
  );
};

export default NewUser;
