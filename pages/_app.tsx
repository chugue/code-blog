import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { BlogProvider } from "../contexts/BlogContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BlogProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </BlogProvider>
  );
}
