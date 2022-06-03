import type { NextPage } from "next";
import Head from "next/head";
import ContentContainer from "../components/contentContainer";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { PrismaClient } from "@prisma/client";

const CreateListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;

  input {
    font-size: 1rem;
    padding: 8px 10px;
    border-radius: 5px;
    border: 1px #3d3d3d solid;

    &:focus {
      border: 2px #3d3d3d solid;
    }
  }

  button {
    background-color: #405cf4;
    border-radius: 6px;
    border: none;
    box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
      rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    height: 44px;
    margin: 12px 0 0;
    padding: 0 25px;
    width: 180px;

    &:active {
      box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
        rgba(50, 50, 93, 0.2) 0 6px 15px 0, rgba(0, 0, 0, 0.1) 0 2px 2px 0,
        rgba(50, 151, 211, 0.3) 0 0 0 4px;
    }
  }
`;

const Profile: NextPage = ({ userData }: any) => {
  const [user, setUser] = useState(userData);
  const [listName, setListName] = useState("");

  const createList = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: listName }),
    };
    fetch("/api/list", requestOptions).then((response) => {
      if (response.status === 201) {
        response.json().then(({ result }) => {
          setUser({ ...user, lists: [...user.lists, result] });
        });
        setListName("");
      } else {
        response.json().then(({ message }) => alert(message));
      }
    });
  };

  const deleteList = (listId: string) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`/api/list/${listId}`, requestOptions).then((response) => {
      if (response.status === 200) {
        response.json().then(() => {
          setUser({
            ...user,
            lists: user.lists.filter((list: any) => list.id !== listId),
          });
        });
      }
    });
  };

  if (!user) {
    return (
      <>
        <Head>
          <title>Profile - My Movie List</title>
          <meta
            name="description"
            content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ContentContainer as="main">
          <h2>Oops! We can&apos;t find the page you&apos;re looking for</h2>
        </ContentContainer>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Profile - My Movie List</title>
        <meta
          name="description"
          content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentContainer as="main">
        <h1>Profile {user.username ? user.username : user.name}</h1>
        <CreateListContainer>
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <button onClick={createList}>Create List</button>
        </CreateListContainer>
        <h2>Lists ({user.lists.length})</h2>
        <div>
          {user.lists.map((list: any) => (
            <div key={list.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Link href={`/lists/${list.id}`}>
                  <a>
                    <h3>{list.name}</h3>
                  </a>
                </Link>
                {list.name !== "Watchlist" && list.name !== "Favourites" ? (
                  <div
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => deleteList(list.id)}
                  >
                    Delete
                  </div>
                ) : null}
              </div>
              <hr />
            </div>
          ))}
        </div>
      </ContentContainer>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const prisma = new PrismaClient();
  const session = await getSession(context);

  const user: object | null = await prisma.user.findUnique({
    where: {
      id: session?.userId as string,
    },
    select: {
      username: true,
      name: true,
      createdAt: true,
      lists: true,
    },
  });

  return {
    props: { userData: JSON.parse(JSON.stringify(user)) },
  };
}

export default Profile;
