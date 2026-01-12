
import "server-only";
import { BlogPost } from "./types";
import { supabase } from "./supabase";

export type { BlogPost };

export const revalidate = 60; // Revalidate every 60 seconds

export async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('date', { ascending: false });

        if (error) {
            console.error("Supabase error:", error);
            // Fallback? Or empty.
            return [];
        }

        if (!data) return [];

        return data.map((post: any) => ({
            title: post.title,
            excerpt: post.excerpt,
            date: new Date(post.date).toISOString().split('T')[0], // Ensure YYYY-MM-DD
            author: post.author,
            category: post.category,
            slug: post.slug,
            content: post.content,
            mainImage: post.main_image || undefined
        }));
    } catch (e) {
        console.error("Unexpected error fetching posts:", e);
        return [];
    }
}
