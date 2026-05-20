const TAG_RULES: [string, RegExp][] = [
  ["training", /\b(train(ing)?|workshop|bootcamp|class|course|seminar)\b/i],
  ["guidelines", /\b(guideline|guidance|rule|policy|policies|standard|stance|memo|expectation)\b/i],
  ["examples", /\b(example|template|prompt|demo|show\s+us|show\s+more)\b/i],
  ["do’s/don’ts", /\b(do'?s?\s*(and|&)?\s*don'?ts?|do not|should\s+avoid|acceptable|inappropriate|when\s+to\s+use|when\s+not)\b/i],
  ["ethics", /\b(ethic|confidential|nda|privacy|security|sensitive|integrity)\b/i],
  ["time", /\b(time|faster|quicker|efficient|speed|save\s+time)\b/i],
];

export function tagQuote(text: string): string[] {
  const tags: string[] = [];
  for (const [tag, regex] of TAG_RULES) {
    if (regex.test(text)) {
      tags.push(tag);
    }
  }
  return tags;
}

export const ALL_TAGS = TAG_RULES.map(([tag]) => tag);
