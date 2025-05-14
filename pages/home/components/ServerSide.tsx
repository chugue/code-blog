import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { Post } from "@/types/types";
import mockPosts from "../../../mock/posts.json";
import Image from "next/image";
import styles from "./ServerSide.module.css";

// getServerSideProps는 요청마다 서버에서 실행됨
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // 캐시 제어 (필요한 경우)
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  // 현재 시간 추가 (매 요청마다 다른 값)
  const currentTime = new Date().toISOString();

  // 데이터베이스나 API에서 최신 포스트 가져오기
  // 여기서는 목업 데이터 사용
  const latestPosts = mockPosts.slice(0, 3);

  return {
    props: {
      posts: latestPosts,
      currentTime,
    },
  };
};

export default function ServerSidePage({
  posts,
  currentTime,
}: {
  posts: Post[];
  currentTime: string;
}) {
  return (
    <>
      <Head>
        <title>서버 사이드 렌더링 예제 | Code Factory Blog</title>
        <meta
          name="description"
          content="Next.js의 서버 사이드 렌더링(SSR) 예제 페이지입니다."
        />
      </Head>

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>서버 사이드 렌더링 (SSR)</h1>
          <p className={styles.description}>
            이 페이지는 매 요청마다 서버에서 렌더링됩니다. 새로고침할 때마다
            현재 시간이 업데이트됩니다.
          </p>
          <div className={styles.timestamp}>
            <span>현재 서버 시간: </span>
            <span className={styles.time}>
              {new Date(currentTime).toLocaleString()}
            </span>
          </div>
        </div>

        <div className={styles.explanation}>
          <h2>SSR이란?</h2>
          <p>
            서버 사이드 렌더링(SSR)은 매 요청마다 서버에서 페이지를 렌더링하는
            방식입니다. 이 방식은 다음과 같은 경우에 유용합니다:
          </p>
          <ul>
            <li>항상 최신 데이터가 필요한 페이지</li>
            <li>사용자별 맞춤 콘텐츠가 필요한 페이지</li>
            <li>요청 시점의 정보(쿠키, 세션 등)에 의존하는 페이지</li>
          </ul>
        </div>

        <section className={styles.posts}>
          <h2 className={styles.sectionTitle}>최신 포스트</h2>
          <div className={styles.postGrid}>
            {posts.map((post) => (
              <div key={post.id} className={styles.postCard}>
                <div className={styles.imageContainer}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={225}
                    className={styles.postImage}
                  />
                </div>
                <div className={styles.postContent}>
                  <span className={styles.category}>{post.category}</span>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                  <Link
                    href={`/posts/${post.slug}`}
                    className={styles.readMore}
                  >
                    자세히 보기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className={styles.navigation}>
          <Link href="/" className={styles.backLink}>
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </>
  );
}
