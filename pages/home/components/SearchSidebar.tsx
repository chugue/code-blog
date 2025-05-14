import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./SearchSidebar.module.css";

export default function SearchSidebar() {
  const router = useRouter();
  const { q } = router.query;
  const [filters, setFilters] = useState({
    category: "all",
    date: "all",
  });

  // 필터 변경 처리
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));

    // 실제 환경에서는 여기서 검색 결과를 필터링하는 로직 추가
  };

  return (
    <div className={styles.searchSidebar}>
      <h3 className={styles.sidebarTitle}>검색 필터</h3>

      <div className={styles.filterSection}>
        <h4 className={styles.filterTitle}>카테고리</h4>
        <ul className={styles.filterList}>
          <li
            className={`${styles.filterItem} ${
              filters.category === "all" ? styles.active : ""
            }`}
            onClick={() => handleFilterChange("category", "all")}
          >
            전체
          </li>
          <li
            className={`${styles.filterItem} ${
              filters.category === "tech" ? styles.active : ""
            }`}
            onClick={() => handleFilterChange("category", "tech")}
          >
            기술
          </li>
          <li
            className={`${styles.filterItem} ${
              filters.category === "design" ? styles.active : ""
            }`}
            onClick={() => handleFilterChange("category", "design")}
          >
            디자인
          </li>
        </ul>
      </div>

      <div className={styles.filterSection}>
        <h4 className={styles.filterTitle}>기간</h4>
        <ul className={styles.filterList}>
          <li
            className={`${styles.filterItem} ${
              filters.date === "all" ? styles.active : ""
            }`}
            onClick={() => handleFilterChange("date", "all")}
          >
            전체 기간
          </li>
          <li
            className={`${styles.filterItem} ${
              filters.date === "week" ? styles.active : ""
            }`}
            onClick={() => handleFilterChange("date", "week")}
          >
            최근 1주일
          </li>
          <li
            className={`${styles.filterItem} ${
              filters.date === "month" ? styles.active : ""
            }`}
            onClick={() => handleFilterChange("date", "month")}
          >
            최근 1개월
          </li>
        </ul>
      </div>

      <div className={styles.searchStats}>
        <p>
          총 <strong>28</strong>개의 검색 결과
        </p>
        <p>
          검색어: <strong>{q}</strong>
        </p>
      </div>
    </div>
  );
}
