import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (!autoRotate || viewMode !== "orbital") return;

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      setRotationAngle((prev) => {
        const increment = (deltaTime / 1000) * 6;
        return (prev + increment) % 360;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    if (autoRotate && viewMode === "orbital") {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const baseRadius = windowWidth >= 1024 ? 280 :
                       windowWidth >= 768 ? 220 : 180;
    const radius = baseRadius;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-black border-white";
      case "in-progress":
        return "text-black bg-white border-black";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl lg:max-w-6xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 via-cyan-500 to-teal-400 animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-20 h-20 rounded-full border border-cyan-400/30 animate-ping opacity-70"></div>
            <div
              className="absolute w-24 h-24 rounded-full border border-cyan-400/20 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-8 h-8 rounded-full bg-cyan-100/90 backdrop-blur-md"></div>
          </div>

          <div
            className="absolute rounded-full border border-white/10 transition-all duration-500"
            style={{
              width: `${(windowWidth >= 1024 ? 280 : windowWidth >= 768 ? 220 : 180) * 2}px`,
              height: `${(windowWidth >= 1024 ? 280 : windowWidth >= 768 ? 220 : 180) * 2}px`
            }}
          ></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
              transition: autoRotate ? 'opacity 0.7s, z-index 0.7s' : 'all 0.7s',
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute cursor-pointer"
                style={{
                  ...nodeStyle,
                  willChange: 'transform',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, ${
                      isExpanded
                        ? "rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0) 70%"
                        : isRelated
                        ? "rgba(6, 182, 212, 0.3) 0%, rgba(6, 182, 212, 0) 70%"
                        : "rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0) 70%"
                    })`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-12 h-12 rounded-full flex items-center justify-center relative
                  ${
                    isExpanded
                      ? "bg-gradient-to-br from-cyan-400 via-cyan-500 to-teal-400"
                      : isRelated
                      ? "bg-gradient-to-br from-cyan-500/80 via-cyan-600/80 to-teal-500/80"
                      : "bg-black"
                  }
                  border
                  ${
                    isExpanded
                      ? "border-cyan-300 shadow-lg shadow-cyan-500/50"
                      : isRelated
                      ? "border-cyan-400 shadow-md shadow-cyan-500/30"
                      : "border-cyan-500/40"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-125" : "hover:scale-110"}
                `}
                >
                  {!isExpanded && !isRelated && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent"></div>
                  )}
                  <Icon
                    size={isExpanded ? 20 : 18}
                    className={`relative z-10 ${
                      isExpanded || isRelated ? "text-white" : "text-cyan-400"
                    }`}
                  />
                </div>

                <div
                  className={`
                  absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-[10px] sm:text-xs font-light tracking-wide
                  transition-all duration-300
                  max-w-[100px] sm:max-w-none overflow-hidden text-ellipsis
                  ${
                    isExpanded
                      ? "text-cyan-300 scale-110 font-normal"
                      : isRelated
                      ? "text-cyan-400/90"
                      : "text-gray-400"
                  }
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[90vw] max-w-[20rem] sm:w-72 bg-black border border-cyan-500/30 rounded-lg overflow-visible shadow-2xl shadow-cyan-500/20 z-[250]">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-gradient-to-b from-cyan-400/50 to-transparent"></div>

                    <div className="p-5">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/80 font-light">
                          {item.date}
                        </span>
                        <div className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-light rounded-full ${
                          item.status === "completed"
                            ? "bg-cyan-400/20 text-cyan-300 border border-cyan-400/30"
                            : item.status === "in-progress"
                            ? "bg-white/10 text-white border border-white/20"
                            : "bg-white/5 text-white/50 border border-white/10"
                        }`}>
                          {item.status === "completed"
                            ? "Actif"
                            : item.status === "in-progress"
                            ? "En cours"
                            : "Bientôt"}
                        </div>
                      </div>

                      <h3 className="text-lg font-normal text-white mb-3 tracking-wide">
                        {item.title}
                      </h3>

                      <p className="text-sm text-white/70 leading-relaxed font-light">
                        {item.content}
                      </p>

                      <div className="mt-5 pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center text-xs mb-2">
                          <span className="flex items-center gap-1.5 text-white/60 font-light">
                            <Zap size={12} className="text-cyan-400/70" />
                            Performance
                          </span>
                          <span className="font-light text-white/80">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-teal-400 rounded-full transition-all duration-500"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-white/10">
                          <h4 className="text-[11px] uppercase tracking-[0.15em] font-light text-white/50 mb-3 flex items-center gap-1.5">
                            <Link size={11} className="text-cyan-400/60" />
                            Aller plus loin
                          </h4>
                          <div className="flex flex-wrap gap-x-4 gap-y-2">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <button
                                  key={relatedId}
                                  className="text-xs text-cyan-400/80 hover:text-cyan-300 transition-colors duration-200 font-light underline decoration-cyan-400/30 hover:decoration-cyan-300/50 underline-offset-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
