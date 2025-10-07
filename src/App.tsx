import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { LogoBanner } from "./components/LogoBanner";
import { Benefits } from "./components/Benefits";
import { SolutionsOrbital } from "./components/SolutionsOrbital";
import { Results } from "./components/Results";
import { Testimonials } from "./components/Testimonials";
import { ProcessTimeline } from "./components/ProcessTimeline";
import { FAQ } from "./components/FAQ";
import { CTAFinal } from "./components/CTAFinal";
import { Footer } from "./components/Footer";

function App() {
  return (
    <main className="bg-black min-h-screen">
      <Navigation />
      <Hero />
      <Benefits />
      <SolutionsOrbital />
      <Results />
      <Testimonials />
      <ProcessTimeline />
      <FAQ />
      <CTAFinal />
      <Footer />
    </main>
  );
}

export default App;
