"use client";

import { useBlog } from "../contexts/BlogContext";
import styles from "../styles/CategoryFilter.module.css";

export default function CategoryFilter() {
  const { filter, setFilter } = useBlog();
  const categories = ["모든 카테고리", "AI", "새로운 기술", "커뮤니티"];

  return (
    <div className={styles.categoryFilter}>
      {categories.map((category) => (
        <button
          key={category}
          className={`${styles.categoryButton} ${
            filter === category ? styles.active : ""
          }`}
          onClick={() => setFilter(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
