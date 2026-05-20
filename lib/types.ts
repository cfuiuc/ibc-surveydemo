export interface Stats {
  n: number;
  position: Record<string, number>;
  level: Record<string, number>;
  college: Record<string, number>;
  tools: Record<string, number>;
  uses: Record<string, number>;
  concerns: Record<string, number>;
  likert: Record<string, LikertDistribution>;
}

export interface LikertDistribution {
  "Strongly Disagree": number;
  "Disagree": number;
  "Neutral": number;
  "Agree": number;
  "Strongly Agree": number;
}

export type LikertLevel = keyof LikertDistribution;

export interface Respondent {
  position: string;
  college_level: string;
  college: string;
  major: string;
  tools: string;
  uses: string;
  concerns: string;
  q_understand: string;
  q_frameworks: string;
  q_confident: string;
  q_overall: string;
  valuable_text: string;
  prepare_text: string;
}

export interface AttributedQuote {
  text: string;
  position?: string;
  college_level?: string;
  college?: string;
  major?: string;
}
