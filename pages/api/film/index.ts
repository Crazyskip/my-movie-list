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

          const filmIndex = watchlist.films.findIndex(
            (film: any) =>
              film.id === body.filmId && film.type === body.filmType
          );

          if (filmIndex === -1) {
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

            return res.status(200).json({ result, inList: true });
          } else {
            const result = await prisma.list.update({
              where: {
                id: watchlist.id,
              },
              data: {
                films: {
                  set: watchlist.films.filter(
                    (film) => film.id !== body.filmId
                  ),
                },
              },
            });

            return res.status(200).json({ result, inList: false });
          }
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

          const filmIndex = favourites.films.findIndex(
            (film: any) =>
              film.id === body.filmId && film.type === body.filmType
          );

          if (filmIndex === -1) {
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
            return res.status(200).json({ result, inList: true });
          } else {
            const result = await prisma.list.update({
              where: {
                id: favourites.id,
              },
              data: {
                films: {
                  set: favourites.films.filter(
                    (film) => film.id !== body.filmId
                  ),
                },
              },
            });

            return res.status(200).json({ result, inList: false });
          }
        } else {
          let customList = await prisma.list.findFirst({
            where: {
              name: body.listName,
              authorId: session.userId as string,
            },
          });

          if (!customList) {
            customList = await prisma.list.create({
              data: {
                name: body.listName,
                author: { connect: { email: session.user.email } },
              },
            });
          }

          const filmIndex = customList.films.findIndex(
            (film: any) =>
              film.id === body.filmId && film.type === body.filmType
          );

          if (filmIndex === -1) {
            const result = await prisma.list.update({
              where: {
                id: customList.id,
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

            return res.status(200).json({ result, inList: true });
          } else {
            const result = await prisma.list.update({
              where: {
                id: customList.id,
              },
              data: {
                films: {
                  set: customList.films.filter(
                    (film) => film.id !== body.filmId
                  ),
                },
              },
            });

            return res.status(200).json({ result, inList: false });
          }
        }
      }
    }
  }

  res.status(404);
};

export default handler;
