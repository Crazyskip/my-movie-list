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

    if (session?.userId === userId) {
      const user = await prisma.user.findUnique({
        where: {
          id: session.userId as string,
        },
        select: {
          favourites: true,
        },
      });

      if (user) {
        const inList = user.favourites.some(
          (film: any) => film.id === body.filmId && film.type === body.filmType
        );

        if (!inList) {
          // Add film to list
          const updatedUser = await prisma.user.update({
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

          if (updatedUser) {
            return res
              .status(200)
              .json({ favourites: updatedUser.favourites, inList: true });
          }
        } else {
          // Remove film from list
          const updatedUser = await prisma.user.update({
            where: {
              id: session.userId as string,
            },
            data: {
              favourites: {
                set: user.favourites.filter(
                  (film) =>
                    film.id !== body.filmId && film.type !== body.filmType
                ),
              },
            },
          });

          if (updatedUser) {
            return res
              .status(200)
              .json({ favourites: updatedUser.favourites, inList: false });
          }
        }
      }
    }
  }

  res.status(404);
};

export default handler;
