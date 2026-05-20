import { loadRespondentsSync } from "@/lib/data-server";
import { SectionHeader } from "../components/primitives/SectionHeader";
import { DataTable } from "../components/explore/DataTable";

export default function Explore() {
  const respondents = loadRespondentsSync();

  return (
    <section style={{ paddingTop: "5rem", paddingBottom: "3rem" }} className="px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12">
          <SectionHeader sub="Explore the data">
            All {respondents.length} responses
          </SectionHeader>
          <p className="font-body text-il-storm-10 text-lg leading-relaxed max-w-[640px] mt-8">
            Filter by position, level, or college. Click any row to see the full
            response including free-text answers.
          </p>
        </div>
        <DataTable respondents={respondents} />
      </div>
    </section>
  );
}
