import type { NextPage } from "next";
import Head from "next/head";
import ContentContainer from "../../../components/contentContainer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Profile: NextPage = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { profileId } = router.query;

  const { data, error } = useSWR(`/api/user/${profileId}`, fetcher);

  if (error || data?.success === false)
    return <span>An error has occurred.</span>;
  if (!data) return <span>Loading...</span>;

  console.log(data);

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
