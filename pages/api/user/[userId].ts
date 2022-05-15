import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { userId },
    method,
  } = req;

  const session = await getSession({ req });
  console.log(session);

  if (method === "GET") {
    const user: object | null = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
      select: {
        username: true,
        name: true,
        createdAt: true,
        lists: true,
      },
    });

    // if (session?.user?.email) {
    //   const result = await prisma.list.create({
    //     data: {
    //       name: "Watchlist",
    //       author: { connect: { email: session.user.email } },
    //     },
    //   });

    //   console.log(result);
    // }

    return res.status(200).json({ user });
  }

  res.status(404);
};

export default handler;
