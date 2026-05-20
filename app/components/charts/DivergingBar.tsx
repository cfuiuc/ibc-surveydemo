"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { scaleLinear } from "d3-scale";
import type { LikertDistribution } from "@/lib/types";

interface DivergingBarProps {
  data: [string, LikertDistribution][];
  total: number;
}

const SHORT_LABELS: Record<string, string> = {
  "AI helped me understand the client and industry better":
    "Understand client & industry",
  "AI helped me apply frameworks and analysis":
    "Apply frameworks & analysis",
  "AI made me more confident using it professionally":
    "Confident using A.I. professionally",
  "Overall, AI improved my project and consulting experience":
    "Overall improved experience",
};

const LEVELS = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
] as const;

const COLORS: Record<string, string> = {
  "Strongly Disagree": "var(--il-berry)",
  Disagree: "var(--il-storm-50)",
  Neutral: "var(--il-storm-70)",
  Agree: "#4A6FA5",
  "Strongly Agree": "var(--il-orange)",
};

const LABEL_WIDTH = 260;
const BAR_WIDTH = 520;
const PCT_WIDTH = 130;
const ROW_HEIGHT = 48;
const ROW_GAP = 16;

export function DivergingBar({ data, total }: DivergingBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const maxExtent = data.reduce((max, [, dist]) => {
    const halfN = dist["Neutral"] / total / 2;
    const left = (dist["Strongly Disagree"] + dist["Disagree"]) / total + halfN;
    const right = (dist["Agree"] + dist["Strongly Agree"]) / total + halfN;
    return Math.max(max, left, right);
  }, 0);

  const extent = Math.ceil(maxExtent * 10) / 10;
  const x = scaleLinear().domain([-extent, extent]).range([0, BAR_WIDTH]);
  const center = x(0);
  const chartHeight = data.length * (ROW_HEIGHT + ROW_GAP) - ROW_GAP;
  const svgWidth = LABEL_WIDTH + BAR_WIDTH + PCT_WIDTH;

  return (
    <div ref={ref} className="w-full">
      <svg
        viewBox={`0 0 ${svgWidth} ${chartHeight + 8}`}
        className="block w-full h-auto"
        role="img"
        preserveAspectRatio="xMidYMid meet"
      >
        {data.map(([question, dist], rowIdx) => {
          const y = rowIdx * (ROW_HEIGHT + ROW_GAP);
          const label = SHORT_LABELS[question] || question;
          const pctPositive = Math.round(
            ((dist["Agree"] + dist["Strongly Agree"]) / total) * 100,
          );

          const sd = dist["Strongly Disagree"] / total;
          const d = dist["Disagree"] / total;
          const n = dist["Neutral"] / total;
          const a = dist["Agree"] / total;
          const sa = dist["Strongly Agree"] / total;
          const halfN = n / 2;

          const segments: { key: string; x0: number; x1: number; color: string }[] = [
            {
              key: "Strongly Disagree",
              x0: -(sd + d + halfN),
              x1: -(d + halfN),
              color: COLORS["Strongly Disagree"],
            },
            {
              key: "Disagree",
              x0: -(d + halfN),
              x1: -halfN,
              color: COLORS["Disagree"],
            },
            {
              key: "Neutral",
              x0: -halfN,
              x1: halfN,
              color: COLORS["Neutral"],
            },
            {
              key: "Agree",
              x0: halfN,
              x1: halfN + a,
              color: COLORS["Agree"],
            },
            {
              key: "Strongly Agree",
              x0: halfN + a,
              x1: halfN + a + sa,
              color: COLORS["Strongly Agree"],
            },
          ];

          return (
            <g key={question} transform={`translate(0, ${y})`}>
              <text
                x={LABEL_WIDTH - 16}
                y={ROW_HEIGHT / 2}
                textAnchor="end"
                dominantBaseline="central"
                className="font-body"
                fontSize={14}
                fill="var(--il-storm-10)"
              >
                {label}
              </text>

              {segments.map((seg) => {
                const px0 = LABEL_WIDTH + x(seg.x0);
                const px1 = LABEL_WIDTH + x(seg.x1);
                const w = px1 - px0;
                if (w < 0.5) return null;
                return (
                  <motion.rect
                    key={seg.key}
                    y={4}
                    height={ROW_HEIGHT - 8}
                    rx={1}
                    fill={seg.color}
                    initial={{ x: LABEL_WIDTH + center, width: 0 }}
                    animate={
                      inView
                        ? { x: px0, width: w }
                        : { x: LABEL_WIDTH + center, width: 0 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: rowIdx * 0.08,
                      ease: "easeOut",
                    }}
                  />
                );
              })}

              <motion.text
                x={LABEL_WIDTH + BAR_WIDTH + 16}
                y={ROW_HEIGHT / 2}
                dominantBaseline="central"
                className="font-display"
                fontWeight={800}
                fontSize={15}
                fill="var(--il-blue)"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: rowIdx * 0.08 + 0.5 }}
              >
                {pctPositive}% positive
              </motion.text>
            </g>
          );
        })}

        <line
          x1={LABEL_WIDTH + center}
          x2={LABEL_WIDTH + center}
          y1={-4}
          y2={chartHeight + 4}
          stroke="var(--il-storm-70)"
          strokeWidth={1}
          strokeDasharray="4 3"
        />
      </svg>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 pl-[28%]">
        {LEVELS.map((level) => (
          <div key={level} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-[1px]"
              style={{ backgroundColor: COLORS[level] }}
            />
            <span className="font-body text-xs text-il-storm-30">{level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
