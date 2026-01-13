import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Calendar, Tag } from "lucide-react";
import { getBlogPosts } from "@/lib/blog-data";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { AdUnit } from "@/components/AdUnit"; // Import
import Image from "next/image";

// This function generates the static paths for all blog posts at build time
export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const posts = await getBlogPosts();
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-20">
            {/* Back Link - Full Width */}
            <div className="max-w-[1400px] mx-auto mb-8">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Insights
                </Link>
            </div>

            {/* Increased gap from 12 to 24 for maximum separation */}
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] xl:grid-cols-[250px_1fr_250px] gap-24 max-w-[1400px] mx-auto">
                {/* Left Sidebar - Desktop Only */}
                <aside className="hidden lg:block relative">
                    <div className="sticky top-24 h-[calc(100vh-6rem)] flex flex-col justify-start">
                        {/* Removed duplicate "Advertisement" label */}
                        <AdUnit format="vertical" className="h-[600px] w-full" />
                    </div>
                </aside>

                {/* Main Content */}
                <article className="max-w-3xl mx-auto w-full">
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

                        {post.mainImage && (
                            <div className="mt-8 relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden border border-border">
                                <Image
                                    src={post.mainImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}
                    </header>

                    {/* Ad Unit - Top of Content (Mobile/All) */}
                    <AdUnit className="mb-8 block lg:hidden" />
                    <AdUnit className="mb-8 hidden lg:block" format="rectangle" />

                    <div className="prose prose-invert max-w-none">
                        <div className="p-6 rounded-xl border border-primary/20 bg-primary/5 mb-10">
                            <h3 className="text-lg font-semibold text-primary mb-2 mt-0">Abstract</h3>
                            <p className="text-lg leading-relaxed m-0 text-muted-foreground">
                                {post.excerpt}
                            </p>
                        </div>

                        {post.content ? (
                            <MarkdownRenderer content={post.content} />
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

                    {/* Ad Unit - Bottom of Content */}
                    <AdUnit className="mt-12" />
                </article>

                {/* Right Sidebar - Desktop Only */}
                <aside className="hidden lg:block relative">
                    <div className="sticky top-24 h-[calc(100vh-6rem)] flex flex-col justify-start">
                        {/* Removed duplicate "Advertisement" label */}
                        <AdUnit format="vertical" className="h-[600px] w-full" />
                    </div>
                </aside>
            </div>
        </div>
    );
}
