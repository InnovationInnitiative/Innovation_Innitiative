import { Rocket, Target, Users } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">About Innovation Innitiative</h1>

                <div className="bg-muted/30 p-8 rounded-2xl mb-12 border border-border">
                    <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                        We are Innovation Innitiative, a student research group from Institute of Engineering and Management (IEM).
                        Our mission is to bridge the gap between theoretical computer science and applied engineering.
                        Focused on the intersection of AI, Financial Engineering, and Quantum Computing, we strive to build
                        solutions that are not just technically sound but innovation-driven.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="flex flex-col items-center text-center p-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                            <Rocket className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                        <p className="text-muted-foreground">To explore emerging technologies and build software that matters.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                            <Target className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                        <p className="text-muted-foreground">To become a leading hub for student-led technological research.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                            <Users className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Who We Are</h3>
                        <p className="text-muted-foreground">A team of 5 passionate B.Tech CSE AI&ML students.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
