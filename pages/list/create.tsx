import { NextPageContext } from "next";
import Link from "next/link";
import nookies from "nookies";
import { FC, useState } from "react";
import { useRouter } from "next/router";
import { create } from "lib/mutations";
import Button from "components/Button";

import { validateToken } from "lib/auth";
import prisma from "lib/prisma";

const CreateListPage = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await create({ name });
    setIsLoading(false);
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
          <div className="form-group mb-6">
            <label
              htmlFor="listName"
              className="form-label inline-block mb-2 text-gray-700">
              List name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md 
              border-gray-300 shadow-sm 
              focus:border-indigo-300 
              focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter list name"
              id="listName"
            />
          </div>
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
