import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import { blogPosts, BlogPost } from "@/lib/blog-data";

export default function BlogPage() {
    // Get unique categories from the posts
    const categories = Array.from(new Set(blogPosts.map(post => post.category)));

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Innitiative Insights</h1>
                <p className="text-muted-foreground">Technical deep dives, research papers, and engineering logs from the Finsense team.</p>
            </div>

            {/* Categories (Static display for now, can be made interactive with client component state) */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((cat) => (
                    <span key={cat} className="px-4 py-2 rounded-full border border-border bg-background text-sm font-medium text-muted-foreground">
                        {cat}
                    </span>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <article key={post.slug} className="group relative flex flex-col items-start p-6 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors h-full">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 w-full justify-between">
                            <span className="font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{post.category}</span>
                            <time>{post.date}</time>
                        </div>

                        <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            <Link href={`/blog/${post.slug}`}>
                                <span className="absolute inset-0 z-10" />
                                {post.title}
                            </Link>
                        </h2>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>

                        <div className="mt-4 flex items-center justify-between w-full pt-4 border-t border-border/50">
                            <div className="flex items-center text-xs text-muted-foreground">
                                <User className="h-3 w-3 mr-1" />
                                {post.author}
                            </div>
                            <div className="flex items-center text-sm font-medium text-primary">
                                Read <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
