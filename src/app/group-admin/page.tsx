"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check, Lock, FileJson } from "lucide-react";
import { cn } from "@/lib/utils";
import { blogPosts } from "@/lib/blog-data";
import { saveBlogPost } from "../actions";

// Hardcoded for safety if env fails, but prefers env
const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_ACCESS_KEY || "adAGARAVAV@3308172425";

const categories = [
    "Backend Engineering",
    "Data Processing",
    "Financial Analysis",
    "User Experience"
];

const authors = [
    "Avigyan Das",
    "Avijit Saha",
    "Arpan Pal",
    "Arghadeep Saha",
    "Adrish Chatterjee"
];

export default function GroupAdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [inputKey, setInputKey] = useState("");
    const [mounted, setMounted] = useState(false);

    // Form State
    const [selectedPostSlug, setSelectedPostSlug] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState(authors[0]);
    const [category, setCategory] = useState(categories[0]);
    const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
    const [excerpt, setExcerpt] = useState("");
    const [body, setBody] = useState("");
    const [slug, setSlug] = useState("");
    const [isPlainText, setIsPlainText] = useState(true);

    // Output State
    const [status, setStatus] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check session storage on mount
        if (sessionStorage.getItem("finsense_admin_auth") === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    // Load existing post data
    useEffect(() => {
        if (selectedPostSlug) {
            const post = blogPosts.find(p => p.slug === selectedPostSlug);
            if (post) {
                setTitle(post.title);
                setAuthor(post.author);
                // @ts-ignore
                setCategory(post.category);
                setDate(post.date);
                setExcerpt(post.excerpt);
                setSlug(post.slug);
                setBody(post.content || "");
                // Heuristic: If content looks like HTML, turn off plain text mode
                const hasHtml = /<[a-z][\s\S]*>/i.test(post.content || "");
                setIsPlainText(!hasHtml);
            }
        }
    }, [selectedPostSlug]);

    // Auto-generate slug
    useEffect(() => {
        if (!selectedPostSlug && title) {
            setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
        }
    }, [title, selectedPostSlug]);

    // Handle Login
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputKey === ADMIN_KEY) {
            setIsAuthenticated(true);
            sessionStorage.setItem("finsense_admin_auth", "true");
        } else {
            alert("Invalid Access Key");
        }
    };

    // Save and Publish Logic
    const handleSave = async () => {
        setIsSaving(true);
        setStatus("Saving locally...");

        let finalContent = body;
        if (isPlainText) {
            // Convert double newlines to paragraphs
            finalContent = body
                .split(/\n\s*\n/)
                .filter(para => para.trim().length > 0)
                .map(para => `<p>${para.trim()}</p>`)
                .join("");
        }

        const postData = {
            title,
            excerpt,
            date,
            category: category as any,
            author,
            slug,
            content: finalContent
        };

        const result = await saveBlogPost(postData);

        if (result.success) {
            setStatus("Saved! Ready to git push.");
            setTimeout(() => setStatus(""), 3000);
        } else {
            setStatus("Error saving file.");
        }
        setIsSaving(false);
    };

    if (!mounted) return null;

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
                <div className="w-full max-w-md p-8 rounded-xl border border-gray-800 bg-gray-900 shadow-2xl">
                    <div className="flex justify-center mb-6">
                        <div className="p-3 rounded-full bg-primary/10 text-primary">
                            <Lock className="w-8 h-8" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-center mb-2">Restricted Access</h1>
                    <p className="text-gray-400 text-center mb-8">Enter the group admin key to access the drafting tool.</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={inputKey}
                            onChange={(e) => setInputKey(e.target.value)}
                            placeholder="Enter Access Key"
                            className="w-full p-3 rounded-lg bg-gray-950 border border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
                        >
                            Unlock Admin
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background border-t border-border">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <header className="flex justify-between items-center mb-12 border-b border-border pb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                            <FileJson className="text-primary" />
                            Finsense Blog CMS
                        </h1>
                        <p className="text-muted-foreground mt-1">Local Content Management System.</p>
                    </div>
                    <button
                        onClick={() => {
                            setIsAuthenticated(false);
                            sessionStorage.removeItem("finsense_admin_auth");
                        }}
                        className="text-sm text-red-400 hover:text-red-300 transition-colors"
                    >
                        Logout
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Editor Column */}
                    <div className="space-y-6">
                        <div className="space-y-4 p-6 rounded-xl border border-border bg-card">
                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                                <label className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">Edit Existing Post</label>
                                <select
                                    value={selectedPostSlug}
                                    onChange={(e) => setSelectedPostSlug(e.target.value)}
                                    className="w-full p-2 rounded bg-background border border-border text-sm"
                                >
                                    <option value="">-- Create New Post --</option>
                                    {blogPosts.map(p => (
                                        <option key={p.slug} value={p.slug}>{p.title}</option>
                                    ))}
                                </select>
                            </div>

                            <h2 className="text-xl font-semibold mb-4">Post Details</h2>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-muted/50 border border-border focus:border-primary outline-none"
                                    placeholder="e.g., The Future of Sentiment Analysis"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Author</label>
                                    <select
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        className="w-full p-3 rounded-lg bg-muted/50 border border-border focus:border-primary outline-none"
                                    >
                                        {authors.map(a => <option key={a} value={a}>{a}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Category</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full p-3 rounded-lg bg-muted/50 border border-border focus:border-primary outline-none"
                                    >
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Date</label>
                                <input
                                    type="text"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-muted/50 border border-border focus:border-primary outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 p-6 rounded-xl border border-border bg-card">
                            <h2 className="text-xl font-semibold mb-4">Content</h2>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Excerpt</label>
                                <textarea
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-muted/50 border border-border focus:border-primary outline-none min-h-[100px]"
                                    placeholder="A brief summary for the card view..."
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-medium text-muted-foreground">Body Content</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="plainTextMode"
                                            checked={isPlainText}
                                            onChange={(e) => setIsPlainText(e.target.checked)}
                                            className="rounded border-gray-600 bg-gray-900 text-primary focus:ring-primary"
                                        />
                                        <label htmlFor="plainTextMode" className="text-xs text-muted-foreground cursor-pointer select-none">
                                            Plain Text Mode
                                        </label>
                                    </div>
                                </div>
                                <textarea
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-muted/50 border border-border focus:border-primary outline-none min-h-[300px] font-mono text-sm"
                                    placeholder={isPlainText ? "Write plain text here. Paragraphs will be separated by double newlines." : "<p>Write your HTML content here...</p>"}
                                />
                                <p className="text-xs text-muted-foreground">
                                    {isPlainText
                                        ? "*Writing in Plain Text. Content will be automatically converted to HTML paragraphs on save. Use double enter for new paragraphs."
                                        : "*Writing in Raw HTML. You have full control over tags (h2, p, ul, li)."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Output Column */}
                    <div className="space-y-6">
                        <div className="sticky top-24 space-y-6">
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold hover:shadow-lg hover:from-green-500 hover:to-emerald-500 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSaving ? "Saving..." : "Save Changes Locally"}
                            </button>

                            {status && (
                                <div className={`p-4 rounded-xl border text-center font-medium ${status.includes("Error") ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-green-500/10 border-green-500/20 text-green-500"}`}>
                                    {status}
                                </div>
                            )}

                            <div className="bg-muted/30 p-4 rounded-xl border border-border">
                                <h3 className="font-semibold mb-2">How this works:</h3>
                                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
                                    <li>Clicking <strong>Save</strong> writes directly to your local project files (`src/lib/blog-data.json`).</li>
                                    <li>To publish to the live internet, you must <strong>git push</strong> your changes.</li>
                                    <li>There is no live database; your code <em>is</em> the database.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
