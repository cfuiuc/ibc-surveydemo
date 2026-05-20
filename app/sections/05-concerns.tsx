"use client";

import { motion } from "framer-motion";
import stats from "@/data/stats.json";
import { SectionHeader } from "../components/primitives/SectionHeader";
import { BarChart } from "../components/charts/BarChart";

const concerns = Object.entries(stats.concerns) as [string, number][];

const actionableLabels = [
  "Lack of standardized AI training",
  "Unclear when/how to use AI",
];

export default function Concerns() {
  return (
    <section style={{ paddingTop: "8rem", paddingBottom: "6rem" }} className="px-6">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader sub="The tension">
            What concerns them
          </SectionHeader>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-body text-il-storm-10 text-lg leading-relaxed max-w-[640px] mt-8 mb-14"
        >
          Even the enthusiasts have concerns. Even users have concerns. This is
          what IBC can act on.
        </motion.p>

        <BarChart
          data={concerns}
          highlightLabels={actionableLabels}
        />
      </div>
    </section>
  );
}
