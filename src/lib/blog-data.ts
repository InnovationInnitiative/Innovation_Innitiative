export type BlogPost = {
    title: string;
    excerpt: string;
    date: string;
    category: "Backend Engineering" | "Data Processing" | "Financial Analysis" | "User Experience";
    author: string;
    slug: string;
    content?: string; // HTML or Markdown content
};

import posts from "./blog-posts.json";

export const blogPosts: BlogPost[] = posts as BlogPost[];
// Forced refresh
