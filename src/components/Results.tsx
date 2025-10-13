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
    <section id="results" className="relative py-12 sm:py-16 pb-24 sm:pb-32">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-3 sm:mb-4 px-2">
            Des résultats mesurables
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-2">
            Nos clients constatent un impact immédiat sur leur performance
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-5 text-center shadow-xl">
            <div className="text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-1 sm:mb-2">
              <CountUp end={300} />%
            </div>
            <div className="text-[10px] sm:text-xs text-gray-400 leading-tight">Augmentation de productivité</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-5 text-center shadow-xl">
            <div className="text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-1 sm:mb-2">
              <CountUp end={20} />h
            </div>
            <div className="text-[10px] sm:text-xs text-gray-400 leading-tight">Économisées par semaine</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-5 text-center shadow-xl">
            <div className="text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-1 sm:mb-2">
              <CountUp end={95} />%
            </div>
            <div className="text-[10px] sm:text-xs text-gray-400 leading-tight">Satisfaction client</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-5 text-center shadow-xl">
            <div className="text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-1 sm:mb-2">
              <CountUp end={48} />h
            </div>
            <div className="text-[10px] sm:text-xs text-gray-400 leading-tight">Délai de mise en place</div>
          </div>
        </div>
      </div>

      <LightSource direction={180} color="cyan" intensity="high" className="-bottom-16" />
    </section>
  );
};
