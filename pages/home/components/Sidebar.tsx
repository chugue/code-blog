// components/Sidebar.tsx
import Link from "next/link";
import styles from "./Sidebar.module.css";

// 임시 인기 콘텐츠 데이터 (실제로는 API 호출 등을 통해 가져와야 합니다)
const popularPosts = [
  { id: "1", title: "가장 인기있는 글 1", slug: "popular-post-1" },
  { id: "2", title: "React 심층 분석", slug: "react-deep-dive" },
  { id: "3", title: "Next.js 시작하기", slug: "getting-started-with-nextjs" },
  // ... 더 많은 인기 게시물
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>인기 콘텐츠</h2>
      <ul className={styles.list}>
        {popularPosts.map((post) => (
          <li key={post.id} className={styles.listItem}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
