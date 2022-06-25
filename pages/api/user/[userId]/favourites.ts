import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { userId },
    body,
    method,
  } = req;

  if (method === "GET") {
    const user = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
      select: {
        favourites: true,
      },
    });

    if (user) {
      return res.status(200).json({ films: user.favourites });
    }
  } else if (method === "POST") {
    const session = await getSession({ req });

    if (session) {
      const user = await prisma.user.update({
        where: {
          id: session.userId as string,
        },
        data: {
          favourites: {
            push: {
              id: body.filmId,
              type: body.filmType,
            },
          },
        },
      });

      if (user) {
        return res.status(200).json({ films: user.favourites });
      }
    }
  }

  res.status(404);
};

export default handler;
