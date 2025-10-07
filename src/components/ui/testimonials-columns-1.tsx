"use client";
import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

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
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-xs w-full hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  key={i}
                >
                  <p className="text-sm text-gray-300 mb-6 leading-relaxed">"{text}"</p>
                  <div className="flex items-center gap-3">
                    <img
                      width={48}
                      height={48}
                      src={image}
                      alt={name}
                      className="h-12 w-12 rounded-full border-2 border-cyan-500/20"
                    />
                    <div className="flex flex-col">
                      <div className="font-normal text-white tracking-tight leading-5">{name}</div>
                      <div className="text-sm text-gray-400 tracking-tight leading-5">{role}</div>
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
