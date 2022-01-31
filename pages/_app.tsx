import "styles/global.css";
import type { AppProps } from "next/app";
import Layout from "components/Layout";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <>
      {Component.authPage ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
};

export default MyApp;
