import React from "react";

type AdUnitProps = {
    className?: string; // Allow custom styling/sizing
    slotId?: string;    // If using specific ad slots
    format?: "auto" | "fluid" | "rectangle" | "vertical"; // Ad format
};

export function AdUnit({ className, slotId, format = "auto" }: AdUnitProps) {
    return (
        <div className={`ad-container my-8 flex justify-center ${className}`}>
            {/* 
            This structure is what Google AdSense looks for. 
            In development (localhost), ads won't show up.
            Once deployed and approved, Google injects the ad here.
        */}
            <ins
                className="adsbygoogle"
                style={{ display: "block", minWidth: "300px", minHeight: "250px", width: "100%" }}
                data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`} // Needs env var
                data-ad-slot={slotId || "1234567890"} // Placeholder slot if not provided
                data-ad-format={format}
                data-full-width-responsive="true"
            />
            <div className="text-xs text-center text-muted-foreground mt-1">Advertisement</div>
        </div>
    );
}
