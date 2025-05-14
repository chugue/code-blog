import { Post } from "./Post.type";

export interface BlogContextType {
  posts: Post[];
  filter: string;
  setFilter: (filter: string) => void;
  getFilteredPosts: () => Post[];
  getPostBySlug: (slug: string) => Post | undefined;
}
