import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Calendar, Tag } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

// This function generates the static paths for all blog posts at build time
export function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="container mx-auto px-4 py-20 max-w-3xl">
            <Link
                href="/blog"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Insights
            </Link>

            <header className="mb-12">
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium flex items-center">
                        <Tag className="h-3 w-3 mr-1.5" />
                        {post.category}
                    </span>
                    <span className="flex items-center text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1.5" />
                        {post.date}
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
                    {post.title}
                </h1>

                <div className="flex items-center p-4 rounded-xl border border-border bg-card/50">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-4">
                        {post.author.charAt(0)}
                    </div>
                    <div>
                        <div className="font-semibold">{post.author}</div>
                        <div className="text-xs text-muted-foreground">Innovation Innitiative Team</div>
                    </div>
                </div>
            </header>

            <div className="prose prose-invert max-w-none">
                <div className="p-6 rounded-xl border border-primary/20 bg-primary/5 mb-10">
                    <h3 className="text-lg font-semibold text-primary mb-2 mt-0">Abstract</h3>
                    <p className="text-lg leading-relaxed m-0 text-muted-foreground">
                        {post.excerpt}
                    </p>
                </div>

                {post.content ? (
                    <div
                        className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                ) : (
                    <>
                        {/* Content Placeholder - In a real scenario, this would be the rendered markdown body */}
                        <p className="text-lg text-muted-foreground italic border-l-4 border-primary/20 pl-4 py-2 bg-muted/30 rounded-r-lg">
                            This article is currently being drafted by the author. The full technical analysis will be available shortly.
                        </p>

                        {/* Placeholder content structure to make it look active */}
                        <h2>Introduction</h2>
                        <div className="h-4 w-full bg-muted/20 rounded animate-pulse mb-3"></div>
                        <div className="h-4 w-5/6 bg-muted/20 rounded animate-pulse mb-3"></div>
                        <div className="h-4 w-4/6 bg-muted/20 rounded animate-pulse mb-8"></div>

                        <h2>Key Methodologies</h2>
                        <div className="h-4 w-full bg-muted/20 rounded animate-pulse mb-3"></div>
                        <div className="h-4 w-11/12 bg-muted/20 rounded animate-pulse mb-3"></div>
                        <div className="h-4 w-3/4 bg-muted/20 rounded animate-pulse mb-8"></div>
                    </>
                )}
            </div>
        </article>
    );
}
