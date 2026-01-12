
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, User, Calendar, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";
import Image from "next/image";

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
                        <article key={post.slug} className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:bg-muted/30 transition-all hover:shadow-lg h-full">
                            {/* Image Section */}
                            <Link href={`/blog/${post.slug}`} className="relative h-48 w-full block overflow-hidden bg-muted">
                                {post.mainImage ? (
                                    <Image
                                        src={post.mainImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-muted-foreground/30 bg-gradient-to-br from-muted to-muted/50">
                                        <ImageIcon className="h-10 w-10" />
                                    </div>
                                )}
                                <div className="absolute top-3 left-3">
                                    <span className={cn(
                                        "text-xs font-semibold px-2 py-1 rounded-md shadow-sm backdrop-blur-md",
                                        "bg-background/80 text-foreground border border-border/50"
                                    )}>
                                        {post.category}
                                    </span>
                                </div>
                            </Link>

                            {/* Content Section */}
                            <div className="flex flex-col flex-grow p-5">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    <time>{post.date}</time>
                                </div>

                                <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h2>

                                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                                    <div className="flex items-center text-xs font-medium text-muted-foreground">
                                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-primary">
                                            {post.author.charAt(0)}
                                        </div>
                                        {post.author}
                                    </div>
                                    <Link href={`/blog/${post.slug}`} className="flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                                        Read <ArrowRight className="h-4 w-4 ml-1" />
                                    </Link>
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
