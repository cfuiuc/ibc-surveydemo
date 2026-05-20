"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface BarChartProps {
  data: [string, number][];
  highlightFirst?: boolean;
  highlightLabels?: string[];
  compact?: boolean;
}

export function BarChart({
  data,
  highlightFirst = false,
  highlightLabels,
  compact = false,
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
          <div key={label} className="flex items-center gap-2">
            <span
              className={`font-body text-[13px] text-right shrink-0 ${compact ? "w-auto max-w-[140px]" : "w-[180px] sm:w-[200px] lg:w-[240px]"}`}
              style={{ color: labelColor }}
            >
              {label}
            </span>
            <div className="flex-1 flex items-center gap-1.5 min-w-0">
              <motion.div
                className={`${compact ? "h-5" : "h-7"} rounded-[1px]`}
                style={{ backgroundColor: barColor, minWidth: value > 0 ? 4 : 0 }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${pct}%` } : { width: 0 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
              />
              <motion.span
                className={`font-display font-extrabold ${compact ? "text-[13px]" : "text-[16px]"} shrink-0`}
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
