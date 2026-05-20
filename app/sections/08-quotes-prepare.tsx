import { loadRespondentsSync, loadQuotesSync } from "@/lib/data-server";
import { SectionHeader } from "../components/primitives/SectionHeader";
import { TaggedQuoteWall } from "../components/quotes/TaggedQuoteWall";

export default function QuotesPrepare() {
  const respondents = loadRespondentsSync();
  const quotes = loadQuotesSync("quotes_prepare.txt", respondents);

  return (
    <section style={{ paddingTop: "6rem", paddingBottom: "4rem" }} className="px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12">
          <SectionHeader sub="What they're asking for">
            How to prepare them
          </SectionHeader>
          <p className="font-body text-il-storm-10 text-lg leading-relaxed max-w-[640px] mt-8">
            {quotes.length} consultants told us what IBC could do better. We tagged
            each response by theme — filter to see the patterns.
          </p>
        </div>
        <TaggedQuoteWall quotes={quotes} />
      </div>
    </section>
  );
}
