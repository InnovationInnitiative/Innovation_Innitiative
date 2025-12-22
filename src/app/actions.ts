"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

type BlogPost = {
    title: string;
    excerpt: string;
    date: string;
    category: "Backend Engineering" | "Data Processing" | "Financial Analysis" | "User Experience";
    author: string;
    slug: string;
    content?: string;
};

// Defined path to the JSON file
// In Next.js, process.cwd() is the root directory
const DATA_FILE_PATH = path.join(process.cwd(), "src", "lib", "blog-posts.json");

export async function saveBlogPost(post: BlogPost) {
    try {
        console.log("Saving post to:", DATA_FILE_PATH);

        // 1. Read existing data
        const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf-8");
        const posts: BlogPost[] = JSON.parse(fileContent);

        // 2. Find existing post index
        const index = posts.findIndex((p) => p.slug === post.slug);

        if (index !== -1) {
            // Update existing
            posts[index] = { ...posts[index], ...post };
        } else {
            // Add new
            posts.push(post);
        }

        // 3. Write back to file
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(posts, null, 4), "utf-8");

        // 4. Revalidate cache so updates show immediately
        revalidatePath("/blog");
        revalidatePath(`/blog/${post.slug}`);
        revalidatePath("/group-admin");

        return { success: true, message: "Use the 'Refresh' button to see changes." };
    } catch (error) {
        console.error("Failed to save post:", error);
        return { success: false, message: "Failed to save to disk." };
    }
}
