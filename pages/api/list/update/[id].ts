import prisma from "lib/prisma";
import { validateRoute } from "lib/auth";

export default validateRoute(async (req, res, user) => {
  await Promise.all(
    req.body.items.map(async (item: any) => {
      await prisma.item.create({
        data: {
          name: item.name,
          description: "whatever",
          lists: {
            connect: { id: +req.query.id },
          },
        },
      });
    })
  );

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
