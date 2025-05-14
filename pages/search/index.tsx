import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import { Search as SearchIcon } from "@deemlol/next-icons";

interface SearchResult {
  id: number;
  title: string;
  image: string;
}

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const query = (q as string) || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    // 실제로는 여기서 API를 호출해 검색 결과를 가져옴
    setLoading(true);

    // API 호출 시뮬레이션
    setTimeout(() => {
      setResults([
        {
          id: 1,
          title: "AI 시대, 디자이너를 없앤다니 생각 않",
          image: "/images/article1.jpg",
        },
        {
          id: 2,
          title: "Simplicity 4 : AI 아바타가 발표하는 온라인 컨퍼런스 제작기",
          image: "/images/article2.jpg",
        },
        {
          id: 3,
          title: "Simplicity 4 : 한 번쯤 이상을 꿈꾸본 모두에게",
          image: "/images/article3.jpg",
        },
      ]);
      setLoading(false);
    }, 500);
  }, [query]);

  return (
    <div className={styles.searchPage}>
      {query ? (
        <>
          <div className={styles.searchInputContainer}>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className={styles.searchInput}
              value={query}
              onChange={(e) =>
                router.push(`/search?q=${encodeURIComponent(e.target.value)}`)
              }
            />
            <div className={styles.searchIconContainer}>
              <SearchIcon color="var(--muted)" />
            </div>
          </div>
          <h1 className={styles.searchTitle}>"{query}" 검색 결과</h1>
        </>
      ) : (
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className={styles.searchInput}
            value={query}
            onChange={(e) =>
              router.push(`/search?q=${encodeURIComponent(e.target.value)}`)
            }
          />
          <div className={styles.searchIconContainer}>
            <SearchIcon color="var(--muted)" />
          </div>
        </div>
      )}

      {loading ? (
        <div className={styles.loading}>검색 중...</div>
      ) : (
        <div className={styles.searchResults}>
          {results.length === 0 ? (
            <div className={styles.noResults}>검색 결과가 없습니다</div>
          ) : (
            results.map((result) => (
              <Link href={`/posts/${result.id}`} key={result.id}>
                <div className={styles.resultItem}>
                  <div className={styles.resultImageContainer}>
                    <Image
                      src={result.image}
                      alt={result.title}
                      width={80}
                      height={80}
                      layout="fixed"
                      objectFit="cover"
                    />
                  </div>
                  <h2 className={styles.resultTitle}>{result.title}</h2>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
