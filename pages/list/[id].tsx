import { NextPageContext } from "next";
import Link from "next/link";
import nookies from "nookies";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { update } from "lib/mutations";
import Button from "components/Button";
import Input from "components/Input";
import Modal from "components/Modal";
import Textarea from "components/Textarea";

import { validateToken } from "lib/auth";
import prisma from "lib/prisma";
import { JwtPayload } from "jsonwebtoken";

const EditListPage = ({
  list: { id, name, items, description },
}: {
  list: {
    id: number;
    name: string;
    description: string;
    items: { id: number; name: string; description: string }[];
  };
}) => {
  const [listName, setListName] = useState(name);
  const [listDescription, setListDescription] = useState(description);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [newItems, setNewItems] = useState<
    { name: string; description: string }[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await update({
      id,
      name: listName,
      description: listDescription,
      items: newItems,
    });
    router.push("/");
  };

  const handleItemFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setNewItems((newItems: { name: string; description: string }[]) => [
      { name: itemName, description: itemDescription },
      ...newItems,
    ]);
    setShowModal(false);
  };

  const ItemForm = (
    <>
      <form onSubmit={handleItemFormSubmit}>
        <Input
          name="itemNameInput"
          label="Add item"
          value={itemName}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setItemName(e.target.value)
          }
        />
        <Textarea
          name="itemDescriptionInput"
          label="Description"
          value={itemDescription}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setItemDescription(e.target.value)
          }
          placeholder="Enter item description"
        />
        <Button label="Done" />
      </form>
    </>
  );

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Link href="/">
        <a>Home</a>
      </Link>
      <h1 className="text-center text-4xl w-96 mt-12 text-gray-700">
        Edit list
      </h1>
      <div className="w-300 p-6 rounded-lg shadow-lg bg-white max-w-sm mt-4">
        <form onSubmit={handleSubmit}>
          <Input
            name="nameInput"
            label="Edit list"
            value={listName}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setListName(e.target.value)
            }
          />
          <Textarea
            name="descriptionInput"
            label="Description"
            value={listDescription}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setListDescription(e.target.value)
            }
            placeholder="Enter list description"
          />
          {[...items, ...newItems].map((item) => {
            return <div key={item.name}>{item.name}</div>;
          })}
          <div
            className="my-4 cursor-pointer"
            onClick={() => setShowModal(true)}>
            Add item +
          </div>
          <Button label="Save" />
        </form>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {ItemForm}
      </Modal>
    </div>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const cookies = nookies.get(ctx);
  const { query } = ctx;

  type customPayload = JwtPayload & { id: number };

  let user: customPayload;

  try {
    user = validateToken(cookies.LISTAPP_ACCESS_TOKEN) as customPayload;
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  if (!query.id) {
    return {
      props: {},
    };
  }

  const [list] = await prisma.list.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      items: true,
    },
  });

  console.log(list);

  return {
    props: { list },
  };
};
export default EditListPage;
