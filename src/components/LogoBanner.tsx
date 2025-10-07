export const LogoBanner = () => {
  const logos = [
    "Google", "Salesforce", "HubSpot", "Slack", "Microsoft", "Notion", "Airtable", "OpenAI"
  ];

  return (
    <section className="py-12 border-y border-white/10 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-gray-500 mb-6 text-xs uppercase tracking-widest font-light">
          Ils nous font confiance
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10">
          {logos.map((logo, index) => (
            <div key={index} className="text-gray-600 font-light text-base hover:text-gray-400 transition-colors">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
