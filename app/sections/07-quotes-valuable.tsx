import { loadRespondentsSync, loadQuotesSync } from "@/lib/data-server";
import { SectionHeader } from "../components/primitives/SectionHeader";
import { QuoteWall } from "../components/quotes/QuoteWall";

export default function QuotesValuable() {
  const respondents = loadRespondentsSync();
  const quotes = loadQuotesSync("quotes_valuable.txt", respondents);

  return (
    <section style={{ paddingTop: "5rem", paddingBottom: "2rem" }} className="px-6">
      <div className="mx-auto max-w-[1200px]">
        <QuoteWall quotes={quotes}>
          <div className="mb-12">
            <SectionHeader sub="In their own words">
              What worked
            </SectionHeader>
            <p className="font-body text-il-storm-10 text-lg leading-relaxed max-w-[640px] mt-8">
              {quotes.length} consultants described the most valuable way{" "}
              <span className="font-body font-semibold tracking-wide" style={{ fontVariant: "small-caps" }}>
                a.i.
              </span>{" "}
              was used in IBC. These are their words, unedited.
            </p>
          </div>
        </QuoteWall>
      </div>
    </section>
  );
}
