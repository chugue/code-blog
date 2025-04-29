import Link from "next/link";
import Image from "next/image";
import { useBlog } from "../contexts/BlogContext";
import styles from "../styles/BlogPosts.module.css";

export default function BlogPosts() {
  const { getFilteredPosts } = useBlog();
  const posts = getFilteredPosts();

  if (!posts || posts.length === 0) {
    return <div className={styles.loading}>게시글이 없습니다</div>;
  }

  return (
    <div className={styles.blogPosts}>
      {posts.map((post) => (
        <article key={post.id} className={styles.blogPost}>
          <div className={styles.postMeta}>
            <span className={styles.category}>{post.category}</span>
            <span className={styles.date}> • {post.date}</span>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h2 className={styles.postTitle}>{post.title}</h2>
          </Link>

          <div className={styles.postContent}>
            <div className={styles.postText}>
              <p className={styles.postExcerpt}>{post.excerpt}</p>

              <Link href={`/blog/${post.slug}`}>
                <span className={styles.readMore}>Read more</span>
              </Link>
            </div>

            <div className={styles.postImage}>
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={400}
                height={250}
                layout="responsive"
              />
            </div>
          </div>

          <div className={styles.authorInfo}>
            <Image
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
              width={24}
              height={24}
              className={styles.avatar}
            />
            <span>{post.author.name}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
