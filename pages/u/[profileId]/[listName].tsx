import type { NextPage } from "next";
import Head from "next/head";
import ContentContainer from "../../../components/contentContainer";
import { useRouter } from "next/router";
import useSWR from "swr";
import FilmCard from "../../../components/filmCard";
import CardsContainer from "../../../components/cardsContainer";
import Spinner from "../../../components/spinner";
import { Movie, Show } from "../../../commons/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const arrayFetcher = (urlArray: string[]) => Promise.all(urlArray.map(fetcher));

const List: NextPage = () => {
  const router = useRouter();
  const { profileId, listName } = router.query;

  const { data: listData, error } = useSWR(
    `/api/user/${profileId}/${listName}`,
    fetcher
  );

  const urlArray = listData?.films.map(
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

  if (!listData.films) {
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
        <h1 style={{ textTransform: "capitalize" }}>{listName}</h1>
        <CardsContainer>
          {filmsData?.map((film: Movie | Show) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </CardsContainer>
      </ContentContainer>
    </>
  );
};

export default List;
