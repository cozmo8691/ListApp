import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { useContent } from "content/contentContext";

const Home: NextPage = () => {
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
      </main>
    </div>
  );
};

export default Home;
