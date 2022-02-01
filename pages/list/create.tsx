import { NextPageContext } from "next";
import Link from "next/link";
import nookies from "nookies";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { create } from "lib/mutations";
import Button from "components/Button";
import Input from "components/Input";

import { validateToken } from "lib/auth";
// import prisma from "lib/prisma";

const CreateListPage = () => {
  const [listName, setListName] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // setIsLoading(true);

    await create({ name: listName });
    // setIsLoading(false);
    router.push("/");
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Link href="/">
        <a>Home</a>
      </Link>
      <h1 className="text-center text-4xl w-96 mt-12 text-gray-700">
        Create list
      </h1>
      <div className="w-300 p-6 rounded-lg shadow-lg bg-white max-w-sm mt-4">
        <form onSubmit={handleSubmit}>
          <Input
            name="nameInput"
            label="List name"
            value={listName}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setListName(e.target.value)
            }
            placeholder="Enter list name"
          />
          <Button label="Create list" />
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const cookies = nookies.get(ctx);
  let user;
  try {
    user = validateToken(cookies.LISTAPP_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  return {
    props: {},
  };
};
export default CreateListPage;
