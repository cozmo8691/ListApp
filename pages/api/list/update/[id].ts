import prisma from "lib/prisma";
import { validateRoute } from "lib/auth";

export default validateRoute(async (req, res, user) => {
  await Promise.all(
    req.body.items.map(async ({ name, description }: any) => {
      await prisma.item.create({
        data: {
          name,
          description,
          list: {
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
      description: req.body.listDescription,
    },
  });

  res.json(updatedList);
});
