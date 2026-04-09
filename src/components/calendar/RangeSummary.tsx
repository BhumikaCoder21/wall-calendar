"use client";

import React from "react";
import { format, differenceInDays } from "date-fns";
import { X, CalendarRange } from "lucide-react";
import type { DateRange, MonthImage } from "@/types";
import clsx from "clsx";

interface Props {
  selectedRange: DateRange;
  activeImage: MonthImage;
  theme: "light" | "dark";
  onClearRange: () => void;
}

export function RangeSummary({
  selectedRange,
  activeImage,
  theme,
  onClearRange,
}: Props) {
  const { start, end } = selectedRange;

  if (!start) return null;

  const startDate = start;
  const endDate = end;

  const from = endDate && endDate < startDate ? endDate : startDate;
  const to = endDate && endDate < startDate ? startDate : endDate;

  const days = endDate ? differenceInDays(to!, from) + 1 : 1;

  const textSecondary = theme === "dark" ? "text-ink-400" : "text-ink-500";

  return (
    <div
      className={clsx(
        "mx-4 mb-3 px-3 py-2 rounded-xl flex items-center justify-between text-sm",
        theme === "dark" ? "bg-ink-700" : "bg-cream",
      )}
      style={{
        borderLeft: `3px solid ${activeImage.palette.accent}`,
      }}
    >
      <div className="flex items-center gap-2">
        <CalendarRange
          size={14}
          style={{ color: activeImage.palette.accent }}
        />

        <span className={clsx("font-mono text-xs font-bold", textSecondary)}>
          {endDate
            ? `${format(from, "MMM d")} – ${format(to!, "MMM d")} · ${days}d`
            : `${format(startDate, "MMM d, yyyy")} · 1 day`}
        </span>
      </div>

      <button
        onClick={onClearRange}
        className={clsx(
          "opacity-50 hover:opacity-100 transition-opacity",
          textSecondary,
        )}
      >
        <X size={14} />
      </button>
    </div>
  );
}
