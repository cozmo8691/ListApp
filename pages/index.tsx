import { NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import prisma from "lib/prisma";
import Card from "components/Card";

import { useContent } from "content/contentContext";

const Home = ({
  lists = [],
}: {
  lists: { id: number; name: string; description: string }[];
}) => {
  const {
    home: { pageTitle, title, createLink, viewLink },
  } = useContent();

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen h-screen flex flex-col items-center">
        <h1 className="text-center text-6xl w-96 m-12">{title}</h1>
        <p>
          <Link href="/list/create">
            <a>{createLink}</a>
          </Link>
        </p>
        <p>
          <Link href="/list">
            <a>{viewLink}</a>
          </Link>
        </p>
        <div className="w-4/5 flex justify-start items-start flex-wrap">
          {lists.map((props) => (
            <Card key={props.id} {...props} />
          ))}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const lists = await prisma.list.findMany({
    where: {},
    // include: {
    //   items: {},
    // },
  });

  return {
    props: { lists },
  };
};

export default Home;
