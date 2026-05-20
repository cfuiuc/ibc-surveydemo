"use client";

import { motion } from "framer-motion";
import type { AttributedQuote } from "@/lib/types";

interface QuoteCardProps {
  quote: AttributedQuote;
  size: "sm" | "md" | "lg";
  onClick: () => void;
  index: number;
}

const sizeClasses = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
};

export function QuoteCard({ quote, size, onClick, index }: QuoteCardProps) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 12) * 0.06 }}
      whileHover={{ y: -2, boxShadow: "0 1px 0 0 var(--il-storm-70), 0 12px 32px -8px rgba(19,41,75,0.12)" }}
      onClick={onClick}
      className="relative text-left bg-white border border-il-storm-95 p-6 pl-8 cursor-pointer transition-colors"
      style={{ borderRadius: 2 }}
    >
      <span
        className="absolute -left-1 -top-2 font-quote text-il-orange text-5xl leading-none select-none pointer-events-none"
        aria-hidden
      >
        {"“"}
      </span>
      <blockquote
        className={`font-quote italic text-il-blue leading-relaxed ${sizeClasses[size]} line-clamp-4`}
      >
        {quote.text}
      </blockquote>
      {quote.position && (
        <p className="font-body text-xs text-il-storm-50 mt-3 uppercase tracking-wider">
          {quote.position}{quote.college_level ? ` · ${quote.college_level}` : ""}
        </p>
      )}
    </motion.button>
  );
}
