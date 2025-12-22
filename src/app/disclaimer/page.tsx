export default function Disclaimer() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Disclaimer</h1>
            <div className="prose prose-zinc dark:prose-invert max-w-none">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <h2>General Disclaimer</h2>
                <p>The information provided by Innovation Innitiative (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) on this website is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the Site.</p>

                <h2>Under No Circumstance</h2>
                <p>Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.</p>
            </div>
        </div>
    );
}
