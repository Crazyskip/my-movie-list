import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { movieId },
    method,
  } = req;

  const session = await getSession({ req });

  if (method === "GET") {
    const detailsPromise = fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
    );

    const castPromise = fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=en-US`
    );

    const reviewsPromise = fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${TMDB_API_KEY}&page=1&language=en-US`
    );

    const recommendedPromise = fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}&language=en-US&page=1`
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

    const [movie, { cast, crew }, reviews, recommended] = await Promise.all([
      detailsResponse.json(),
      castResponse.json(),
      reviewsResponse.json(),
      recommendedResponse.json(),
    ]);

    movie.cast = cast;
    movie.crew = crew;
    movie.reviews = reviews.results;
    movie.recommended = recommended.results;

    if (session) {
      const { inWatchlist, inFavourites } = await getInLists(
        session.userId as string,
        movie
      );
      movie.inWatchlist = inWatchlist;
      movie.inFavourites = inFavourites;
    } else {
      movie.inWatchlist = false;
      movie.inFavourites = false;
    }

    return res.status(200).json(movie);
  }

  res.status(404);
};

const getInLists = async (userId: string, movie: any) => {
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
      (film: any) => film.id === movie.id && film.type === "movies"
    );

    const inFavourites = user.favourites.some(
      (film: any) => film.id === movie.id && film.type === "movies"
    );

    return { inWatchlist, inFavourites };
  }

  return { inWatchlist: false, inFavourites: false };
};

export default handler;
