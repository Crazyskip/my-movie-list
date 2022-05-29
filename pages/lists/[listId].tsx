import type { NextPage } from "next";
import Head from "next/head";
import ContentContainer from "../../components/contentContainer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import FilmCard from "../../components/filmCard";
import CardsContainer from "../../components/cardsContainer";
import Spinner from "../../components/spinner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const arrayFetcher = (urlArray: string[]) => Promise.all(urlArray.map(fetcher));

const List: NextPage = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { listId } = router.query;

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

  if (!listData.list) {
    return (
      <>
        <Head>
          <title>List - My Movie List</title>
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
        <title>List - My Movie List</title>
        <meta
          name="description"
          content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentContainer as="main">
        <h1>{listData.list.name}</h1>
        <CardsContainer>
          {filmsData?.map((film: any) => (
            <FilmCard
              key={film.id}
              film={film}
              type={film.number_of_seasons ? "shows" : "movies"}
            />
          ))}
        </CardsContainer>
      </ContentContainer>
    </>
  );
};

export default List;
