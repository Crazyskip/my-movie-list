import type { NextPage } from "next";
import Head from "next/head";
import ContentContainer from "../../../components/contentContainer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { useState } from "react";
import Spinner from "../../../components/spinner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Profile: NextPage = () => {
  const [listName, setListName] = useState("");
  const { data: session } = useSession();

  const router = useRouter();
  const { profileId } = router.query;

  const { data, error } = useSWR(`/api/user/${profileId}`, fetcher);
  const { mutate } = useSWRConfig();

  if (error || data?.success === false)
    return <ContentContainer>An error has occurred.</ContentContainer>;
  if (!data)
    return (
      <ContentContainer>
        <Spinner />
      </ContentContainer>
    );

  const createList = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: listName }),
    };
    fetch("/api/list", requestOptions).then((response) => {
      if (response.status === 201) {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        mutate(`/api/user/${profileId}`);
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
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        mutate(`/api/user/${profileId}`);
      }
    });
  };

  if (!data.user) {
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
        <h1>
          Profile {data.user.username ? data.user.username : data.user.name}
        </h1>
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <button onClick={createList}>Create List</button>
        <h2>Lists ({data.user.lists.length})</h2>
        <div>
          {data.user.lists.map((list: any) => (
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

export default Profile;
