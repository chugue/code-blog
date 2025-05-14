import React, { ReactNode } from "react";
import styles from "./BlogListLayout.module.css";

interface BlogListLayoutProps {
  children: ReactNode;
}

const BlogListLayout = ({ children }: BlogListLayoutProps) => {
  return (
    <div className={styles.blogListLayout}>
      <div className={styles.container}>
        <div className={styles.mainContent}>{children}</div>
        <aside className={styles.sidebar}>
          <div className={styles.stickyContent}>
            <div className={styles.categorySection}>
              <h3>카테고리</h3>
              <ul className={styles.categoryList}>
                <li>
                  <a href="/category/javascript">JavaScript</a>
                </li>
                <li>
                  <a href="/category/react">React</a>
                </li>
                <li>
                  <a href="/category/nextjs">Next.js</a>
                </li>
                <li>
                  <a href="/category/typescript">TypeScript</a>
                </li>
              </ul>
            </div>

            <div className={styles.popularPosts}>
              <h3>인기 게시물</h3>
              <ul className={styles.popularPostList}>
                <li>
                  <a href="/posts/nextjs-getting-started">Next.js 시작하기</a>
                </li>
                <li>
                  <a href="/posts/react-hooks-explained">
                    React Hooks 완벽 가이드
                  </a>
                </li>
                <li>
                  <a href="/posts/typescript-tips">TypeScript 필수 팁</a>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogListLayout;
