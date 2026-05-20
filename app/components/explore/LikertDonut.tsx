"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface LikertDonutProps {
  distribution: Record<string, number>;
}

const LIKERT_COLORS: Record<string, string> = {
  "Strongly Disagree": "#5C0E41",
  Disagree: "#9C9A9D",
  Neutral: "#C8C6C7",
  Agree: "#4A6FA5",
  "Strongly Agree": "#C84113",
};

const ORDER = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];

export function LikertDonut({ distribution }: LikertDonutProps) {
  const data = ORDER.map((name) => ({
    name,
    value: distribution[name] || 0,
  })).filter((d) => d.value > 0);

  if (data.length === 0) return null;

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={65}
            dataKey="value"
            strokeWidth={1}
            stroke="#fff"
          >
            {data.map((d) => (
              <Cell key={d.name} fill={LIKERT_COLORS[d.name]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2">
        {ORDER.map((level) => {
          if (!distribution[level]) return null;
          return (
            <div key={level} className="flex items-center gap-1">
              <span
                className="inline-block w-2 h-2 rounded-[1px]"
                style={{ backgroundColor: LIKERT_COLORS[level] }}
              />
              <span className="font-body text-[10px] text-il-storm-30">{level}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
