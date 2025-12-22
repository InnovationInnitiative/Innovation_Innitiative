"use client";

import Image from "next/image";
import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

// TODO: Update these details with real names, images, and links
const team = [
    {
        name: "Avigyan Das",
        role: "AI Research Lead",
        bio: "Specializing in Large Language Models and NLP.",
        image: "/images/member1.jpg",
        github: "https://github.com/Avigyan-Das",
        linkedin: "https://www.linkedin.com/in/avigyan-das-215687290/"
    },
    {
        name: "Avijit Saha",
        role: "Full Stack Engineer",
        bio: "Expert in Next.js, React, and Scalable Systems.",
        image: "/images/member2.jpg",
        github: "https://github.com/wwwavijitsaha13-art",
        linkedin: "https://www.linkedin.com/in/avijit-saha-0a104628b/"
    },
    {
        name: "Arpan Pal",
        role: "ML Engineer",
        bio: "Focusing on Computer Vision and Deep Learning.",
        image: "/images/member3.jpg",
        github: "https://github.com/ArpanPal69",
        linkedin: "https://www.linkedin.com/in/arpan-pal-919a22291/"
    },
    {
        name: "Arghadeep Saha",
        role: "Quantum Researcher",
        bio: "Exploring quantum algorithms and simulation.",
        image: "/images/member4.jpg",
        github: "https://github.com/67SA15HA",
        linkedin: "https://www.linkedin.com/in/arghadeep-saha-96846328b/"
    },
    {
        name: "Adrish Chakraborty",
        role: "Data Scientist",
        bio: "Data analysis, visualization, and predictive modeling.",
        image: "/images/member5.jpg",
        github: "https://github.com/AdrishChakraborty93",
        linkedin: "https://www.linkedin.com/in/adrish-chakraborty-ab574728a/"
    },
];

export function TeamPreview() {
    return (
        <section className="py-20 bg-muted/30 border-t border-border">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Meet Our Team</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        We are a group of 3rd-year B.Tech CSE AI&ML students at Institute of Engineering and Management (IEM), passionate about solving real-world problems through technology.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    {team.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-background shadow-lg"
                            >
                                {/* Fallback to placeholder if local image is missing (handled by error/loading logic in real apps, but here we expect user to add images) */}
                                <Image
                                    src={member.image}
                                    alt={`${member.name} - ${member.role} at Innovation Innitiative`}
                                    fill
                                    className="object-cover bg-secondary"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </motion.div>

                            <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                            <p className="text-xs text-primary font-medium mb-3 uppercase tracking-wide">{member.role}</p>
                            <p className="text-sm text-muted-foreground mb-4 px-2">{member.bio}</p>

                            <div className="flex gap-4 mt-auto opacity-70 group-hover:opacity-100 transition-opacity">
                                <a
                                    href={member.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-all"
                                >
                                    <Github className="h-4 w-4" />
                                    <span className="sr-only">GitHub</span>
                                </a>
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-background border border-border hover:border-blue-600 hover:text-blue-600 transition-all"
                                >
                                    <Linkedin className="h-4 w-4" />
                                    <span className="sr-only">LinkedIn</span>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
