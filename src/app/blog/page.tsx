import { getBlogPosts } from "@/lib/blog-data";
import BlogList from "@/components/blog/BlogList";

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className="container mx-auto px-4 py-16 pt-24">
            <div className="max-w-4xl mx-auto mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    Innitiative Insights
                </h1>
                <p className="text-muted-foreground">Technical deep dives, research papers, and engineering logs from the Finsense team.</p>
            </div>

            <BlogList initialPosts={posts} />
        </div>
    );
}

