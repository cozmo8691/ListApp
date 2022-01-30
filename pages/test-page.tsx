import { NextPageContext } from "next";
import nookies from "nookies";

import { validateToken } from "lib/auth";
import prisma from "lib/prisma";

const TestPage = () => {
  return <div>Protected test page</div>;
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
export default TestPage;
