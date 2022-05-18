import type { NextPage } from "next";
import Head from "next/head";
import ContentContainer from "../../../components/contentContainer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Profile: NextPage = () => {
  const [listName, setListName] = useState("");
  const { data: session } = useSession();

  const router = useRouter();
  const { profileId } = router.query;

  const { data, error } = useSWR(`/api/user/${profileId}`, fetcher);
  const { mutate } = useSWRConfig();

  if (error || data?.success === false)
    return <span>An error has occurred.</span>;
  if (!data) return <span>Loading...</span>;

  const CreateList = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: listName }),
    };
    fetch("/api/list", requestOptions).then((response) => {
      if (response.status === 200) {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        mutate(`/api/user/${profileId}`);
        setListName("");
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
        <button onClick={CreateList}>Create List</button>
        <h2>Lists ({data.user.lists.length})</h2>
        <div>
          {data.user.lists.map((list: any) => (
            <div key={list.id} style={{ padding: "10px 20px" }}>
              <Link href={`/lists/${list.id}`}>
                <a>
                  <h3>{list.name}</h3>
                </a>
              </Link>
              <hr />
            </div>
          ))}
        </div>
      </ContentContainer>
    </>
  );
};

export default Profile;
