import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  const session = await getSession({ req });

  if (method === "POST") {
    if (session) {
      if (session.user?.email && body.listName) {
        if (body.listName === "Watchlist") {
          let watchlist = await prisma.list.findFirst({
            where: {
              name: "Watchlist",
              authorId: session.userId as string,
            },
          });

          if (!watchlist) {
            watchlist = await prisma.list.create({
              data: {
                name: "Watchlist",
                author: { connect: { email: session.user.email } },
              },
            });
          }

          const result = await prisma.list.update({
            where: {
              id: watchlist.id,
            },
            data: {
              films: {
                push: {
                  id: body.filmId,
                  type: body.filmType,
                },
              },
            },
          });

          return res.status(200).json({ result });
        } else if (body.listName === "Favourites") {
          let favourites = await prisma.list.findFirst({
            where: {
              name: "Favourites",
              authorId: session.userId as string,
            },
          });

          if (!favourites) {
            favourites = await prisma.list.create({
              data: {
                name: "Favourites",
                author: { connect: { email: session.user.email } },
              },
            });
          }

          const result = await prisma.list.update({
            where: {
              id: favourites.id,
            },
            data: {
              films: {
                push: {
                  id: body.filmId,
                  type: body.filmType,
                },
              },
            },
          });

          return res.status(200).json({ result });
        }
      }
    }
  }

  res.status(404);
};

export default handler;
