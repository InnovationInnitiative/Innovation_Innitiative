import Link from "next/link";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-muted/30 border-t border-border mt-auto">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <Link href="/" className="font-bold text-lg tracking-tight mb-4 inline-block">
                            Innovation Innitiative
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-sm">
                            Advancing AI, ML, and Quantum Solutions. A student research initiative dedicated to pushing the boundaries of technology.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Explore</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link></li>
                            <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                            <li><Link href="/about" className="hover:text-foreground transition-colors">About Team</Link></li>
                            <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                            <li><Link href="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link></li>
                            <li><Link href="/sitemap.xml" className="hover:text-foreground transition-colors">Sitemap</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>&copy; {currentYear} Innovation Innitiative. All rights reserved.</p>
                    <div className="flex gap-4">
                        {/* Social links placeholder */}
                        <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors text-xs font-medium">
                            Admin Login
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
