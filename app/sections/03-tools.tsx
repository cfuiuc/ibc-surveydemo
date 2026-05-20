"use client";

import { motion } from "framer-motion";
import stats from "@/data/stats.json";
import { SectionHeader } from "../components/primitives/SectionHeader";
import { BarChart } from "../components/charts/BarChart";

const tools = Object.entries(stats.tools) as [string, number][];

export default function Tools() {
  return (
    <section style={{ paddingTop: "5rem", paddingBottom: "3rem" }} className="px-6">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader sub="What they reach for">
            The tools
          </SectionHeader>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-body text-il-storm-10 text-lg leading-relaxed max-w-[640px] mt-5 mb-10"
        >
          This is not a single-vendor world. Students are tool-pluralists.
        </motion.p>

        <BarChart data={tools} highlightFirst />
      </div>
    </section>
  );
}
