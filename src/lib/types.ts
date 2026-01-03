
export type BlogPost = {
    title: string;
    excerpt: string;
    date: string;
    category: "Backend Engineering" | "Data Processing" | "Financial Analysis" | "User Experience" | "Cybersecurity" | "Quantum Computing" | "UI/UX Design";
    author: string;
    slug: string;
    content: string;
    mainImage?: string;
};
