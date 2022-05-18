import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const session = await getSession({ req });
  if (session) {
    if (method === "PUT") {
      if (body.username && body.username !== "") {
        const updatedUser = await prisma.user.update({
          where: {
            id: session.userId as string,
          },
          data: {
            username: body.username,
          },
        });
        return res.status(200).json({ updatedUser });
      }
    }
  }

  res.status(404);
};

export default handler;
