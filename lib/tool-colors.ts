const TOOL_COLORS: Record<string, { bg: string; text: string }> = {
  ChatGPT: { bg: "#13294B", text: "#ffffff" },
  Claude: { bg: "#C84113", text: "#ffffff" },
  Gemini: { bg: "#1D58A7", text: "#ffffff" },
  Copilot: { bg: "#007E8E", text: "#ffffff" },
  Perplexity: { bg: "#006230", text: "#ffffff" },
  "I don't use AI": { bg: "#C8C6C7", text: "#252525" },
};

const DEFAULT_COLOR = { bg: "#9C9A9D", text: "#ffffff" };

export function getToolColor(tool: string): { bg: string; text: string } {
  const trimmed = tool.trim();
  return TOOL_COLORS[trimmed] || DEFAULT_COLOR;
}
