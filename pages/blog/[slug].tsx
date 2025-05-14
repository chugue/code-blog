import { useRouter } from "next/router";
import { useBlog } from "../../contexts/BlogContext";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import styles from "./[slug].module.css";
import { useEffect, useState } from "react";
import { Post } from "@/types/Post.type";

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const { getPostBySlug } = useBlog();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (slug) {
      const foundPost: Post | undefined = getPostBySlug(slug as string);
      if (foundPost) {
        setPost(foundPost);
      }
    }
  }, [slug, getPostBySlug]);

  if (!post) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.blogPost}>
      <Head>
        <title>{post.title} | Code Factory Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <div className={styles.featuredImage}>
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          width={1200}
          height={600}
        />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.authorInfoContainer}>
          <div className={styles.authorInfo}>
            <div className={styles.authorDetails}>
              <Image
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                width={60}
                height={60}
                className={styles.avatar}
              />
              <div className={styles.authorDetailsText}>
                <p className={styles.username}>{post.author.username}</p>
                <p className={styles.name}>{post.author.name}</p>
              </div>
            </div>

            <div className={styles.categoryButton}>
              <Link href={`/category/${post.category}`}>
                <span>{post.category}</span>
              </Link>
            </div>
          </div>
        </div>

        <h1 className={styles.title}>{post.title}</h1>
        <h2 className={styles.subtitle}>{post.subtitle}</h2>

        <div className={styles.dateInfo}>
          <span className={styles.date}>{post.date}</span>
        </div>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
