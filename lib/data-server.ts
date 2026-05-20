import fs from "fs";
import path from "path";
import Papa from "papaparse";
import type { Respondent, AttributedQuote } from "./types";

function getPublicDataPath(filename: string): string {
  return path.join(process.cwd(), "public", "data", filename);
}

export function loadRespondentsSync(): Respondent[] {
  const text = fs.readFileSync(getPublicDataPath("responses_clean.csv"), "utf-8");
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

export function loadQuotesSync(
  filename: "quotes_valuable.txt" | "quotes_prepare.txt",
  respondents: Respondent[],
): AttributedQuote[] {
  const text = fs.readFileSync(getPublicDataPath(filename), "utf-8");
  const field = filename === "quotes_valuable.txt" ? "valuable_text" : "prepare_text";
  return text
    .split("\n---\n")
    .map((q) => q.trim())
    .filter(Boolean)
    .map((quoteText) => {
      const match = matchQuoteToRespondent(quoteText, respondents, field);
      return {
        text: quoteText,
        position: match?.position,
        college_level: match?.college_level,
        college: match?.college,
        major: match?.major,
      };
    });
}
