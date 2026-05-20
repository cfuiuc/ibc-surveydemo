"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Respondent } from "@/lib/types";
import { getToolColor } from "@/lib/tool-colors";

interface ResponseDialogProps {
  respondent: Respondent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LIKERT_LABELS: [keyof Respondent, string][] = [
  ["q_understand", "Understand client & industry"],
  ["q_frameworks", "Apply frameworks & analysis"],
  ["q_confident", "Confident using A.I. professionally"],
  ["q_overall", "Overall improved experience"],
];

export function ResponseDialog({ respondent, open, onOpenChange }: ResponseDialogProps) {
  if (!respondent) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-[4px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-il-blue text-lg">
            {respondent.position} — {respondent.college_level}
          </DialogTitle>
          <DialogDescription className="font-body text-il-storm-30 text-sm">
            {respondent.college} · {respondent.major}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <p className="font-display font-medium text-il-storm-30 uppercase tracking-widest text-xs mb-2">
              Tools
            </p>
            <div className="flex flex-wrap gap-1">
              {respondent.tools.split(";").filter(Boolean).map((t) => {
                const tc = getToolColor(t);
                return (
                  <Badge
                    key={t}
                    className="text-xs font-body px-2 py-0.5 rounded-[4px]"
                    style={{ backgroundColor: tc.bg, color: tc.text }}
                  >
                    {t.trim()}
                  </Badge>
                );
              })}
            </div>
          </div>

          <div>
            <p className="font-display font-medium text-il-storm-30 uppercase tracking-widest text-xs mb-2">
              Uses
            </p>
            <div className="flex flex-wrap gap-1">
              {respondent.uses.split(";").filter(Boolean).map((u) => (
                <Badge
                  key={u}
                  className="bg-il-storm-95 text-il-storm-10 text-xs font-body px-2 py-0.5 rounded-[4px]"
                >
                  {u.trim()}
                </Badge>
              ))}
            </div>
          </div>

          {LIKERT_LABELS.some(([key]) => respondent[key]) && (
            <div>
              <p className="font-display font-medium text-il-storm-30 uppercase tracking-widest text-xs mb-2">
                Likert responses
              </p>
              <dl className="space-y-1">
                {LIKERT_LABELS.map(([key, label]) => {
                  const val = respondent[key];
                  if (!val) return null;
                  return (
                    <div key={key} className="flex justify-between font-body text-sm">
                      <dt className="text-il-storm-10">{label}</dt>
                      <dd className="text-il-storm-30">{val}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          )}

          {respondent.valuable_text && (
            <div>
              <p className="font-display font-medium text-il-storm-30 uppercase tracking-widest text-xs mb-2">
                Most valuable use of A.I.
              </p>
              <blockquote className="font-quote italic text-il-blue text-base leading-relaxed">
                {respondent.valuable_text}
              </blockquote>
            </div>
          )}

          {respondent.prepare_text && (
            <div>
              <p className="font-display font-medium text-il-storm-30 uppercase tracking-widest text-xs mb-2">
                How IBC can prepare them
              </p>
              <blockquote className="font-quote italic text-il-blue text-base leading-relaxed">
                {respondent.prepare_text}
              </blockquote>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
