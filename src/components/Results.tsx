import { LightSource } from "./LightSource";
import { useEffect, useRef, useState } from "react";

const CountUp = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return <div ref={ref}>{count}</div>;
};

export const Results = () => {
  return (
    <section id="results" className="relative py-16 pb-32 overflow-x-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-medium text-white mb-4">
            Des résultats mesurables
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Nos clients constatent un impact immédiat sur leur performance
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 text-center shadow-xl">
            <div className="text-3xl md:text-4xl font-medium text-white mb-2">
              <CountUp end={300} />%
            </div>
            <div className="text-xs text-gray-400">Augmentation de productivité</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 text-center shadow-xl">
            <div className="text-3xl md:text-4xl font-medium text-white mb-2">
              <CountUp end={20} />h
            </div>
            <div className="text-xs text-gray-400">Économisées par semaine</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 text-center shadow-xl">
            <div className="text-3xl md:text-4xl font-medium text-white mb-2">
              <CountUp end={95} />%
            </div>
            <div className="text-xs text-gray-400">Satisfaction client</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 text-center shadow-xl">
            <div className="text-3xl md:text-4xl font-medium text-white mb-2">
              <CountUp end={48} />h
            </div>
            <div className="text-xs text-gray-400">Délai de mise en place</div>
          </div>
        </div>
      </div>

      <LightSource direction={180} color="cyan" intensity="high" className="-bottom-16" />
    </section>
  );
};
