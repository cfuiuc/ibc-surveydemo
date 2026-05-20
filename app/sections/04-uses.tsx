"use client";

import { motion } from "framer-motion";
import stats from "@/data/stats.json";
import { SectionHeader } from "../components/primitives/SectionHeader";
import { BarChart } from "../components/charts/BarChart";

const uses = (Object.entries(stats.uses) as [string, number][]).filter(
  ([label]) => label !== "Question Type" && label !== "I don't use AI",
);

export default function Uses() {
  return (
    <section style={{ paddingTop: "8rem", paddingBottom: "6rem" }} className="px-6">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader sub="What they use it for">
            The use cases
          </SectionHeader>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-body text-il-storm-10 text-lg leading-relaxed max-w-[640px] mt-8 mb-14"
        >
          Mostly research-and-comprehension scaffolding, not {"“"}AI did my
          work for me.{"”"}
        </motion.p>

        <BarChart data={uses} highlightFirst />
      </div>
    </section>
  );
}
