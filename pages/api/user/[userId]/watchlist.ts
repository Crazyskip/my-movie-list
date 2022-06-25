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
        watchlist: true,
      },
    });

    if (user) {
      return res.status(200).json({ films: user.watchlist });
    }
  } else if (method === "POST") {
    const session = await getSession({ req });

    if (session?.userId === userId) {
      const user = await prisma.user.findUnique({
        where: {
          id: session.userId as string,
        },
        select: {
          watchlist: true,
        },
      });

      if (user) {
        const inList = user.watchlist.some(
          (film: any) => film.id === body.filmId && film.type === body.filmType
        );

        if (!inList) {
          const updatedUser = await prisma.user.update({
            where: {
              id: session.userId as string,
            },
            data: {
              watchlist: {
                push: {
                  id: body.filmId,
                  type: body.filmType,
                },
              },
            },
          });

          if (updatedUser) {
            return res
              .status(200)
              .json({ watchlist: updatedUser.watchlist, inList: true });
          }
        } else {
          const updatedUser = await prisma.user.update({
            where: {
              id: session.userId as string,
            },
            data: {
              watchlist: {
                set: user.watchlist.filter(
                  (film) =>
                    film.id !== body.filmId && film.type !== body.filmType
                ),
              },
            },
          });

          if (updatedUser) {
            return res
              .status(200)
              .json({ watchlist: updatedUser.watchlist, inList: false });
          }
        }
      }
    }
  }

  res.status(404);
};

export default handler;
