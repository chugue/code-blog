import Head from "next/head";
import CategoryFilter from "../components/CategoryFilter";
import BlogPosts from "../components/BlogPosts";
import CallToAction from "../components/CallToAction";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Huly Blog</title>
        <meta
          name="description"
          content="Huly Blog - Latest updates and insights"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CategoryFilter />
      <BlogPosts />
      <CallToAction />
    </div>
  );
}
