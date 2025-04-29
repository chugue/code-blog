import Link from "next/link";
import Head from "next/head";
import styles from "../styles/404.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <Head>
        <title>페이지를 찾을 수 없습니다</title>
        <meta
          name="description"
          content="요청하신 페이지를 찾을 수 없습니다."
        />
      </Head>

      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.title}>페이지를 찾을 수 없습니다</h2>
      <p className={styles.description}>
        죄송합니다. 요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        <br />
        홈으로 돌아가시거나 이전 페이지로 이동해주세요.
      </p>

      <Link href="/">
        <button className={styles.homeButton}>홈으로 이동</button>
      </Link>
    </div>
  );
}
