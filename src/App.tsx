import { Navigation, Footer } from "@/components/layout";
import { 
  Hero, 
  Benefits, 
  Solutions, 
  Results, 
  Testimonials, 
  Process, 
  FAQ, 
  CTA 
} from "@/components/sections";
import { SEOHead } from "@/components/common";
import { useCurrentLocale } from "@/contexts";

function App() {
  const locale = useCurrentLocale();

  return (
    <>
      <SEOHead pageSlug="home" locale={locale} />
      <a
        href="#benefits"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-black focus:rounded-md focus:text-sm focus:font-medium"
      >
        {locale === 'fr' ? 'Aller au contenu' : locale === 'zh' ? '跳到内容' : 'Skip to content'}
      </a>
      <main className="bg-black min-h-screen">
        <Navigation />
        <Hero />
        <Benefits />
        <Solutions />
        <Results />
        <Testimonials />
        <Process />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}

export default App;
