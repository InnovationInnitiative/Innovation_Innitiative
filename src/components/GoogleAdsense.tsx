"use client";

import Script from "next/script";

type Props = {
    pId?: string;
};

export function GoogleAdsense({ pId }: Props) {
    if (!pId) return null;

    // Ensure we handle cases where user includes "pub-" or "ca-pub-" or just the number
    const cleanId = pId.replace(/^ca-pub-/, "").replace(/^pub-/, "");

    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${cleanId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}
