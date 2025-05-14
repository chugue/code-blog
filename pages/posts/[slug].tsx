import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { Post } from "../../types/types";
import styles from "@/pages/posts/[slug].module.css";
import Comments from "@/pages/blog/components/Comments";
import mockPosts from "../../mock/posts.json";
import { GetStaticProps, GetStaticPaths } from "next";
import PostLayout from "@/pages/blog/components/PostLayout";

// getStaticPaths로 빌드 시 생성할 경로 정의
export const getStaticPaths: GetStaticPaths = async () => {
  // 실제 프로젝트에서는 API 호출로 슬러그 목록 가져옴
  const paths = mockPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    // fallback: false -> 존재하지 않는 경로는 404
    // fallback: true -> 존재하지 않는 경로를 서버에서 렌더링 시도
    // fallback: 'blocking' -> 서버 사이드 렌더링으로 처리
    fallback: "blocking",
  };
};

// getStaticProps로 각 페이지에 필요한 데이터 미리 가져오기
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // 실제 프로젝트에서는 API 호출로 특정 슬러그에 해당하는 포스트 데이터 가져옴
  const slug = params?.slug;
  const post = mockPosts.find((p) => p.slug === slug);

  // 포스트를 찾지 못한 경우 404 페이지로 리다이렉트
  if (!post) {
    return {
      notFound: true, // 404 페이지로 리다이렉트
    };
  }

  return {
    props: {
      post,
    },
    // ISR 적용 - 60초마다 페이지 재생성 가능
    revalidate: 60,
  };
};

export default function BlogPost({ post }: { post: Post }) {
  const router = useRouter();

  // fallback: true일 때 필요한 로딩 상태 처리
  if (router.isFallback) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <PostLayout>
      <div className={styles.blogPost}>
        <Head>
          <title>{post.title} | Code Factory Blog</title>
          <meta name="description" content={post.excerpt} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.excerpt} />
          <meta property="og:image" content={post.image} />
          <meta property="og:type" content="article" />
        </Head>

        <div className={styles.featuredImage}>
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            width={1200}
            height={600}
            priority
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YxZjFmMSIvPjwvc3ZnPg=="
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.authorInfoContainer}>
            <div className={styles.authorInfo}>
              <div className={styles.authorDetails}>
                <Image
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  width={60}
                  height={60}
                  className={styles.avatar}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiNmMWYxZjEiLz48L3N2Zz4="
                  loading="eager"
                />
                <div className={styles.authorDetailsText}>
                  <p className={styles.username}>{post.author.username}</p>
                  <p className={styles.name}>{post.author.name}</p>
                </div>
              </div>

              <div className={styles.categoryButton}>
                <Link href={`/category/${post.category}`}>
                  <span>{post.category}</span>
                </Link>
              </div>
            </div>
          </div>

          <h1 className={styles.title}>{post.title}</h1>
          <h2 className={styles.subtitle}>{post.subtitle}</h2>

          <div className={styles.dateInfo}>
            <span className={styles.date}>{post.date}</span>
          </div>

          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <Comments />
        </div>
      </div>
    </PostLayout>
  );
}
