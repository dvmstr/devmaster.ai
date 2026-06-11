"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Testimonial } from "@/types";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name, role, company }, i) => (
                <div
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-7 max-w-xs w-full hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  key={i}
                >
                  <p className="text-sm text-gray-300 leading-relaxed">"{text}"</p>
                  <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-9 w-[3px] rounded-full bg-gradient-to-b from-cyan-400 to-cyan-500/20 shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-white text-sm tracking-tight leading-tight truncate">{name}</span>
                      <span className="text-xs leading-tight mt-1 truncate">
                        {role && <span className="text-gray-400">{role}</span>}
                        {role && company && <span className="text-gray-600"> · </span>}
                        {company && <span className="text-cyan-400/90">{company}</span>}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
