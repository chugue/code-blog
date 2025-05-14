import { useBlog } from "../../../contexts/BlogContext";
import styles from "./CategoryFilter.module.css";
import { Categories } from "../../../types/Categories.enum";

export default function CategoryFilter() {
  const { filter, setFilter } = useBlog();

  return (
    <div className={styles.categoryFilter}>
      {Object.values(Categories).map((category) => (
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
