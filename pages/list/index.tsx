import { NextPageContext } from "next";
import Link from "next/link";
import nookies from "nookies";
import { validateToken } from "lib/auth";
import prisma from "lib/prisma";
import getConfig from "next/config";
import { JwtPayload } from "jsonwebtoken";

const {
  publicRuntimeConfig: { logoutUrl },
} = getConfig();

const EditListPage = ({
  lists = [],
}: {
  lists: { id: number; name: string }[];
}) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Link href="/">
        <a>Home</a>
      </Link>
      <h1 className="text-center text-4xl w-96 mt-12 text-gray-700">
        My lists
      </h1>
      <div className="w-300 p-6 rounded-lg shadow-lg bg-white max-w-sm mt-4">
        <ul>
          {lists.map(({ id, name }: { id: number; name: string }) => {
            return (
              <li key={id}>
                <Link href={`/list/${id}`}>
                  <a>{name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const cookies = nookies.get(ctx);

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

  const lists = await prisma.list.findMany({
    where: {
      userId: user.id,
    },
    include: {
      items: {},
    },
  });

  return {
    props: { lists },
  };
};
export default EditListPage;
