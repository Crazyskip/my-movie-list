import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { showId },
    method,
  } = req;

  const session = await getSession({ req });

  if (method === "GET") {
    const detailsPromise = fetch(
      `https://api.themoviedb.org/3/tv/${showId}?api_key=${TMDB_API_KEY}&language=en-US`
    );

    const castPromise = fetch(
      `https://api.themoviedb.org/3/tv/${showId}/credits?api_key=${TMDB_API_KEY}&language=en-US`
    );

    const reviewsPromise = fetch(
      `https://api.themoviedb.org/3/tv/${showId}/reviews?api_key=${TMDB_API_KEY}&page=1&language=en-US`
    );

    const recommendedPromise = fetch(
      `https://api.themoviedb.org/3/tv/${showId}/recommendations?api_key=${TMDB_API_KEY}&language=en-US&page=1`
    );

    const [
      detailsResponse,
      castResponse,
      reviewsResponse,
      recommendedResponse,
    ] = await Promise.all([
      detailsPromise,
      castPromise,
      reviewsPromise,
      recommendedPromise,
    ]);

    const [show, { cast, crew }, reviews, recommended] = await Promise.all([
      detailsResponse.json(),
      castResponse.json(),
      reviewsResponse.json(),
      recommendedResponse.json(),
    ]);

    show.cast = cast;
    show.crew = crew;
    show.reviews = reviews.results;
    show.recommended = recommended.results;

    if (session) {
      const { inWatchlist, inFavourites } = await getInLists(
        session.userId as string,
        show
      );
      show.inWatchlist = inWatchlist;
      show.inFavourites = inFavourites;
    } else {
      show.inWatchlist = false;
      show.inFavourites = false;
    }

    return res.status(200).json(show);
  }

  res.status(404);
};

const getInLists = async (userId: string, show: any) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      watchlist: true,
      favourites: true,
    },
  });

  if (user) {
    const inWatchlist = user.watchlist.some(
      (film: any) => film.id === show.id && film.type === "shows"
    );

    const inFavourites = user.favourites.some(
      (film: any) => film.id === show.id && film.type === "shows"
    );

    return { inWatchlist, inFavourites };
  }

  return { inWatchlist: false, inFavourites: false };
};

export default handler;
