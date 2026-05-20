"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Respondent } from "@/lib/types";
import { getToolColor } from "@/lib/tool-colors";
import { FilterChips } from "./FilterChips";
import { LikertDonut } from "./LikertDonut";
import { ResponseDialog } from "./ResponseDialog";

interface DataTableProps {
  respondents: Respondent[];
}

const LIKERT_DOT: Record<string, { color: string; label: string }> = {
  "Strongly Disagree": { color: "#5C0E41", label: "Strongly Disagree" },
  Disagree: { color: "#9C9A9D", label: "Disagree" },
  Neutral: { color: "#C8C6C7", label: "Neutral" },
  Agree: { color: "#4A6FA5", label: "Agree" },
  "Strongly Agree": { color: "#C84113", label: "Strongly Agree" },
};

export function DataTable({ respondents }: DataTableProps) {
  const [posFilter, setPosFilter] = useState<string[]>([]);
  const [levelFilter, setLevelFilter] = useState<string[]>([]);
  const [collegeFilter, setCollegeFilter] = useState<string[]>([]);
  const [selected, setSelected] = useState<Respondent | null>(null);

  const positions = useMemo(
    () => [...new Set(respondents.map((r) => r.position))],
    [respondents],
  );
  const levels = useMemo(
    () => [...new Set(respondents.map((r) => r.college_level))],
    [respondents],
  );
  const colleges = useMemo(
    () => [...new Set(respondents.map((r) => r.college))],
    [respondents],
  );

  const filtered = useMemo(() => {
    return respondents.filter((r) => {
      if (posFilter.length > 0 && !posFilter.includes(r.position)) return false;
      if (levelFilter.length > 0 && !levelFilter.includes(r.college_level)) return false;
      if (collegeFilter.length > 0 && !collegeFilter.includes(r.college)) return false;
      return true;
    });
  }, [respondents, posFilter, levelFilter, collegeFilter]);

  const donutDist = useMemo(() => {
    const dist: Record<string, number> = {};
    for (const r of filtered) {
      const val = r.q_overall;
      if (val) dist[val] = (dist[val] || 0) + 1;
    }
    return dist;
  }, [filtered]);

  return (
    <>
      <div className="space-y-3 mb-8">
        <FilterChips label="Position" options={positions} value={posFilter} onChange={setPosFilter} />
        <FilterChips label="Level" options={levels} value={levelFilter} onChange={setLevelFilter} />
        <FilterChips label="College" options={colleges} value={collegeFilter} onChange={setCollegeFilter} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <p className="font-display font-extrabold text-il-blue text-lg mb-4">
            Showing {filtered.length} of {respondents.length}
          </p>

          <div className="border border-il-storm-95 rounded-[2px] overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-il-storm-95">
                    <TableHead className="font-display font-medium text-il-storm-30 uppercase tracking-widest text-xs">
                      Position
                    </TableHead>
                    <TableHead className="font-display font-medium text-il-storm-30 uppercase tracking-widest text-xs">
                      College
                    </TableHead>
                    <TableHead className="font-display font-medium text-il-storm-30 uppercase tracking-widest text-xs">
                      Tools
                    </TableHead>
                    <TableHead className="font-display font-medium text-il-storm-30 uppercase tracking-widest text-xs">
                      Uses
                    </TableHead>
                    <TableHead className="font-display font-medium text-il-storm-30 uppercase tracking-widest text-xs w-16 text-center">
                      Overall
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((r, i) => {
                    const dot = r.q_overall ? LIKERT_DOT[r.q_overall] : null;
                    return (
                      <TableRow
                        key={i}
                        className="cursor-pointer hover:bg-il-storm-95/50 transition-colors"
                        onClick={() => setSelected(r)}
                      >
                        <TableCell className="font-body text-sm text-il-storm-10">
                          {r.position}
                        </TableCell>
                        <TableCell className="font-body text-sm text-il-storm-10 max-w-[200px] truncate">
                          {r.college}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {r.tools.split(";").filter(Boolean).slice(0, 3).map((t) => {
                              const tc = getToolColor(t);
                              return (
                                <Badge
                                  key={t}
                                  className="text-[10px] font-body px-1.5 py-0 rounded-[4px]"
                                  style={{ backgroundColor: tc.bg, color: tc.text }}
                                >
                                  {t.trim()}
                                </Badge>
                              );
                            })}
                            {r.tools.split(";").filter(Boolean).length > 3 && (
                              <Badge className="bg-il-storm-70 text-white text-[10px] font-body px-1.5 py-0 rounded-[4px]">
                                +{r.tools.split(";").filter(Boolean).length - 3}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {r.uses.split(";").filter(Boolean).slice(0, 2).map((u) => (
                              <Badge
                                key={u}
                                className="bg-il-storm-95 text-il-storm-10 text-[10px] font-body px-1.5 py-0 rounded-[4px]"
                              >
                                {u.trim()}
                              </Badge>
                            ))}
                            {r.uses.split(";").filter(Boolean).length > 2 && (
                              <Badge className="bg-il-storm-95 text-il-storm-30 text-[10px] font-body px-1.5 py-0 rounded-[4px]">
                                +{r.uses.split(";").filter(Boolean).length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {dot ? (
                            <Tooltip>
                              <TooltipTrigger
                                className="inline-block w-3 h-3 rounded-full"
                                style={{ backgroundColor: dot.color }}
                              />
                              <TooltipContent className="font-body text-xs">
                                {dot.label}
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <span className="inline-block w-3 h-3 rounded-full border border-il-storm-70" />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <div className="lg:w-[240px] shrink-0">
          <p className="font-display font-medium text-il-storm-30 uppercase tracking-widest text-xs mb-4 text-center">
            Overall Likert (filtered)
          </p>
          <LikertDonut distribution={donutDist} />
        </div>
      </div>

      <ResponseDialog
        respondent={selected}
        open={!!selected}
        onOpenChange={(open) => { if (!open) setSelected(null); }}
      />
    </>
  );
}
