"use client";

import React from "react";
import { HOLIDAYS } from "@/lib/calendar";
import type { MonthImage } from "@/types";
import clsx from "clsx";

interface Props {
  currentDate: Date;
  activeImage: MonthImage;
  theme: "light" | "dark";
}

export function HolidayTicker({ currentDate, activeImage, theme }: Props) {
  const month = currentDate.getMonth() + 1;

  const holidays = HOLIDAYS.filter((h) => {
    const [m] = h.date.split("-").map(Number);
    return m === month;
  });

  if (holidays.length === 0) return null;

  return (
    <div
      className={clsx(
        "mx-4 mb-3 px-3 py-2 rounded-xl text-xs",
        theme === "dark" ? "bg-ink-700" : "bg-cream",
      )}
    >
      <div
        className={clsx(
          "font-mono font-bold uppercase tracking-widest mb-1.5 text-[10px]",
          theme === "dark" ? "text-ink-400" : "text-ink-500",
        )}
      >
        This Month
      </div>

      <div className="flex flex-wrap gap-1.5">
        {holidays.map((h) => {
          const [, day] = h.date.split("-").map(Number);

          return (
            <span
              key={h.date}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
              style={{
                background: `${activeImage.palette.accent}18`,
                color: activeImage.palette.accentDark,
              }}
            >
              <span className="opacity-60">{day}</span>
              <span>{h.name}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
