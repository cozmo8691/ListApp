import prisma from "lib/prisma";
import { validateRoute } from "lib/auth";

export default validateRoute(async (req, res, user) => {
  const updatedList = await prisma.list.update({
    where: {
      id: +req.query.id,
    },
    data: {
      name: req.body.name,
    },
  });

  res.json(updatedList);
});
