import { Hero } from "@/components/home/Hero";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { TeamPreview } from "@/components/home/TeamPreview";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero />
            <ProjectsPreview />
            <TeamPreview />
        </div>
    );
}
