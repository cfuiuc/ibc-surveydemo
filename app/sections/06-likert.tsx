"use client";

import { motion } from "framer-motion";
import stats from "@/data/stats.json";
import { SectionHeader } from "../components/primitives/SectionHeader";
import { DivergingBar } from "../components/charts/DivergingBar";
import type { LikertDistribution } from "@/lib/types";

const likertData = Object.entries(stats.likert) as [string, LikertDistribution][];
const likertTotal = Object.values(likertData[0][1]).reduce((a, b) => a + b, 0);

export default function Likert() {
  return (
    <section style={{ paddingTop: "5rem", paddingBottom: "3rem" }} className="px-6">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader sub="The verdict">
            How they feel about it
          </SectionHeader>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-body text-il-storm-10 text-lg leading-relaxed max-w-[640px] mt-5 mb-10"
        >
          Positive across the board. But {"“"}applying frameworks{"”"} has the
          most disagreement{" — "}
          <span className="font-body font-semibold tracking-wide" style={{ fontVariant: "small-caps" }}>
            a.i.
          </span>{" "}
          is good at the start of consulting work, weaker at the harder middle.
        </motion.p>

        <DivergingBar data={likertData} total={likertTotal} />

        <p className="font-body text-il-storm-50 text-sm mt-6 pl-[28%]">
          {likertTotal} of {stats.n} respondents answered the Likert questions.
        </p>
      </div>
    </section>
  );
}
