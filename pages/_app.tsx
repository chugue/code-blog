import "../styles/globals.css";
import type { AppProps } from "next/app";
import { BlogProvider } from "../contexts/BlogContext";
import RootLayout from "../components/RootLayout";
import { ThemeProvider } from "../contexts/ThemeContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <BlogProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </BlogProvider>
    </ThemeProvider>
  );
}
