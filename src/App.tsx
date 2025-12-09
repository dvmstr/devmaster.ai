import { NavigationSupabase } from "./components/NavigationSupabase";
import { Hero } from "./components/Hero";
import { Benefits } from "./components/Benefits";
import { SolutionsOrbital } from "./components/SolutionsOrbital";
import { Results } from "./components/Results";
import { TestimonialsSupabase } from "./components/TestimonialsSupabase";
import { ProcessTimeline } from "./components/ProcessTimeline";
import { FAQSupabase } from "./components/FAQSupabase";
import { CTAFinal } from "./components/CTAFinal";
import { Footer } from "./components/Footer";
import { SEOHead } from "./components/SEOHead";

function App() {
  return (
    <>
      <SEOHead pageSlug="home" />
      <main className="bg-black min-h-screen">
        <NavigationSupabase />
        <Hero />
        <Benefits />
        <SolutionsOrbital />
        <Results />
        <TestimonialsSupabase />
        <ProcessTimeline />
        <FAQSupabase />
        <CTAFinal />
        <Footer />
      </main>
    </>
  );
}

export default App;
