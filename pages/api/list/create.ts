import prisma from "lib/prisma";
import { validateRoute } from "lib/auth";

export default validateRoute(async (req, res, user) => {
  const newList = await prisma.list.create({
    data: {
      name: req.body.name,
      user: {
        connect: { id: user.id },
      },
      items: {
        create: [],
      },
    },
  });

  res.json(newList);
});
