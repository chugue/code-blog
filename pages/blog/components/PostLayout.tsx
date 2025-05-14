import React, { ReactNode } from "react";
import styles from "./PostLayout.module.css";

interface PostLayoutProps {
  children: ReactNode;
}

const PostLayout = ({ children }: PostLayoutProps) => {
  return (
    <div className={styles.postLayout}>
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
        <aside className={styles.sidebar}>
          <div className={styles.stickyContent}>
            <div className={styles.recommendedPosts}>
              <h3>추천 포스트</h3>
              <ul className={styles.recommendList}>
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

            <div className={styles.tableOfContents}>
              <h3>목차</h3>
              <ul className={styles.tocList}>
                <li>
                  <a href="#intro">소개</a>
                </li>
                <li>
                  <a href="#main-content">주요 내용</a>
                </li>
                <li>
                  <a href="#conclusion">결론</a>
                </li>
              </ul>
            </div>

            <div className={styles.shareButtons}>
              <h3>공유하기</h3>
              <div className={styles.socialButtons}>
                <button className={styles.twitterBtn}>Twitter</button>
                <button className={styles.facebookBtn}>Facebook</button>
                <button className={styles.linkBtn}>링크 복사</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PostLayout;
