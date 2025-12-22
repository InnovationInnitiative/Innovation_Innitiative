export default function TermsOfService() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
            <div className="prose prose-zinc dark:prose-invert max-w-none">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <h2>1. Acceptance of Terms</h2>
                <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>

                <h2>2. Intellectual Property</h2>
                <p>The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary (including but not limited to intellectual property) rights.</p>

                <h2>3. Disclaimer</h2>
                <p>The materials on Innovation Innitiative&apos;s website are provided on an &apos;as is&apos; basis. Innovation Innitiative makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </div>
        </div>
    );
}
