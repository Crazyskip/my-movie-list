import type { NextPage } from "next";
import Head from "next/head";
import ContentContainer from "../../../components/contentContainer";
import { useRouter } from "next/router";
import useSWR from "swr";
import Spinner from "../../../components/spinner";
import { useSession } from "next-auth/react";
import { Movie, Show } from "../../../commons/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const arrayFetcher = (urlArray: string[]) => Promise.all(urlArray.map(fetcher));

const isMovie = (film: any): film is Movie => {
  return film.release_date;
};

const List: NextPage = () => {
  const router = useRouter();
  const { listId } = router.query;
  const { data: session } = useSession();

  const { data: listData, error } = useSWR(`/api/list/${listId}`, fetcher);

  const urlArray = listData?.list.films.map(
    (film: any) => `/api/${film.type}/${film.id}`
  );

  const { data: filmsData } = useSWR([urlArray], arrayFetcher);

  if (error || listData?.success === false)
    return <ContentContainer>An error has occurred.</ContentContainer>;
  if (!listData)
    return (
      <ContentContainer>
        <Spinner />
      </ContentContainer>
    );

  if (session?.userId !== listData?.list.authorId) {
    return (
      <>
        <Head>
          <title>Edit List - My Movie List</title>
          <meta
            name="description"
            content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ContentContainer as="main">
          <h2>Unauthorised</h2>
        </ContentContainer>
      </>
    );
  }

  if (!listData.list) {
    return (
      <>
        <Head>
          <title>Edit List - My Movie List</title>
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
        <title>Edit List - My Movie List</title>
        <meta
          name="description"
          content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentContainer as="main">
        <h1>Edit {listData.list.name}</h1>
        <hr />
        {filmsData?.map((film: Movie | Show) => (
          <div key={film.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 20px",
              }}
            >
              <h2>{isMovie(film) ? film.title : film.name}</h2>
              <button
                style={{
                  color: "red",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
            <hr />
          </div>
        ))}
      </ContentContainer>
    </>
  );
};

export default List;
