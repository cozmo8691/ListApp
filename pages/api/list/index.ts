import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

const fetchLists = async (req: NextApiRequest, res: NextApiResponse) => {
  const lists = await prisma.list.findMany({
    where: {},
    orderBy: {
      updatedAt: "desc",
    },
  });

  res.json(lists);
};

export default fetchLists;
