import type { NextPage } from "next";
import Head from "next/head";
import ContentContainer from "../../../components/contentContainer";
import { useRouter } from "next/router";
import useSWR from "swr";
import Spinner from "../../../components/spinner";
import { useEffect, useState } from "react";
import ListBanner from "../../../components/listBanner";
import styled from "styled-components";

const ListsContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Profile: NextPage = () => {
  const router = useRouter();
  const { profileId } = router.query;
  const [watchlistFilm, setWatchlistFilm] = useState({
    poster_path: "/assets/img/blank.webp",
  });
  const [favouritesFilm, setFavouritesFilm] = useState({
    poster_path: "/assets/img/blank.webp",
  });

  const { data: profileData, error } = useSWR(
    `/api/user/${profileId}`,
    fetcher
  );

  useEffect(() => {
    if (profileData) {
      if (profileData.user.watchlist.length > 0) {
        fetch(
          `/api/${profileData.user.watchlist[0].type}/${profileData.user.watchlist[0].id}`
        ).then((response) => {
          if (response.status === 200) {
            response.json().then((watchlistFilmData) => {
              watchlistFilmData.poster_path = `https://image.tmdb.org/t/p/w500${watchlistFilmData.poster_path}`;
              setWatchlistFilm(watchlistFilmData);
            });
          }
        });
      }
      if (profileData.user.favourites.length > 0) {
        fetch(
          `/api/${profileData.user.favourites[0].type}/${profileData.user.favourites[0].id}`
        ).then((response) => {
          if (response.status === 200) {
            response.json().then((favouritesFilmData) => {
              favouritesFilmData.poster_path = `https://image.tmdb.org/t/p/w500${favouritesFilmData.poster_path}`;
              setFavouritesFilm(favouritesFilmData);
            });
          }
        });
      }
    }
  }, [profileData]);

  if (error || profileData?.success === false)
    return <ContentContainer>An error has occurred.</ContentContainer>;
  if (!profileData)
    return (
      <ContentContainer>
        <Spinner />
      </ContentContainer>
    );

  if (!profileData.user) {
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
          {profileData.user.username
            ? profileData.user.username
            : profileData.user.name}
          &apos;s Profile
        </h1>
        <ListsContainer>
          <ListBanner
            listName="Watchlist"
            profileId={profileId as string}
            listLength={profileData.user.watchlist.length}
            posterPath={watchlistFilm.poster_path}
          />

          <ListBanner
            listName="Favourites"
            profileId={profileId as string}
            listLength={profileData.user.favourites.length}
            posterPath={favouritesFilm.poster_path}
          />
        </ListsContainer>
      </ContentContainer>
    </>
  );
};

export default Profile;
