"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface BarChartProps {
  data: [string, number][];
  highlightFirst?: boolean;
  highlightLabels?: string[];
}

export function BarChart({
  data,
  highlightFirst = false,
  highlightLabels,
}: BarChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const maxVal = Math.max(...data.map(([, v]) => v));

  function isHighlighted(label: string, idx: number): boolean {
    if (highlightLabels) return highlightLabels.includes(label);
    if (highlightFirst) return idx === 0;
    return false;
  }

  return (
    <div ref={ref} className="w-full space-y-2">
      {data.map(([label, value], i) => {
        const highlighted = isHighlighted(label, i);
        const barColor = highlighted ? "var(--il-orange)" : "var(--il-blue)";
        const labelColor = highlighted ? "var(--il-altgeld)" : "var(--il-storm-10)";
        const pct = (value / maxVal) * 100;

        return (
          <div key={label} className="flex items-center gap-3">
            <span
              className="font-body text-[14px] text-right shrink-0 w-[180px] sm:w-[220px] lg:w-[260px]"
              style={{ color: labelColor }}
            >
              {label}
            </span>
            <div className="flex-1 flex items-center gap-2 min-w-0">
              <motion.div
                className="h-7 rounded-[1px]"
                style={{ backgroundColor: barColor }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${pct}%` } : { width: 0 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
              />
              <motion.span
                className="font-display font-extrabold text-[16px] shrink-0"
                style={{ color: barColor }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 + 0.4 }}
              >
                {value}
              </motion.span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
