import { NextPageContext } from "next";
import Link from "next/link";
import nookies from "nookies";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { create } from "lib/mutations";
import Button from "components/Button";
import Input from "components/Input";
import Textarea from "components/Textarea";

import { validateToken } from "lib/auth";

const CreateListPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const sleep = () => new Promise((resolve) => setTimeout(resolve, 2000));
    await sleep();

    await create({ name, description });
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
          <Input
            name="nameInput"
            label="List name"
            value={name}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            placeholder="Enter list name"
          />
          <Textarea
            name="descriptionInput"
            label="Description"
            value={description}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            placeholder="Enter list description"
          />
          <Button label="Create list" isLoading={isLoading} />
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
