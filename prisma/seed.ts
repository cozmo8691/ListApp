import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { itemsData } from "./itemsData";

const prisma = new PrismaClient();

const run = async () => {
  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: "jeffpenketh@gmail.com" },
    update: {},
    create: {
      email: "jeffpenketh@gmail.com",
      password: bcrypt.hashSync("test123", salt),
      firstName: "Jeff",
      lastName: "Penketh",
    },
  });

  await Promise.all(
    itemsData.map(async (item) => {
      await prisma.item.create({
        data: {
          name: item.name,
          description: item.description,
        },
      });
    })
  );

  const items = await prisma.item.findMany({});

  await prisma.list.create({
    data: {
      name: `My list`,
      user: {
        connect: { id: user.id },
      },
      items: {
        connect: items.map((item) => ({
          id: item.id,
        })),
      },
    },
  });
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
