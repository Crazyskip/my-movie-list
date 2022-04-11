import type { NextApiRequest, NextApiResponse } from "next";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { showId },
    method,
  } = req;

  if (method === "GET") {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${showId}?api_key=${TMDB_API_KEY}&language=en-US`
    );

    const show = await response.json();

    return res.status(200).json(show);
  }

  res.status(404);
};

export default handler;
