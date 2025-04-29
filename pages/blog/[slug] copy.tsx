import { useRouter } from "next/router";
import { useBlog } from "../../contexts/BlogContext";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/BlogPost.module.css";
import { useEffect, useState } from "react";

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const { getPostBySlug } = useBlog();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (slug) {
      const foundPost = getPostBySlug(slug as string);
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
        <title>{post.title} | Huly Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <div className={styles.category}>
        <Link href={`/category/${post.category}`}>
          <span>{post.category}</span>
        </Link>
        <span className={styles.date}> • {post.date}</span>
      </div>

      <h1 className={styles.title}>{post.title}</h1>

      <div className={styles.authorInfo}>
        <Image
          src={post.author.avatar || "/placeholder.svg"}
          alt={post.author.name}
          width={40}
          height={40}
          className={styles.avatar}
        />
        <span>{post.author.name}</span>
      </div>

      <div className={styles.featuredImage}>
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          width={1200}
          height={600}
          layout="responsive"
        />
      </div>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
