
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Lock, Upload, Save, CheckCircle, AlertCircle, RefreshCw,
  PenSquare, Plus, ArrowLeft, Search,
  Bold, Italic, Heading, Code, Sigma, Image as ImageIcon
} from "lucide-react";
import { supabase } from "@/lib/supabase";

// Admin Access Key
const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_ACCESS_KEY || "adAGARAVAV@3308172425";

const CATEGORIES = [
  "Backend Engineering",
  "Data Processing",
  "Financial Analysis",
  "User Experience",
  "Cybersecurity",
  "Quantum Computing",
  "UI/UX Design",
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // View State: 'dashboard' (list) or 'editor' (form)
  const [view, setView] = useState<'dashboard' | 'editor'>('dashboard');

  // Dashboard State
  const [posts, setPosts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Editor State
  const [editingId, setEditingId] = useState<string | null>(null); // null = new post
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    author: "Innovation Hub Team",
    category: "Backend Engineering",
    date: new Date().toISOString().split('T')[0],
    content: "# New Post\n\nStart writing here...",
    main_image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Textarea Ref for cursor manipulation
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inlineImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("finsense_admin_auth") === "true") {
      setIsAuthenticated(true);
      fetchPosts();
    }
  }, [isAuthenticated]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, date, category, author, slug')
      .order('date', { ascending: false });

    if (data) setPosts(data);
    if (error) console.error("Error fetching posts:", error);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey === ADMIN_KEY) {
      setIsAuthenticated(true);
      sessionStorage.setItem("finsense_admin_auth", "true");
    } else {
      alert("Invalid Access Key");
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    // Only auto-generate slug if creating new post
    setFormData(prev => ({
      ...prev,
      title,
      slug: !editingId ? generateSlug(title) : prev.slug
    }));
  };

  const startNewPost = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      author: "Innovation Hub Team",
      category: "Backend Engineering",
      date: new Date().toISOString().split('T')[0],
      content: "# New Post\n\nStart writing here...",
      main_image: "",
    });
    setImageFile(null);
    setMessage(null);
    setView('editor');
  };

  const editPost = async (postSummary: any) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postSummary.id)
      .single();

    setLoading(false);

    if (data) {
      setEditingId(data.id);
      setFormData({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || "",
        author: data.author,
        category: data.category || "Backend Engineering",
        date: new Date(data.date).toISOString().split('T')[0],
        content: data.content || "",
        main_image: data.main_image || "",
      });
      setImageFile(null);
      setMessage(null);
      setView('editor');
    } else {
      alert("Error loading post details");
    }
  };

  // --- EDITOR TOOLBAR HELPERS ---

  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const previousText = textarea.value;
    const selectedText = previousText.substring(start, end);

    const newText = previousText.substring(0, start) + before + selectedText + after + previousText.substring(end);

    setFormData({ ...formData, content: newText });

    // Reset cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Use a simpler 'uploading...' placeholder logic or just verify
    const originalText = "![Uploading image...]()";
    insertText(originalText);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `inline-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, file);

      if (uploadError) throw new Error(uploadError.message);

      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      const imageUrl = data.publicUrl;
      const markdownImage = `![${file.name}](${imageUrl})`;

      // Replace placeholder with actual image
      setFormData(prev => ({
        ...prev,
        content: prev.content.replace(originalText, markdownImage)
      }));

    } catch (error) {
      alert("Failed to upload inline image");
      setFormData(prev => ({
        ...prev,
        content: prev.content.replace(originalText, "") // Remove placeholder
      }));
    } finally {
      // Reset input
      if (inlineImageInputRef.current) inlineImageInputRef.current.value = "";
    }
  };

  // -----------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let imageUrl = formData.main_image;

      // 1. Upload Main Cover Image if new one selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, imageFile);

        if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

        const { data: publicUrlData } = supabase.storage
          .from('images')
          .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;
      }

      const postPayload = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        author: formData.author,
        category: formData.category,
        date: formData.date,
        content: formData.content,
        main_image: imageUrl,
      };

      let error;
      if (editingId) {
        const { error: updateError } = await supabase
          .from('posts')
          .update(postPayload)
          .eq('id', editingId);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('posts')
          .insert(postPayload);
        error = insertError;
      }

      if (error) throw new Error(`Database error: ${error.message}`);

      setMessage({ type: 'success', text: editingId ? 'Post updated!' : 'Post published!' });

      fetchPosts();

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 text-white">
        <div className="w-full max-w-md p-8 rounded-xl border border-gray-800 bg-gray-900 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Lock className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Editor Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Enter Access Key"
              className="w-full p-3 rounded-lg bg-gray-950 border border-gray-800 text-white focus:border-primary outline-none"
            />
            <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 font-bold hover:bg-blue-700 transition-colors">
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {view === 'editor' && (
              <button onClick={() => setView('dashboard')} className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold">{view === 'dashboard' ? 'Content Dashboard' : (editingId ? 'Edit Post' : 'New Post')}</h1>
              <div className="text-sm text-gray-500">Connected to Supabase</div>
            </div>
          </div>
          {view === 'dashboard' && (
            <button
              onClick={startNewPost}
              className="px-6 py-3 rounded-lg bg-blue-600 font-bold hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="mr-2 h-5 w-5" /> Create New
            </button>
          )}
        </div>

        {/* Dashboard View */}
        {view === 'dashboard' && (
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 p-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="grid gap-4">
              {posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map((post) => (
                <div key={post.id} className="p-4 rounded-xl border border-gray-800 bg-gray-900/50 hover:bg-gray-900 transition-all flex items-center justify-between group">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-200 group-hover:text-blue-400 transition-colors">{post.title}</h3>
                    <div className="text-sm text-gray-500 flex items-center gap-3 mt-1">
                      <span className="bg-gray-800 px-2 py-0.5 rounded text-xs">{post.category}</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => editPost(post)}
                    className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-blue-600/20 hover:text-blue-400 border border-transparent hover:border-blue-500/30 transition-all flex items-center"
                  >
                    <PenSquare className="h-4 w-4 mr-2" /> Edit
                  </button>
                </div>
              ))}
              {posts.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No posts found. Create one to get started!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Editor View */}
        {view === 'editor' && (
          <>
            {message && (
              <div className={`p-4 rounded-lg mb-6 flex items-center ${message.type === 'success' ? 'bg-green-900/50 text-green-200' : 'bg-red-900/50 text-red-200'}`}>
                {message.type === 'success' ? <CheckCircle className="mr-2 h-5 w-5" /> : <AlertCircle className="mr-2 h-5 w-5" />}
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Title</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="w-full p-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 outline-none"
                    placeholder="Post title..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Slug (URL)</label>
                  <input
                    required
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 outline-none"
                    placeholder="post-url-slug"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full p-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 outline-none appearance-none"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Publish Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Excerpt (Short description)</label>
                <textarea
                  required
                  rows={3}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full p-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 outline-none"
                  placeholder="Brief summary for the card view..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Cover Image</label>

                {formData.main_image && !imageFile && (
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden border border-gray-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={formData.main_image} alt="Current Cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-sm text-gray-300">
                      Current Cover Image
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-4 p-4 border border-dashed border-gray-800 rounded-lg bg-gray-900/50">
                  <Upload className="h-6 w-6 text-gray-500" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Content (Markdown)</label>

                {/* TOOLBAR */}
                <div className="flex items-center gap-2 mb-2 p-2 rounded-lg bg-gray-900 border border-gray-800 overflow-x-auto">
                  <button type="button" onClick={() => insertText('**', '**')} className="p-2 rounded hover:bg-gray-800 text-gray-400 hover:text-white" title="Bold">
                    <Bold className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => insertText('*', '*')} className="p-2 rounded hover:bg-gray-800 text-gray-400 hover:text-white" title="Italic">
                    <Italic className="h-4 w-4" />
                  </button>
                  <div className="w-px h-6 bg-gray-800 mx-1"></div>
                  <button type="button" onClick={() => insertText('### ')} className="p-2 rounded hover:bg-gray-800 text-gray-400 hover:text-white" title="Heading 3">
                    <Heading className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => insertText('```\n', '\n```')} className="p-2 rounded hover:bg-gray-800 text-gray-400 hover:text-white" title="Code Block">
                    <Code className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => insertText('$$ ', ' $$')} className="p-2 rounded hover:bg-gray-800 text-gray-400 hover:text-white" title="LaTeX Equation">
                    <Sigma className="h-4 w-4" />
                  </button>
                  <div className="w-px h-6 bg-gray-800 mx-1"></div>
                  <button type="button" onClick={() => inlineImageInputRef.current?.click()} className="p-2 rounded hover:bg-gray-800 text-gray-400 hover:text-white" title="Insert Image">
                    <ImageIcon className="h-4 w-4" />
                  </button>
                  {/* Hidden Input for Inline Images */}
                  <input
                    type="file"
                    ref={inlineImageInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleInlineImageUpload}
                  />
                </div>

                <textarea
                  ref={textareaRef}
                  required
                  rows={20}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-4 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 outline-none font-mono text-sm leading-relaxed"
                  placeholder="# Write your blog post here..."
                />
                <p className="text-xs text-gray-500">Supports standard Markdown. Use toolbar for formatting.</p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5" /> {editingId ? 'Update Post' : 'Publish Post'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
