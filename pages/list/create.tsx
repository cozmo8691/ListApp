import { NextPageContext } from "next";
import Link from "next/link";
import Head from "next/head";
import nookies from "nookies";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { create } from "lib/mutations";
import Button from "components/Button";
import Input from "components/Input";
import Textarea from "components/Textarea";
import { validateToken } from "lib/auth";
import getConfig from "next/config";
import { useContent } from "content/contentContext";

const {
  publicRuntimeConfig: { logoutUrl },
} = getConfig();

const CreateListPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    createList: {
      pageTitle,
      title,
      form: { listName, listDescription, cta },
    },
  } = useContent();

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
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/">
        <a>Home</a>
      </Link>
      <h1 className="text-center text-4xl w-96 mt-12 text-gray-700">{title}</h1>
      <div className="w-300 p-6 rounded-lg shadow-lg bg-white max-w-sm mt-4">
        <form onSubmit={handleSubmit}>
          <Input
            name={listName.name}
            label={listName.label}
            value={name}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            placeholder={listName.placeholder}
          />
          <Textarea
            name={listDescription.name}
            label={listDescription.label}
            value={description}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            placeholder={listDescription.placeholder}
          />
          <Button label={cta} isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const cookies = nookies.get(ctx);

  try {
    validateToken(cookies.LISTAPP_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: logoutUrl,
      },
    };
  }

  return {
    props: {},
  };
};
export default CreateListPage;
