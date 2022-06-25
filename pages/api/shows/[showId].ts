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

    return res.status(200).json(show);
  }

  res.status(404);
};

export default handler;
