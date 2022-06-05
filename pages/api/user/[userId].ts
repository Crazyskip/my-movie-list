import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { userId },
    method,
  } = req;

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

    return res.status(200).json({ user });
  }

  res.status(404);
};

export default handler;
