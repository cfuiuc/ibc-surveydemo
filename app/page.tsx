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
  );
}
