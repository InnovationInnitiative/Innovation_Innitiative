
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Lock } from "lucide-react";

// Load Decap CMS dynamically (client-side only)
const CMS = dynamic(
  () =>
    import("decap-cms-app").then((cms: any) => {
      // Check if running on localhost
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

      const config = {
        backend: {
          name: "git-gateway",
          branch: "main",
        },
        local_backend: isLocal, // True only if on localhost
        media_folder: "public/images/uploads",
        public_folder: "/images/uploads",
        collections: [
          {
            name: "blog",
            label: "Blog",
            folder: "content/blog",
            create: true,
            slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
            fields: [
              { label: "Title", name: "title", widget: "string" },
              { label: "Publish Date", name: "date", widget: "datetime" },
              { label: "Author", name: "author", widget: "string", default: "Innovation Hub Team" },
              {
                label: "Category",
                name: "category",
                widget: "select",
                options: [
                  "Backend Engineering",
                  "Data Processing",
                  "Financial Analysis",
                  "User Experience",
                  "Cybersecurity",
                  "Quantum Computing",
                  "UI/UX Design",
                ],
              },
              { label: "Excerpt", name: "excerpt", widget: "text" },
              { label: "Main Image", name: "mainImage", widget: "image", required: false },
              { label: "Body", name: "body", widget: "markdown" },
            ],
          },
        ],
      };

      const cmsApp = cms.default || cms;

      // Register Custom Code Block Component to fix language persistence
      if (cmsApp.registerEditorComponent) {
        cmsApp.registerEditorComponent({
          id: "code-block",
          label: "Code Block",
          fields: [
            {
              name: "language",
              label: "Language",
              widget: "select",
              options: ["javascript", "typescript", "css", "html", "python", "bash", "json", "yaml", "markdown", "text"],
              default: "text",
            },
            {
              name: "code",
              label: "Code",
              widget: "text", // Using text widget avoids nested code mirror issues
            },
          ],
          // Regex to match code blocks, handling different newline formats (CRLF/LF)
          pattern: /^```([a-zA-Z0-9]*)\s*[\r\n]+([\s\S]*?)[\r\n]+```/,
          fromBlock: function (match: any) {
            return {
              language: match[1] || "text",
              code: match[2],
            };
          },
          toBlock: function (obj: any) {
            const lang = obj.language === "text" ? "" : obj.language;
            return "```" + (lang || "") + "\n" + (obj.code || "") + "\n```";
          },
          toPreview: function (obj: any) {
            return (
              '<pre><code class="language-' +
              (obj.language || "text") +
              '">' +
              (obj.code || "") +
              "</code></pre>"
            );
          },
        });
      }

      if (typeof cmsApp.init === 'function') {
        cmsApp.init({ config });
      } else {
        console.error("Could not find CMS.init function", cms);
      }
      return () => null;
    }),
  { ssr: false, loading: () => <p className="text-center p-10">Loading CMS...</p> }
);

// Admin Access Key
const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_ACCESS_KEY || "adAGARAVAV@3308172425";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Determine if we are running on localhost to auto-enable local_backend
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      // We can rely on the config.yml 'local_backend: true' setting.
    }

    if (sessionStorage.getItem("finsense_admin_auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey === ADMIN_KEY) {
      setIsAuthenticated(true);
      sessionStorage.setItem("finsense_admin_auth", "true");
    } else {
      alert("Invalid Access Key");
    }
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
          <h1 className="text-2xl font-bold text-center mb-2">CMS Admin Access</h1>
          <p className="text-gray-400 text-center mb-8">Enter key to access Decap CMS.</p>

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
              Unlock CMS
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <CMS />
    </div>
  );
}
