
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import posts from '../src/lib/blog-posts.json' with { type: "json" };

const OUTPUT_DIR = path.join(process.cwd(), 'content', 'blog');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log(`Migrating ${posts.length} posts to Markdown in ${OUTPUT_DIR}...`);

posts.forEach((post) => {
  const slug = post.slug;
  const date = new Date(post.date).toISOString().split('T')[0]; // Format YYYY-MM-DD
  const filename = `${date}-${slug}.md`;
  const filePath = path.join(OUTPUT_DIR, filename);

  const frontmatter = {
    title: post.title,
    date: new Date(post.date).toISOString(), // Keep ISO with time for better sorting? Or standard
    author: post.author,
    category: post.category,
    excerpt: post.excerpt,
    // mainImage? We don't have one in JSON, but if we did
  };

  // 'content' field in JSON is the body
  const bodyContent = post.content || "";

  const fileContent = matter.stringify(bodyContent, frontmatter);

  fs.writeFileSync(filePath, fileContent);
  console.log(`Converted: ${filename}`);
});

console.log("Migration complete!");
