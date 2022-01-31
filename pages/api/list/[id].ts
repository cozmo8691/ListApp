import prisma from "lib/prisma";
import { validateRoute } from "lib/auth";

export default validateRoute(async (req, res, user) => {
  const userLists = await prisma.list.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      name: "asc",
    },
  });

  res.json(userLists);
});
