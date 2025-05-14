import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Post } from "@/types/types";
import styles from "./ApiExample.module.css";

export default function ApiExamplePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  // 모든 포스트 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();

        if (data.success) {
          setPosts(data.data);

          // 카테고리 추출
          const uniqueCategories = Array.from(
            new Set(data.data.map((post: Post) => post.category))
          );
          setCategories(uniqueCategories as string[]);
        } else {
          setError("Failed to fetch posts");
        }
      } catch (err) {
        setError("Error connecting to API");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 특정 슬러그의 포스트 가져오기
  const fetchPostBySlug = async () => {
    if (!slug.trim()) {
      alert("Please enter a slug");
      return;
    }

    setLoading(true);
    setSelectedPost(null);

    try {
      const res = await fetch(`/api/posts/${slug}`);
      const data = await res.json();

      if (data.success) {
        setSelectedPost(data.data);
      } else {
        alert(data.message || "Post not found");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching post");
    } finally {
      setLoading(false);
    }
  };

  // 특정 카테고리의 포스트 가져오기
  const fetchPostsByCategory = async () => {
    if (!selectedCategory) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/posts?category=${selectedCategory}`);
      const data = await res.json();

      if (data.success) {
        setPosts(data.data);
      } else {
        setError("Failed to fetch posts");
      }
    } catch (err) {
      setError("Error connecting to API");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 카테고리 변경 시 자동 호출
  useEffect(() => {
    if (selectedCategory) {
      fetchPostsByCategory();
    }
  }, [selectedCategory]);

  return (
    <>
      <Head>
        <title>API 라우트 예제 | Code Factory Blog</title>
        <meta
          name="description"
          content="Next.js의 API 라우트 사용 예제 페이지입니다."
        />
      </Head>

      <div className={styles.container}>
        <h1 className={styles.title}>API 라우트 예제</h1>
        <p className={styles.description}>
          Next.js의 API 라우트 기능을 사용하여 서버리스 API를 구현한 예제입니다.
        </p>

        <div className={styles.categoryFilter}>
          <h3>카테고리 필터</h3>
          <div className={styles.categories}>
            <button
              className={`${styles.categoryBtn} ${
                !selectedCategory ? styles.active : ""
              }`}
              onClick={() => setSelectedCategory("")}
            >
              전체
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryBtn} ${
                  selectedCategory === category ? styles.active : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2>슬러그로 포스트 찾기</h2>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="슬러그 입력 (예: my-first-post)"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className={styles.searchInput}
            />
            <button onClick={fetchPostBySlug} className={styles.searchButton}>
              검색
            </button>
          </div>

          {selectedPost && (
            <div className={styles.postDetail}>
              <h3>{selectedPost.title}</h3>
              <p className={styles.meta}>
                <span className={styles.category}>{selectedPost.category}</span>
                <span className={styles.date}>{selectedPost.date}</span>
              </p>
              <p className={styles.excerpt}>{selectedPost.excerpt}</p>
              <Link
                href={`/posts/${selectedPost.slug}`}
                className={styles.viewLink}
              >
                포스트 보기
              </Link>
            </div>
          )}
        </div>

        <div className={styles.section}>
          <h2>전체 포스트 목록</h2>
          {loading ? (
            <p className={styles.loading}>로딩 중...</p>
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <div className={styles.postsList}>
              {posts.length === 0 ? (
                <p>포스트가 없습니다.</p>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className={styles.postItem}>
                    <h3>{post.title}</h3>
                    <p className={styles.meta}>
                      <span className={styles.category}>{post.category}</span>
                      <span className={styles.date}>{post.date}</span>
                    </p>
                    <p className={styles.shortExcerpt}>
                      {post.excerpt.slice(0, 100)}...
                    </p>
                    <Link
                      href={`/posts/${post.slug}`}
                      className={styles.readMore}
                    >
                      자세히 보기
                    </Link>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className={styles.apiInfo}>
          <h2>사용 가능한 API 엔드포인트</h2>
          <ul className={styles.endpoints}>
            <li>
              <code>GET /api/posts</code> - 모든 포스트 가져오기
            </li>
            <li>
              <code>GET /api/posts?category=웹개발</code> - 특정 카테고리의
              포스트 가져오기
            </li>
            <li>
              <code>GET /api/posts/[slug]</code> - 특정 슬러그의 포스트 가져오기
            </li>
          </ul>
        </div>

        <div className={styles.navigation}>
          <Link href="/" className={styles.backLink}>
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </>
  );
}
