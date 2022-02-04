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
import getConfig from "next/config";
import { useContent } from "content/contentContext";

const {
  publicRuntimeConfig: { logoutUrl },
} = getConfig();

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
  const {
    editList: { pageTitle, title, form },
  } = useContent();

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
          name={form.itemName.name}
          label={form.itemName.label}
          value={itemName}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setItemName(e.target.value)
          }
          placeholder={form.itemName.placeholder}
        />
        <Textarea
          name={form.itemDescription.name}
          label={form.itemDescription.label}
          value={itemDescription}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setItemDescription(e.target.value)
          }
          placeholder={form.itemDescription.placeholder}
        />
        <Button label={form.itemCta} />
      </form>
    </>
  );

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Link href="/">
        <a>Home</a>
      </Link>
      <h1 className="text-center text-4xl w-96 mt-12 text-gray-700">{title}</h1>
      <div className="w-300 p-6 rounded-lg shadow-lg bg-white max-w-sm mt-4">
        <form onSubmit={handleSubmit}>
          <Input
            name={form.listName.name}
            label={form.listName.label}
            value={listName}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setListName(e.target.value)
            }
            placeholder={form.listName.placeholder}
          />
          <Textarea
            name={form.listDescription.name}
            label={form.listDescription.label}
            value={listDescription}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setListDescription(e.target.value)
            }
            placeholder={form.listDescription.placeholder}
          />
          {[...items, ...newItems].map((item) => {
            return <div key={item.name}>{item.name}</div>;
          })}
          <div
            className="my-4 cursor-pointer"
            onClick={() => setShowModal(true)}>
            Add item +
          </div>
          <Button label={form.cta} />
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

  type userPayload = JwtPayload & { id: number };

  let user: userPayload;

  try {
    user = validateToken(cookies.LISTAPP_ACCESS_TOKEN) as userPayload;
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: logoutUrl,
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
