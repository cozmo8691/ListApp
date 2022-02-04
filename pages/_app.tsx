import "styles/global.css";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
import { ContentProvider } from "content/contentContext";
interface CustomAppProps extends Omit<AppProps, "Component"> {
  Component: AppProps["Component"] & { authPage: boolean };
}

const MyApp = ({ Component, pageProps }: CustomAppProps) => {
  return (
    <ContentProvider>
      {Component.authPage ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </ContentProvider>
  );
};

export default MyApp;
