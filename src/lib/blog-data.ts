
import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "./types";

export type { BlogPost };

// Constants
const POSTS_DIRECTORY = path.join(process.cwd(), "content/blog");


export async function getBlogPosts(): Promise<BlogPost[]> {
    // Ensure directory exists
    if (!fs.existsSync(POSTS_DIRECTORY)) {
        console.warn("Blog content directory missing:", POSTS_DIRECTORY);
        return [];
    }

    const fileNames = fs.readdirSync(POSTS_DIRECTORY);

    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id (not used as slug potentially)
        // actually we store slug in frontmatter or filename
        const fullPath = path.join(POSTS_DIRECTORY, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Use gray-matter to parse the post metadata section
        const { data, content } = matter(fileContents);

        // Normalize data
        return {
            title: data.title,
            excerpt: data.excerpt,
            date: typeof data.date === 'object' ? data.date.toISOString() : data.date,
            author: data.author,
            category: data.category,
            slug: fileName.replace(/\.md$/, '').substring(11), // Remove date prefix (YYYY-MM-DD-) if existing or just rely on frontmatter? 
            // Our migration script saved filename as `DATE-SLUG.md`. 
            // Decap CMS saves as `{{year}}-{{month}}-{{day}}-{{slug}}`.
            // Let's rely on the filename for sorting but maybe the frontmatter has the real slug?
            // Actually, usually in Next.js we generate slug from filename.
            // But let's check what migration did. Migration used `filename = ${date}-${slug}.md`.
            // So `fileName.replace(/\.md$/, '').substring(11)` assumes date is YYYY-MM-DD- (11 chars).
            // Robust way: 
            // But wait, Decap CMS might create slugs like `2025-01-02-my-post`.
            // Let's trust the frontmatter if available, or parse filename.
            // Wait, frontmatter doesn't always have 'slug' in Decap CMS unless likely explicitly added.
            // Migration script DID NOT add 'slug' to frontmatter? Let's check.
            // Migration script: `const frontmatter = { title: post.title, ... }`. NO SLUG IN FRONTMATTER.
            // So we MUST derive it from filename.

            // Fix: Migration script uses `${date}-${slug}`. 
            // If date is 2025-01-01 (10 chars), then dash is 11th char. Substring(11) gets the slug.

            content: content,
            mainImage: data.mainImage
        } as BlogPost;
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

// Legacy export if needed, but we should switch completely.
// For static site generation we might need sync? 
// getBlogPosts is async commonly now.
export const blogPosts: BlogPost[] = []; // Empty array for legacy direct import, forcing usage of getBlogPosts
