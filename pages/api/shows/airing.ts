import type { NextApiRequest, NextApiResponse } from "next";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { page = 1 },
    method,
  } = req;

  if (method === "GET") {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
    );

    const shows = await response.json();

    return res.status(200).json(shows);
  }

  res.status(404);
};

export default handler;
