"use client";

import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import type { AttributedQuote } from "@/lib/types";
import { tagQuote, ALL_TAGS } from "@/lib/quote-tags";
import { Badge } from "@/components/ui/badge";
import { QuoteCard } from "./QuoteCard";
import { QuoteDialog } from "./QuoteDialog";

interface TaggedQuoteWallProps {
  quotes: AttributedQuote[];
}

interface TaggedQuote extends AttributedQuote {
  tags: string[];
}

const BATCH = 12;

export function TaggedQuoteWall({ quotes }: TaggedQuoteWallProps) {
  const tagged = useMemo<TaggedQuote[]>(
    () => quotes.map((q) => ({ ...q, tags: tagQuote(q.text) })),
    [quotes],
  );

  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [shown, setShown] = useState(BATCH);
  const [selected, setSelected] = useState<AttributedQuote | null>(null);

  const filtered = activeTag
    ? tagged.filter((q) => q.tags.includes(activeTag))
    : tagged;
  const visible = filtered.slice(0, shown);
  const hasMore = shown < filtered.length;
  const remaining = Math.min(BATCH, filtered.length - shown);

  function handleTagClick(tag: string) {
    setActiveTag((prev) => (prev === tag ? null : tag));
    setShown(BATCH);
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {ALL_TAGS.map((tag) => {
          const count = tagged.filter((q) => q.tags.includes(tag)).length;
          if (count === 0) return null;
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-body text-sm rounded-[4px] border transition-colors ${
                isActive
                  ? "bg-il-blue text-white border-il-blue"
                  : "bg-white text-il-blue border-il-storm-70 hover:border-il-blue"
              }`}
            >
              {tag}
              <span className={`text-xs ${isActive ? "text-white/70" : "text-il-storm-50"}`}>
                {count}
              </span>
            </button>
          );
        })}
        {activeTag && (
          <button
            onClick={() => { setActiveTag(null); setShown(BATCH); }}
            className="inline-flex items-center px-3 py-1.5 font-body text-sm text-il-storm-50 hover:text-il-storm-10 transition-colors"
          >
            Clear filter
          </button>
        )}
      </div>

      <p className="font-display font-medium text-il-storm-30 text-sm mb-6">
        Showing {Math.min(shown, filtered.length)} of {filtered.length}
        {activeTag ? ` tagged "${activeTag}"` : ""}
      </p>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:balance]">
        <AnimatePresence>
          {visible.map((q, i) => (
            <div key={`${activeTag}-${i}`} className="break-inside-avoid mb-4 relative">
              <QuoteCard
                quote={q}
                size="md"
                onClick={() => setSelected(q)}
                index={i}
              />
              {q.tags.length > 0 && (
                <div className="absolute top-2 right-2 flex flex-wrap gap-1 pointer-events-none">
                  {q.tags.map((t) => (
                    <Badge
                      key={t}
                      className="bg-il-blue text-white text-[10px] font-body px-1.5 py-0.5 rounded-[4px]"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShown((s) => s + BATCH)}
            className="font-display font-medium text-sm uppercase tracking-widest text-il-blue border border-il-blue px-6 py-3 hover:bg-il-blue hover:text-white transition-colors"
            style={{ borderRadius: 2 }}
          >
            Show {remaining} more
          </button>
        </div>
      )}

      <QuoteDialog
        quote={selected}
        open={!!selected}
        onOpenChange={(open) => { if (!open) setSelected(null); }}
      />
    </>
  );
}
