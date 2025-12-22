"use client";

import { useState } from "react";
import { Mail, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Inline Button for speed if UI lib not fully set
function SimpleButton({ className, children, isLoading, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean }) {
    return (
        <button
            className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2", className)}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
}

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        // Simulate API call
        setTimeout(() => {
            setStatus("success");
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-4 tracking-tight">Contact Us</h1>
                <p className="text-muted-foreground mb-8">
                    Have a question or want to collaborate? Reach out to us.
                </p>

                {status === "success" ? (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-8 text-center animate-in fade-in zoom-in duration-300">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-4">
                            <CheckCircle className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground">Thanks for reaching out. We&apos;ll get back to you soon.</p>
                        <button
                            onClick={() => setStatus("idle")}
                            className="mt-6 text-sm font-medium text-primary hover:underline"
                        >
                            Send another message
                        </button>
                    </div>
                ) : (
                    <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                                    <input required id="name" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Your name" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                                    <input required type="email" id="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="you@example.com" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
                                <textarea required id="message" className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y" placeholder="How can we help?" />
                            </div>

                            <SimpleButton type="submit" className="w-full" isLoading={status === "loading"}>
                                Send Message
                            </SimpleButton>
                        </form>

                        <div className="mt-8 pt-6 border-t border-border flex items-center justify-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span className="text-sm">innovationinnitiative@gmail.com</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
