"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { AttributedQuote } from "@/lib/types";

interface QuoteDialogProps {
  quote: AttributedQuote | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuoteDialog({ quote, open, onOpenChange }: QuoteDialogProps) {
  if (!quote) return null;

  const hasAttribution = quote.position || quote.college || quote.major;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-[4px]">
        <DialogHeader>
          <DialogTitle className="sr-only">Quote</DialogTitle>
          <DialogDescription className="sr-only">Full quote and respondent details</DialogDescription>
        </DialogHeader>
        <div className="pt-2">
          <span
            className="font-quote text-il-orange text-6xl leading-none block -mb-4 -ml-1"
            aria-hidden
          >
            {"“"}
          </span>
          <blockquote className="font-quote italic text-il-blue text-xl leading-relaxed">
            {quote.text}
          </blockquote>
        </div>
        {hasAttribution && (
          <div className="mt-6 pt-4 border-t border-il-storm-95">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-2 font-body text-sm">
              {quote.position && (
                <>
                  <dt className="text-il-storm-50">Position</dt>
                  <dd className="text-il-storm-10">{quote.position}</dd>
                </>
              )}
              {quote.college_level && (
                <>
                  <dt className="text-il-storm-50">Level</dt>
                  <dd className="text-il-storm-10">{quote.college_level}</dd>
                </>
              )}
              {quote.college && (
                <>
                  <dt className="text-il-storm-50">College</dt>
                  <dd className="text-il-storm-10">{quote.college}</dd>
                </>
              )}
              {quote.major && (
                <>
                  <dt className="text-il-storm-50">Major</dt>
                  <dd className="text-il-storm-10">{quote.major}</dd>
                </>
              )}
            </dl>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
