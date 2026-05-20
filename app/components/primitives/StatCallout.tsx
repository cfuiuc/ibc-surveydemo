"use client";

import { motion } from "framer-motion";

interface StatCalloutProps {
  number: string;
  label: string;
  delay?: number;
}

export function StatCallout({ number, label, delay = 0 }: StatCalloutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-start"
    >
      <span className="font-display font-extrabold text-il-orange leading-none tracking-tighter text-[clamp(3rem,8vw,5rem)]">
        {number}
      </span>
      <span className="font-body text-il-storm-30 text-sm uppercase tracking-widest mt-2">
        {label}
      </span>
    </motion.div>
  );
}
