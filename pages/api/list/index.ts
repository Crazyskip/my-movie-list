import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  const session = await getSession({ req });

  if (method === "POST") {
    if (session) {
      if (session.user?.email && body.name) {
        const result = await prisma.list.create({
          data: {
            name: body.name,
            author: { connect: { email: session.user.email } },
          },
        });

        return res.status(200).json({ result });
      }
    }
  }

  res.status(404);
};

export default handler;