import type { NextApiRequest, NextApiResponse } from "next";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { movieId },
    method,
  } = req;

  if (method === "GET") {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
    );

    const movie = await response.json();

    return res.status(200).json(movie);
  }

  res.status(404);
};

export default handler;
