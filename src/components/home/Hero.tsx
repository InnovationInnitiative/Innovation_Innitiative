"use client";

import Link from "next/link";
import { ArrowRight, Cpu, Network, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative overflow-hidden py-20 md:py-32 lg:py-40 bg-background">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
                        <Zap className="h-4 w-4" />
                        <span>Student Research Initiative @ IEM</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                        Advancing AI, ML, and <br className="hidden md:block" />
                        Quantum Solutions
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        We are Innovation Innitiative. A group of engineering researchers dedicated to building high-performance software and exploring the frontiers of technology.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 h-11 px-8 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                        >
                            View Projects <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 h-11 px-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
                        >
                            Contact Us
                        </Link>
                    </div>
                </motion.div>

                {/* Feature Icons */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto"
                >
                    <div className="flex flex-col items-center p-6 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
                        <div className="p-3 rounded-full bg-primary/10 mb-4">
                            <Cpu className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">Machine Learning</h3>
                        <p className="text-sm text-muted-foreground">Developing intelligent systems that adapt and learn.</p>
                    </div>
                    <div className="flex flex-col items-center p-6 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
                        <div className="p-3 rounded-full bg-primary/10 mb-4">
                            <Network className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">Financial Engineering</h3>
                        <p className="text-sm text-muted-foreground">Algorithmic trading and market sentiment analysis.</p>
                    </div>
                    <div className="flex flex-col items-center p-6 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
                        <div className="p-3 rounded-full bg-primary/10 mb-4">
                            <Zap className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">Web Technologies</h3>
                        <p className="text-sm text-muted-foreground">High-performance Full Stack applications.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
