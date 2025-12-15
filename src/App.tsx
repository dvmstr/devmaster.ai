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

function App() {
  return (
    <>
      <SEOHead pageSlug="home" />
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
