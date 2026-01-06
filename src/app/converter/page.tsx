"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const PRESET_BASES = [
    { label: "Binary (2)", value: 2 },
    { label: "Octal (8)", value: 8 },
    { label: "Decimal (10)", value: 10 },
    { label: "Hexadecimal (16)", value: 16 },
    { label: "Custom", value: "custom" },
];

export default function ConverterPage() {
    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState("");
    const [fromBase, setFromBase] = useState<number | "custom">(10);
    const [toBase, setToBase] = useState<number | "custom">(2);
    const [customFromBase, setCustomFromBase] = useState("3");
    const [customToBase, setCustomToBase] = useState("3");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    // Calculate actual numeric bases
    const getBase = (base: number | "custom", customVal: string) => {
        if (base === "custom") {
            const parsed = parseInt(customVal);
            return isNaN(parsed) || parsed < 2 || parsed > 36 ? 10 : parsed;
        }
        return base;
    };

    useEffect(() => {
        convert();
    }, [inputValue, fromBase, toBase, customFromBase, customToBase]);

    const convert = () => {
        setError("");
        if (!inputValue) {
            setResult("");
            return;
        }

        const from = getBase(fromBase, customFromBase);
        const to = getBase(toBase, customToBase);

        try {
            // Validate input for the specific base
            // We use a regex to check if the digits are valid for the base
            const validChars = "0123456789abcdefghijklmnopqrstuvwxyz".substring(0, from);
            const regex = new RegExp(`^[${validChars}]+$`, "i");

            // Remove spaces for validation/conversion
            const cleanInput = inputValue.trim();

            // Handle floating point if needed later, for now stick to integers as per request context roughly
            // or standard parseInt logic.
            if (!regex.test(cleanInput)) {
                throw new Error(`Invalid characters for Base ${from}`);
            }

            const decimalValue = parseInt(cleanInput, from);
            if (isNaN(decimalValue)) {
                throw new Error("Invalid number");
            }

            const converted = decimalValue.toString(to).toUpperCase();
            setResult(converted);
        } catch (err: any) {
            // If parseInt fails or custom validation fails
            setResult("");
            // Only show error if input is not empty to avoid annoyance while typing
            if (inputValue.length > 0) {
                setError("Invalid characters for the selected base.");
            }
        }
    };

    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(result);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-background">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-4">
                        Number System Converter
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Convert between Binary, Octal, Decimal, Hexadecimal, and custom bases instantly.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="group relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-primary/5 transition-all duration-300"
                    >
                        {/* From Base Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">From Base</label>
                                <div className="flex gap-2">
                                    <select
                                        value={fromBase}
                                        onChange={(e) => setFromBase(e.target.value === "custom" ? "custom" : parseInt(e.target.value))}
                                        className="flex h-12 w-full items-center justify-between rounded-lg border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {PRESET_BASES.map((base) => (
                                            <option key={base.label} value={base.value}>
                                                {base.label}
                                            </option>
                                        ))}
                                    </select>
                                    {fromBase === "custom" && (
                                        <input
                                            type="number"
                                            min="2"
                                            max="36"
                                            value={customFromBase}
                                            onChange={(e) => setCustomFromBase(e.target.value)}
                                            className="w-20 rounded-lg border border-input bg-background/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* To Base Section */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">To Base</label>
                                <div className="flex gap-2">
                                    <select
                                        value={toBase}
                                        onChange={(e) => setToBase(e.target.value === "custom" ? "custom" : parseInt(e.target.value))}
                                        className="flex h-12 w-full items-center justify-between rounded-lg border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {PRESET_BASES.map((base) => (
                                            <option key={base.label} value={base.value}>
                                                {base.label}
                                            </option>
                                        ))}
                                    </select>
                                    {toBase === "custom" && (
                                        <input
                                            type="number"
                                            min="2"
                                            max="36"
                                            value={customToBase}
                                            onChange={(e) => setCustomToBase(e.target.value)}
                                            className="w-20 rounded-lg border border-input bg-background/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Input & Output Area */}
                        <div className="space-y-8 relative">
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                    Input Number (Base {fromBase === "custom" ? customFromBase : fromBase})
                                </label>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={`Enter Base ${fromBase === "custom" ? customFromBase : fromBase} number...`}
                                    className={cn(
                                        "w-full bg-background/50 border rounded-xl p-4 text-2xl font-mono focus:outline-none focus:ring-2 transition-all",
                                        error ? "border-red-500/50 focus:ring-red-500/50" : "border-border/50 focus:ring-primary/50"
                                    )}
                                />
                                {error && (
                                    <p className="text-red-400 text-sm animate-pulse ml-1">{error}</p>
                                )}
                            </div>

                            <div className="flex justify-center">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <ArrowRightLeft className="w-6 h-6 rotate-90 md:rotate-0" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                        Result (Base {toBase === "custom" ? customToBase : toBase})
                                    </label>
                                    {result && (
                                        <button
                                            onClick={handleCopy}
                                            className="text-xs flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors bg-primary/10 px-2 py-1 rounded-md"
                                        >
                                            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                            {copied ? "Copied" : "Copy"}
                                        </button>
                                    )}
                                </div>
                                <div className="w-full bg-background/80 border border-border/50 rounded-xl p-4 min-h-[4rem] flex items-center transition-all group-hover:border-primary/30">
                                    <span className="text-2xl font-mono text-foreground break-all">
                                        {result || <span className="text-muted-foreground/30">Result will appear here...</span>}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick References or Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center text-sm text-muted-foreground"
                    >
                        <p>Supports conversion between standard bases and custom bases (2-36).</p>
                    </motion.div>
                </div>

                {/* Developer Explanation Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-3xl mx-auto mt-20 p-8 md:p-10 bg-card/30 backdrop-blur border border-border/50 rounded-3xl"
                >
                    <div className="prose prose-invert max-w-none">
                        <h3 className="text-2xl font-bold mb-6 text-foreground/90">A Note from the Lab</h3>
                        <div className="space-y-4 text-muted-foreground leading-relaxed font-light">
                            <p>
                                Hey there! As someone who's spent countless late nights staring at memory dumps and binary streams,
                                I know exactly why you're here. We built this Number System Converter because, frankly, constantly
                                switching between scientific calculators or manually scribbling out base conversions on a whiteboard
                                is a pain. At the Innovation Initiative, we believe the tools you use should just <em>work</em>
                                and feel good doing it.
                            </p>
                            <p>
                                I remember when I first started learning about low-level computing; understanding how data is
                                actually represented was a huge hurdle. It's not just about 0s and 1s; it's about seeing the
                                patterns in Hex (16 is such a beautiful number for computers, isn't it?) or realizing how compact
                                Octal can be for permissions. This tool isn't just a utility for us; it's a little bridge between
                                the human decimal world we grow up in and the machine world we build in.
                            </p>
                            <p>
                                We designed this with a few specific things in mind. We wanted it to be fast—real-time fast.
                                You shouldn't have to hit 'submit' just to see what <code className="text-primary/80">1101</code>
                                is in decimal. We also wanted it to handle the weird stuff. Need to convert from Base-7 to Base-23?
                                We got you. It might not come up often, but when it does, you don't want to be writing a custom
                                script for it.
                            </p>
                            <p>
                                So, whether you're a student wrapping your head around binary logic for the first time, or a
                                seasoned systems engineer debugging a network packet, this little corner of our hub is for you.
                                It's simple, it's clean, and it's built with that genuine "for devs, by devs" spirit we love here.
                                Hope it saves you a few minutes of headache today!
                            </p>
                            <p className="pt-4 text-primary font-medium">
                                — Avigyan Das
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
