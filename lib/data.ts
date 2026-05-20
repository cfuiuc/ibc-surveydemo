import Papa from "papaparse";
import type { Respondent, AttributedQuote } from "./types";

export async function loadRespondents(): Promise<Respondent[]> {
  const res = await fetch(
    new URL("/data/responses_clean.csv", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  );
  const text = await res.text();
  const parsed = Papa.parse<Respondent>(text, { header: true, skipEmptyLines: true });
  return parsed.data;
}

function normalizeForMatch(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function matchQuoteToRespondent(
  quoteText: string,
  respondents: Respondent[],
  field: "valuable_text" | "prepare_text",
): Respondent | undefined {
  const normalized = normalizeForMatch(quoteText);
  return respondents.find((r) => {
    const cell = normalizeForMatch(r[field]);
    if (!cell) return false;
    return cell === normalized || cell.startsWith(normalized) || normalized.startsWith(cell);
  });
}

export async function loadQuotes(
  filename: "quotes_valuable.txt" | "quotes_prepare.txt",
  respondents: Respondent[],
): Promise<AttributedQuote[]> {
  const res = await fetch(
    new URL(`/data/${filename}`, process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  );
  const text = await res.text();
  const field = filename === "quotes_valuable.txt" ? "valuable_text" : "prepare_text";
  return text
    .split("\n---\n")
    .map((q) => q.trim())
    .filter(Boolean)
    .map((quoteText) => {
      const match = matchQuoteToRespondent(quoteText, respondents, field as "valuable_text" | "prepare_text");
      return {
        text: quoteText,
        position: match?.position,
        college_level: match?.college_level,
        college: match?.college,
        major: match?.major,
      };
    });
}
