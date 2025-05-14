import { Author } from "./Author.type";

export interface Post {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: string;
  author: Author;
}
