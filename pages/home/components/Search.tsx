import { useState, ChangeEvent } from "react";
import { useBlog } from "@/contexts/BlogContext";
import { Post } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import styles from "./search.module.css";
import Head from "next/head";

export default function Search() {
  const { posts } = useBlog();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Post[]>([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setQuery(searchValue);

    if (searchValue.trim() === "") {
      setSearchResults([]);
      return;
    }

    // 검색 로직
    const results = posts.filter((post) => {
      const titleMatch = post.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const contentMatch = post.content
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const authorMatch = post.author.name
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const categoryMatch = post.category
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      return titleMatch || contentMatch || authorMatch || categoryMatch;
    });

    setSearchResults(results);
  };

  return (
    <>
      <Head>
        <title>검색 | Code Factory Blog</title>
        <meta name="description" content="블로그 콘텐츠를 검색하세요" />
      </Head>

      <div className={styles.searchContainer}>
        <h1 className={styles.title}>검색</h1>

        <div className={styles.searchInputContainer}>
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            value={query}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          <div className={styles.searchIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        <div className={styles.searchResults}>
          {query.trim() === "" ? (
            <p className={styles.emptyMessage}>
              검색어를 입력하여 글을 찾아보세요.
            </p>
          ) : searchResults.length === 0 ? (
            <p className={styles.emptyMessage}>검색 결과가 없습니다.</p>
          ) : (
            <>
              <p className={styles.resultCount}>
                {searchResults.length}개의 검색 결과
              </p>
              <div className={styles.resultList}>
                {searchResults.map((post) => (
                  <div key={post.id} className={styles.resultItem}>
                    <div className={styles.postImage}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={120}
                        height={80}
                        className={styles.thumbnail}
                      />
                    </div>
                    <div className={styles.postInfo}>
                      <Link href={`/posts/${post.slug}`}>
                        <h3 className={styles.postTitle}>{post.title}</h3>
                      </Link>
                      <p className={styles.postExcerpt}>{post.excerpt}</p>
                      <div className={styles.postMeta}>
                        <span className={styles.postCategory}>
                          {post.category}
                        </span>
                        <span className={styles.postDate}>{post.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
