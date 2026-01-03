
"use client";

import { usePathname } from 'next/navigation';

interface LayoutShellProps {
    children: React.ReactNode;
    header: React.ReactNode;
    footer: React.ReactNode;
}

export function LayoutShell({ children, header, footer }: LayoutShellProps) {
    const pathname = usePathname();
    // Check if we are in the admin section
    const isAdmin = pathname?.startsWith('/admin');

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            {header}
            <main className="flex-1 pt-16">
                {children}
            </main>
            {footer}
        </>
    );
}
