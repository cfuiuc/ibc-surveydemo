"use client";

import { motion } from "framer-motion";
import stats from "@/data/stats.json";
import { SectionHeader } from "../components/primitives/SectionHeader";
import { BarChart } from "../components/charts/BarChart";

const position = Object.entries(stats.position) as [string, number][];
const level = Object.entries(stats.level) as [string, number][];
const college = Object.entries(stats.college) as [string, number][];

export default function Respondents() {
  return (
    <section style={{ paddingTop: "8rem", paddingBottom: "6rem" }} className="px-6">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader sub="Who answered">
            The respondents
          </SectionHeader>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-body text-il-storm-10 text-lg leading-relaxed max-w-[640px] mt-8 mb-14"
        >
          Mostly freshmen New Consultants, mostly Gies, with engineers and LAS
          well represented. The next generation of consultants is telling us what
          they need.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div>
            <p className="font-display font-medium text-il-storm-30 uppercase tracking-widest text-xs mb-4">
              Position
            </p>
            <BarChart data={position} />
          </div>
          <div>
            <p className="font-display font-medium text-il-storm-30 uppercase tracking-widest text-xs mb-4">
              College Level
            </p>
            <BarChart data={level} />
          </div>
          <div>
            <p className="font-display font-medium text-il-storm-30 uppercase tracking-widest text-xs mb-4">
              College
            </p>
            <BarChart data={college} />
          </div>
        </div>
      </div>
    </section>
  );
}
