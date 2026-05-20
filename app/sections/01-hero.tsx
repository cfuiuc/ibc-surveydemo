"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import stats from "@/data/stats.json";
import { StatCallout } from "../components/primitives/StatCallout";

const dontUse = stats.tools["I don't use AI"];
const likertOverall = stats.likert["Overall, AI improved my project and consulting experience"];
const agreedOverall = likertOverall["Agree"] + likertOverall["Strongly Agree"];
const likertTotal = Object.values(likertOverall).reduce((a, b) => a + b, 0);

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const numberY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: "12rem", paddingBottom: "8rem" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(29,88,167,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
        <motion.div
          style={{ y: numberY }}
          className="mb-8"
        >
          <span className="font-display font-extrabold text-il-blue leading-none tracking-tighter text-[clamp(6rem,16vw,12rem)] block">
            {stats.n}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-il-blue tracking-tight text-[clamp(2rem,4vw,3.5rem)] leading-[1.15] max-w-[720px] mb-4"
        >
          IBC consultants told us how they use{" "}
          <span className="font-body font-semibold tracking-wide" style={{ fontVariant: "small-caps" }}>
            a.i.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-body text-il-storm-30 text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed max-w-[640px] mb-16"
        >
          They already are. Mostly they like it. They have concerns.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-12 sm:gap-16 mb-20">
          <StatCallout
            number={String(stats.n)}
            label="consultants surveyed"
            delay={0.2}
          />
          <StatCallout
            number={`${dontUse} of ${stats.n}`}
            label={"“don’t use AI”"}
            delay={0.4}
          />
          <StatCallout
            number={`${agreedOverall} of ${likertTotal}`}
            label="agreed AI improved their experience"
            delay={0.6}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body text-il-storm-10 text-lg leading-relaxed max-w-[640px]"
        >
          The question isn’t whether{" "}
          <span className="font-body font-semibold tracking-wide" style={{ fontVariant: "small-caps" }}>
            a.i.
          </span>{" "}
          shows up at IBC. It already has. The question is what we do about it.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--il-storm-50)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
