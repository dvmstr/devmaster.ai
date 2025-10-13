import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Direction = 0 | 90 | 180 | 270;

interface LightSourceProps {
  direction?: Direction;
  color?: string;
  intensity?: "low" | "medium" | "high";
  animated?: boolean;
  className?: string;
}

export const LightSource: React.FC<LightSourceProps> = ({
  direction = 0,
  color = "cyan",
  intensity = "medium",
  animated = true,
  className = "",
}) => {
  const getRotationStyle = () => {
    switch (direction) {
      case 0:
        return "rotate-0";
      case 90:
        return "rotate-90";
      case 180:
        return "rotate-180";
      case 270:
        return "-rotate-90";
      default:
        return "rotate-0";
    }
  };

  const getPositionClasses = () => {
    switch (direction) {
      case 0:
        return "-top-40 left-1/2 -translate-x-1/2";
      case 90:
        return "-right-40 top-1/2 -translate-y-1/2";
      case 180:
        return "-bottom-40 left-1/2 -translate-x-1/2";
      case 270:
        return "-left-40 top-1/2 -translate-y-1/2";
      default:
        return "-top-40 left-1/2 -translate-x-1/2";
    }
  };

  const getColorClasses = () => {
    const colorMap: Record<string, { from: string; to: string; glow: string; beam: string }> = {
      cyan: {
        from: "from-cyan-500",
        to: "to-cyan-500",
        glow: "bg-cyan-500",
        beam: "bg-cyan-400",
      },
      blue: {
        from: "from-cyan-500",
        to: "to-cyan-500",
        glow: "bg-cyan-500",
        beam: "bg-cyan-500",
      },
      purple: {
        from: "from-purple-500",
        to: "to-purple-500",
        glow: "bg-purple-500",
        beam: "bg-purple-400",
      },
      green: {
        from: "from-green-500",
        to: "to-green-500",
        glow: "bg-green-500",
        beam: "bg-green-400",
      },
      red: {
        from: "from-red-500",
        to: "to-red-500",
        glow: "bg-red-500",
        beam: "bg-red-400",
      },
    };

    return colorMap[color] || colorMap.cyan;
  };

  const getIntensityValues = () => {
    const intensityMap = {
      low: {
        opacity: 0.3,
        blur: "blur-2xl",
        glowOpacity: 0.3,
      },
      medium: {
        opacity: 0.5,
        blur: "blur-3xl",
        glowOpacity: 0.5,
      },
      high: {
        opacity: 0.7,
        blur: "blur-3xl",
        glowOpacity: 0.7,
      },
    };

    return intensityMap[intensity];
  };

  const colors = getColorClasses();
  const intensityValues = getIntensityValues();
  const positionClasses = getPositionClasses();

  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isInView = useInView(containerRef, {
    once: false,
    amount: isMobile ? 0.1 : 0.3,
    margin: isMobile ? "0px 0px -100px 0px" : "0px"
  });

  const conicAnimationProps = animated
    ? {
        initial: { opacity: 0.5, width: isMobile ? "10.5rem" : "15rem" },
        animate: isInView ? { opacity: 1, width: isMobile ? "21rem" : "30rem" } : { opacity: 0.5, width: isMobile ? "10.5rem" : "15rem" },
        transition: {
          duration: 1.2,
          ease: "easeInOut",
        },
      }
    : {};

  const beamAnimationProps = animated
    ? {
        initial: { opacity: 0, width: isMobile ? "5.6rem" : "8rem" },
        animate: isInView ? { opacity: intensityValues.opacity, width: isMobile ? "11.2rem" : "16rem" } : { opacity: 0, width: isMobile ? "5.6rem" : "8rem" },
        transition: {
          duration: 1.2,
          ease: "easeInOut",
        },
      }
    : { style: { opacity: intensityValues.opacity } };

  const lineAnimationProps = animated
    ? {
        initial: { opacity: 0, width: isMobile ? "10.5rem" : "15rem" },
        animate: isInView ? { opacity: 1, width: isMobile ? "21rem" : "30rem" } : { opacity: 0, width: isMobile ? "10.5rem" : "15rem" },
        transition: {
          duration: 1.2,
          ease: "easeInOut",
        },
      }
    : {};

  const glowAnimationProps = animated
    ? {
        initial: { opacity: 0, width: isMobile ? "7rem" : "10rem" },
        animate: isInView ? { opacity: intensityValues.glowOpacity, width: isMobile ? "19.6rem" : "28rem" } : { opacity: 0, width: isMobile ? "7rem" : "10rem" },
        transition: {
          duration: 1.2,
          ease: "easeInOut",
        },
      }
    : { style: { opacity: intensityValues.glowOpacity } };

  return (
    <div
      ref={containerRef}
      className={`absolute ${positionClasses} pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      <div className={`relative w-[800px] h-[600px] flex items-center justify-center ${getRotationStyle()}`}>
        <motion.div
          {...conicAnimationProps}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className={`absolute inset-auto right-1/2 h-56 overflow-visible bg-gradient-conic ${colors.from} via-transparent to-transparent [--conic-position:from_70deg_at_center_top]`}
        >
          <div className="absolute w-[100%] left-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        <motion.div
          {...conicAnimationProps}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className={`absolute inset-auto left-1/2 h-56 overflow-visible bg-gradient-conic from-transparent via-transparent ${colors.to} [--conic-position:from_290deg_at_center_top]`}
        >
          <div className="absolute w-40 h-[100%] right-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        <div className="absolute top-1/2 h-48 w-[800px] translate-y-12 scale-x-150 bg-black blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-[800px] bg-transparent opacity-10 backdrop-blur-md"></div>

        <motion.div
          {...glowAnimationProps}
          className={`absolute inset-auto z-50 h-36 -translate-y-1/2 rounded-full ${colors.glow} ${intensityValues.blur}`}
        ></motion.div>

        <motion.div
          {...beamAnimationProps}
          className={`absolute inset-auto z-30 h-36 -translate-y-[6rem] rounded-full ${colors.beam} blur-2xl`}
        ></motion.div>

        <motion.div
          {...lineAnimationProps}
          className={`absolute inset-auto z-50 h-0.5 -translate-y-[7rem] ${colors.beam}`}
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-[800px] -translate-y-[12.5rem] bg-black"></div>
      </div>
    </div>
  );
};
