import type { NextApiRequest, NextApiResponse } from "next";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { movieId },
    method,
  } = req;

  if (method === "GET") {
    const detailsPromise = fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
    );

    const castPromise = fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=en-US`
    );

    const [detailsResponse, castResponse] = await Promise.all([
      detailsPromise,
      castPromise,
    ]);

    const [movie, { cast, crew }] = await Promise.all([
      detailsResponse.json(),
      castResponse.json(),
    ]);

    movie.cast = cast;
    movie.crew = crew;

    return res.status(200).json(movie);
  }

  res.status(404);
};

export default handler;
