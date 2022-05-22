import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { listId },
    method,
  } = req;

  const session = await getSession({ req });

  if (method === "GET") {
    const list: object | null = await prisma.list.findUnique({
      where: {
        id: listId as string,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        films: true,
      },
    });
    return res.status(200).json({ list });
  } else if (method === "DELETE") {
    if (session) {
      const list = await prisma.list.findUnique({
        where: {
          id: listId as string,
        },
        select: {
          authorId: true,
        },
      });
      if (list && list.authorId === session.userId) {
        const deletedList: object | null = await prisma.list.delete({
          where: {
            id: listId as string,
          },
        });
        return res.status(200).json({ deletedList });
      }
    }
  }

  res.status(404);
};

export default handler;
