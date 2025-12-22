import Link from "next/link";
import { ExternalLink, ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
    {
        title: "Finsense",
        description: "An advanced stock market sentiment analysis tool integrating 'Man with Hat' architecture.",
        tags: ["FinTech", "Next.js", "AI Analysis"],
        href: "https://bullvibe.innovationinnitiative.in", // Placeholder URL
        color: "bg-blue-500/10 text-blue-500",
    },
    // Projects currently in stealth mode are hidden for AdSense compliance
    // {
    //     title: "Coming Soon",
    //     description: "",
    //     tags: ["NLP", "Generative AI", "Python"],
    //     href: "#",
    //     color: "bg-purple-500/10 text-purple-500",
    // },
    // {
    //     title: "Coming Soon",
    //     description: "",
    //     tags: ["Quantum Computing", "Research"],
    //     href: "#",
    //     color: "bg-emerald-500/10 text-emerald-500",
    // },
];

export function ProjectsPreview() {
    return (
        <section className="py-20 border-t border-border">
            <div className="container mx-auto px-4">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Our Projects</h2>
                        <p className="text-muted-foreground">Exploring the frontiers of what&apos;s possible.</p>
                    </div>
                    <Link href="/projects" className="hidden md:flex items-center text-primary font-medium hover:underline">
                        View All Projects <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.title} className="group relative rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50">
                            <div className={cn("inline-flex items-center justify-center p-2 rounded-md mb-4", project.color)}>
                                <ExternalLink className="h-5 w-5" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                            <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <Link href={project.href} className="absolute inset-0 z-10">
                                <span className="sr-only">View {project.title}</span>
                            </Link>
                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1">
                                <ArrowUpRight className="h-5 w-5 text-primary" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 md:hidden text-center">
                    <Link href="/projects" className="inline-flex items-center text-primary font-medium hover:underline">
                        View All Projects <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

