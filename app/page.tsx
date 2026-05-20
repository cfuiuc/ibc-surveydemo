import Hero from "./sections/01-hero";
import Respondents from "./sections/02-respondents";
import Tools from "./sections/03-tools";
import Uses from "./sections/04-uses";
import Concerns from "./sections/05-concerns";
import Likert from "./sections/06-likert";
import QuotesValuable from "./sections/07-quotes-valuable";
import QuotesPrepare from "./sections/08-quotes-prepare";
import Explore from "./sections/09-explore";
import Editorial from "./sections/10-editorial";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Respondents />
        <Tools />
        <Uses />
        <Concerns />
        <Likert />
        <QuotesValuable />
        <QuotesPrepare />
        <Explore />
        <Editorial />
      </main>
      <footer className="border-t border-il-storm-95 py-8 px-6">
        <div className="mx-auto max-w-[1200px] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display font-bold text-il-blue text-sm tracking-tight">
            Illinois Business Consulting
          </p>
          <p className="font-body text-il-storm-50 text-xs">
            Spring 2026 A.I. Survey &middot; Gies College of Business &middot; University of Illinois
          </p>
        </div>
      </footer>
    </>
  );
}
