
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { createClient } = require('@supabase/supabase-js');

// Load env explicitly because we are running this script directly with node
// We will rely on the user having the correct keys in the script or pass them via env
// But for simplicity in this local env, let's hardcode them or read from .env.local parsing (simpler)

// Basic .env parser
function loadEnv() {
    try {
        const envPath = path.join(__dirname, '../.env.local');
        const envFile = fs.readFileSync(envPath, 'utf8');
        const lines = envFile.split('\n');
        lines.forEach(line => {
            const parts = line.split('=');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                const val = parts.slice(1).join('=').trim();
                if (key && !process.env[key]) {
                    process.env[key] = val;
                }
            }
        });
    } catch (e) {
        console.warn("Could not read .env.local", e.message);
    }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing credentials. Please check .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const BLOG_DIR = path.join(__dirname, '../content/blog');

async function migrate() {
    console.log("Starting migration...");

    if (!fs.existsSync(BLOG_DIR)) {
        console.error("Blog directory not found!");
        return;
    }

    const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
    console.log(`Found ${files.length} posts.`);

    for (const file of files) {
        const filePath = path.join(BLOG_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const parsed = matter(content);

        // Derive slug from filename: YYYY-MM-DD-slug.md -> slug (remove date)
        // Example: 2025-12-14-overcoming-sarcasm.md -> overcoming-sarcasm
        // Strategy: find first 11 chars (date + dash) and slice?
        // Or regex?
        const slug = file.replace(/\.md$/, '').substring(11);

        const postData = {
            title: parsed.data.title,
            slug: slug,
            excerpt: parsed.data.excerpt,
            author: parsed.data.author || 'Innovation Hub Team',
            category: parsed.data.category,
            date: parsed.data.date, // Supabase handles ISO strings well
            content: parsed.content,
            main_image: parsed.data.mainImage
        };

        console.log(`Migrating: ${postData.title} (${slug})`);

        const { error } = await supabase
            .from('posts')
            .upsert(postData, { onConflict: 'slug' });

        if (error) {
            console.error(`Failed to migrate ${file}:`, error.message);
        } else {
            console.log(`Success: ${file}`);
        }
    }

    console.log("Migration complete!");
}

migrate();
