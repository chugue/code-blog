// components/Sidebar.tsx
import Link from "next/link";
import styles from "./Sidebar.module.css";
import popularPosts from "../../../mock/popular-posts.json";
// 임시 인기 콘텐츠 데이터 (실제로는 API 호출 등을 통해 가져와야 합니다)

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>인기 콘텐츠</h2>
      <ul className={styles.list}>
        {popularPosts.map((post) => (
          <li key={post.id} className={styles.listItem}>
            <Link href={`/blog/${post.slug}`}>
              <span className={styles.postTitle}>{post.title}</span>
              <span className={styles.postAuthor}>{post.author}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
