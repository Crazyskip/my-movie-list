import type { NextPage } from "next";
import Head from "next/head";
import ContentContainer from "../../../components/contentContainer";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import Spinner from "../../../components/spinner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Profile: NextPage = () => {
  const router = useRouter();
  const { profileId } = router.query;

  const { data, error } = useSWR(`/api/user/${profileId}`, fetcher);

  console.log(data);

  if (error || data?.success === false)
    return <ContentContainer>An error has occurred.</ContentContainer>;
  if (!data)
    return (
      <ContentContainer>
        <Spinner />
      </ContentContainer>
    );

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
        <h2>Lists</h2>
        <div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link href={`/u/${profileId}/watchlist`}>
                <a>
                  <h3>Watchlist</h3>
                </a>
              </Link>
            </div>
            <hr />
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link href={`/u/${profileId}/favourites`}>
                <a>
                  <h3>Favourites</h3>
                </a>
              </Link>
            </div>
            <hr />
          </div>
        </div>
      </ContentContainer>
    </>
  );
};

export default Profile;
