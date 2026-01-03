"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";

interface BlogListProps {
    initialPosts: BlogPost[];
}

export default function BlogList({ initialPosts }: BlogListProps) {
    // Get unique categories and sort them
    const allCategories = Array.from(new Set(initialPosts.map(post => post.category))).sort();
    const categories = ["All", ...allCategories];

    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredPosts = selectedCategory === "All"
        ? initialPosts
        : initialPosts.filter(post => post.category === selectedCategory);

    return (
        <>
            {/* Interactive Filter Categories */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                            selectedCategory === cat
                                ? "bg-primary text-primary-foreground border-primary shadow-md hover:bg-primary/90"
                                : "bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground hover:border-border/80"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <article key={post.slug} className="group relative flex flex-col items-start p-6 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors h-full shadow-sm hover:shadow-md">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 w-full justify-between">
                                <span className={cn(
                                    "font-medium px-2 py-0.5 rounded-full",
                                    "bg-primary/10 text-primary" // Default style, could vary by category if desired
                                )}>
                                    {post.category}
                                </span>
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
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No posts found for this category.
                    </div>
                )}
            </div>
        </>
    );
}
