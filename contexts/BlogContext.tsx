import { createContext, useContext, useState, type ReactNode } from "react";
import mockPosts from "../mock/posts.json";
import { BlogContextType } from "@/types/BlogContext.type";
import { Post } from "@/types/Post.type";

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
