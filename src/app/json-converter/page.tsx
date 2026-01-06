"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Copy, Check, Download, RefreshCw, FileText, List, Table } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "lines" | "keyval" | "csv" | "format";

export default function JsonConverterPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<Mode>("lines");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const convert = () => {
        setError("");
        if (!input.trim()) {
            setOutput("");
            return;
        }

        try {
            let result: any;

            switch (mode) {
                case "lines":
                    // Convert lines to string array
                    result = input.split("\n").filter(line => line.trim() !== "");
                    break;

                case "keyval":
                    // Convert "Key: Value" or "Key=Value" to object
                    result = {};
                    input.split("\n").forEach(line => {
                        if (!line.trim()) return;
                        const separator = line.includes("=") ? "=" : ":";
                        const [key, ...rest] = line.split(separator);
                        if (key && rest.length > 0) {
                            result[key.trim()] = rest.join(separator).trim();
                        }
                    });
                    break;

                case "csv":
                    // Simple CSV parser (assuming first row is header)
                    const lines = input.split("\n").filter(l => l.trim());
                    if (lines.length < 2) throw new Error("CSV requires at least a header and one row.");

                    const headers = lines[0].split(",").map(h => h.trim());
                    result = lines.slice(1).map(line => {
                        const values = line.split(",");
                        const obj: any = {};
                        headers.forEach((h, i) => {
                            obj[h] = values[i]?.trim() || "";
                        });
                        return obj;
                    });
                    break;

                case "format":
                    // Prettify existing JSON
                    result = JSON.parse(input);
                    break;
            }

            setOutput(JSON.stringify(result, null, 2));
        } catch (err: any) {
            setError(err.message || "Invalid input for the selected mode.");
            setOutput("");
        }
    };

    const handleCopy = () => {
        if (output) {
            navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const downloadJson = () => {
        if (!output) return;
        const blob = new Blob([output], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "converted_data.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const modes = [
        { id: "lines", label: "Lines to Array", icon: List, placeholder: "Apple\nBanana\nCherry" },
        { id: "keyval", label: "Key-Value Pairs", icon: FileText, placeholder: "Name: John Doe\nRole: Developer\nLocation: Remote" },
        { id: "csv", label: "CSV to JSON", icon: Table, placeholder: "name,age,city\nAlice,25,New York\nBob,30,London" },
        { id: "format", label: "Format / Validate", icon: RefreshCw, placeholder: '{"ugly":  "json", "lines": [1,2,3]}' },
    ];

    const currentMode = modes.find(m => m.id === mode) || modes[0];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-background">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 mb-4">
                        Text to JSON Converter
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Transform text lists, key-value pairs, and CSV data into valid structured JSON.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar / Mode Selector */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-1 space-y-2"
                    >
                        <div className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-2 sticky top-24">
                            {modes.map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => { setMode(m.id as Mode); setInput(""); setOutput(""); setError(""); }}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                                        mode === m.id
                                            ? "bg-primary/10 text-primary shadow-sm"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    <m.icon className="w-4 h-4" />
                                    {m.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Main Converter Area */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {/* Input Section */}
                        <div className="flex flex-col h-[500px] bg-card/50 backdrop-blur border border-border/50 rounded-xl p-4 shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Input</label>
                                <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                                    {mode === "format" ? "Paste JSON" : "Paste Text"}
                                </span>
                            </div>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={currentMode.placeholder}
                                className="flex-1 w-full bg-background/50 border border-border/50 rounded-lg p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground/30"
                                spellCheck={false}
                            />
                        </div>

                        {/* Output Section */}
                        <div className="flex flex-col h-[500px] bg-card/50 backdrop-blur border border-border/50 rounded-xl p-4 shadow-lg relative overflow-hidden">
                            {/* Convert Action - Centered Overlay on Mobile, Hidden or Absolute for logic */}
                            <div className="absolute top-1/2 -left-3 transform -translate-y-1/2 z-10 md:block hidden">
                                <button
                                    onClick={convert}
                                    disabled={!input}
                                    className="h-10 w-10 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                                    title="Convert"
                                >
                                    <ArrowRight className="w-5 h-5 text-primary-foreground group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </div>

                            {/* Mobile Convert Button */}
                            <div className="md:hidden py-4 flex justify-center">
                                <button onClick={convert} className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium shadow-lg active:scale-95 transition-all">
                                    Convert to JSON
                                </button>
                            </div>


                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">JSON Output</label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleCopy}
                                        disabled={!output}
                                        className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                                        title="Copy to Clipboard"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={downloadJson}
                                        disabled={!output}
                                        className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                                        title="Download JSON"
                                    >
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className={cn(
                                "flex-1 w-full bg-slate-950 border border-border/50 rounded-lg p-4 overflow-auto font-mono text-sm relative",
                                error ? "border-red-500/50" : ""
                            )}>
                                {error ? (
                                    <div className="text-red-400 p-2">
                                        <p className="font-bold mb-1">Error:</p>
                                        {error}
                                    </div>
                                ) : (
                                    <pre className="text-green-400">
                                        {output || <span className="text-slate-700 select-none">// Output will appear here...</span>}
                                    </pre>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Developer Explanation Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-3xl mx-auto mt-20 p-8 md:p-10 bg-card/30 backdrop-blur border border-border/50 rounded-3xl"
                >
                    <div className="prose prose-invert max-w-none">
                        <h3 className="text-2xl font-bold mb-6 text-foreground/90">Why We Built This</h3>
                        <div className="space-y-4 text-muted-foreground leading-relaxed font-light">
                            <p>
                                Let's be real—managing data formatting is probably 90% of the "busy work" we do as developers.
                                I can't tell you how many times I've had a client or a team member send me a list of requirements
                                in a Word doc, or a CSV dump from some legacy system, and I just needed it in JSON <em>now</em>
                                to mock up an API response. That's exactly why we whipped up this Text to JSON Converter.
                            </p>
                            <p>
                                At the Innovation Initiative, we're all about removing friction. You shouldn't have to manually
                                wrap quotes around keys or check for missing commas line by line. It's tedious, error-prone,
                                and honestly, a waste of your creative energy. This tool is our way of saying, "Here, let us
                                handle the boring syntax stuff so you can get back to building."
                            </p>
                            <p>
                                We included a few modes that we use personally. The <strong>Lines to Array</strong> feature?
                                That's my go-to when I paste a list of names or IDs. The <strong>CSV to JSON</strong> is a
                                lifesaver when dealing with spreadsheet data. And of course, the <strong>Validator</strong>—because
                                nothing hurts more than a cryptic syntax error crashing your app because of a stray trailing comma.
                            </p>
                            <p>
                                We built this to be a workspace, not just a function. It respects your time. It’s local, it’s fast,
                                and it doesn't send your data flying off to some unknown server. It’s just running right here in
                                your browser. We use this daily, and we hope it becomes one of those reliable little tabs you keep
                                open, just in case.
                            </p>
                            <p className="pt-4 text-blue-400 font-medium">
                                — Happy coding, from the I.I. Team
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
