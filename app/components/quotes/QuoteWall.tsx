"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { AttributedQuote } from "@/lib/types";
import { QuoteCard } from "./QuoteCard";
import { QuoteDialog } from "./QuoteDialog";

interface QuoteWallProps {
  quotes: AttributedQuote[];
  batchSize?: number;
  children?: React.ReactNode;
}

function hashSize(text: string): "sm" | "md" | "lg" {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = ((h << 5) - h + text.charCodeAt(i)) | 0;
  }
  const bucket = Math.abs(h) % 3;
  return (["sm", "md", "lg"] as const)[bucket];
}

export function QuoteWall({ quotes, batchSize = 12, children }: QuoteWallProps) {
  const [shown, setShown] = useState(batchSize);
  const [selected, setSelected] = useState<AttributedQuote | null>(null);

  const visible = quotes.slice(0, shown);
  const hasMore = shown < quotes.length;
  const remaining = Math.min(batchSize, quotes.length - shown);

  return (
    <>
      {children}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:balance]">
        <AnimatePresence>
          {visible.map((q, i) => (
            <div key={i} className="break-inside-avoid mb-4">
              <QuoteCard
                quote={q}
                size={hashSize(q.text)}
                onClick={() => setSelected(q)}
                index={i}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShown((s) => s + batchSize)}
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
