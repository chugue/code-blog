import { createContext, useContext, useState, type ReactNode } from "react";
import mockPosts from "../mock/posts.json";

// Types
interface Author {
  name: string;
  avatar: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: string;
  author: Author;
}

interface BlogContextType {
  posts: Post[];
  filter: string;
  setFilter: (filter: string) => void;
  getFilteredPosts: () => Post[];
  getPostBySlug: (slug: string) => Post | undefined;
}

// Create context
const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Provider component
export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts] = useState<Post[]>(mockPosts);
  const [filter, setFilter] = useState<string>("모든 카테고리");

  const getFilteredPosts = () => {
    return filter === "모든 카테고리"
      ? posts
      : posts.filter((post) => post.category === filter);
  };

  const getPostBySlug = (slug: string) => {
    return posts.find((post) => post.slug === slug);
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        filter,
        setFilter,
        getFilteredPosts,
        getPostBySlug,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

// Custom hook to use the blog context
export function useBlog() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
}
