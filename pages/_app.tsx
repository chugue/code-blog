import "../styles/globals.css";
import type { AppProps } from "next/app";
import { BlogProvider } from "../contexts/BlogContext";
import RootLayout from "../components/RootLayout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BlogProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </BlogProvider>
  );
}
