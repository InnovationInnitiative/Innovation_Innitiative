import { ProjectsPreview } from "@/components/home/ProjectsPreview";

// Reusing the ProjectsPreview for now, but wrapped in a page container
export default function ProjectsPage() {
    return (
        <div className="min-h-screen pt-8">
            <div className="container mx-auto px-4 mb-8 text-center">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Our Projects</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Deep dive into our portfolios. Each project represents a unique challenge we&apos;ve tackled.
                </p>
            </div>
            {/* We can refactor ProjectsPreview to take props or just reuse it as is for simplicity */}
            <ProjectsPreview />
        </div>
    );
}
