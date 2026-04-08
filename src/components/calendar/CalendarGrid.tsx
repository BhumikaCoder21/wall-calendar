'use client';

import React, { useCallback } from 'react';
import { isSameMonth, isSameDay, isToday, isWithinInterval, format } from 'date-fns';
import { getCalendarDays, WEEKDAY_LABELS, getHoliday } from '@/lib/calendar';
import type { DateRange, DateNote, MonthImage } from '@/types';
import clsx from 'clsx';

interface Props {
  currentDate: Date;
  selectedRange: DateRange;
  dateNotes: Record<string, DateNote[]>;
  activeImage: MonthImage;
  theme: 'light' | 'dark';
  onDayClick: (date: Date) => void;
  toDateKey: (date: Date) => string;
}

export function CalendarGrid({
  currentDate, selectedRange, dateNotes, activeImage, theme, onDayClick, toDateKey,
}: Props) {
  const days = getCalendarDays(currentDate);
  const { start, end } = selectedRange;

  const getDayState = useCallback((day: Date) => {
    const isStart = start && isSameDay(day, start);
    const isEnd = end && isSameDay(day, end);
    const isInRange = start && end && isWithinInterval(day, {
      start: start < end ? start : end,
      end: start < end ? end : start,
    }) && !isStart && !isEnd;
    const isSelected = isStart || isEnd;
    const today = isToday(day);
    const inMonth = isSameMonth(day, currentDate);
    const holiday = getHoliday(day);
    const hasNotes = (dateNotes[toDateKey(day)] || []).length > 0;
    const weekend = day.getDay() === 0 || day.getDay() === 6;
    return { isStart, isEnd, isInRange, isSelected, today, inMonth, holiday, hasNotes, weekend };
  }, [start, end, currentDate, dateNotes, toDateKey]);

  const isWeekend = (dayIndex: number) => dayIndex === 5 || dayIndex === 6; // SAT, SUN (Mon-indexed)

  return (
    <div className="px-4 pb-4">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAY_LABELS.map((label, i) => (
          <div
            key={label}
            className={clsx(
              'text-center text-[10px] font-bold tracking-widest py-2 font-mono',
              isWeekend(i)
                ? 'text-sky-accent'
                : theme === 'dark' ? 'text-ink-400' : 'text-ink-500',
            )}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {days.map((day, idx) => {
          const state = getDayState(day);
          const key = toDateKey(day);

          return (
            <div
              key={idx}
              className="relative flex flex-col items-center"
            >
              {/* Range highlight bar */}
              {state.isInRange && (
                <div
                  className="absolute inset-y-0 left-0 right-0 z-0"
                  style={{
                    background: `${activeImage.palette.accent}20`,
                    // Extend left/right for continuous bar
                    marginLeft: '-1px',
                    marginRight: '-1px',
                  }}
                />
              )}
              {/* Start cap */}
              {state.isStart && end && (
                <div
                  className="absolute inset-y-0 right-0 left-1/2 z-0"
                  style={{ background: `${activeImage.palette.accent}20` }}
                />
              )}
              {/* End cap */}
              {state.isEnd && start && (
                <div
                  className="absolute inset-y-0 left-0 right-1/2 z-0"
                  style={{ background: `${activeImage.palette.accent}20` }}
                />
              )}

              <button
                onClick={() => onDayClick(day)}
                disabled={!state.inMonth}
                className={clsx(
                  'relative z-10 w-9 h-9 rounded-full flex flex-col items-center justify-center text-sm transition-all duration-150 select-none',
                  'focus:outline-none focus-visible:ring-2',
                  state.inMonth ? 'cursor-pointer' : 'cursor-default',
                  !state.inMonth && 'opacity-20',
                  state.isSelected && 'text-white font-bold shadow-md scale-110',
                  !state.isSelected && state.today && 'font-bold ring-2',
                  !state.isSelected && state.weekend && state.inMonth
                    ? 'text-sky-accent'
                    : !state.isSelected && state.inMonth
                    ? theme === 'dark' ? 'text-ink-100 hover:bg-ink-700' : 'text-ink-800 hover:bg-ink-100'
                    : '',
                  !state.isSelected && state.inMonth && 'hover:scale-105',
                )}
                style={
                  state.isSelected
                    ? { background: activeImage.palette.accent, borderColor: activeImage.palette.accent }
                    : state.today && !state.isSelected
                    ? { ringColor: activeImage.palette.accent, color: activeImage.palette.accentDark }
                    : undefined
                }
                title={state.holiday?.name}
              >
                <span className="leading-none text-sm md:text-base">{format(day, 'd')}</span>
              </button>

              {/* Indicators row */}
              <div className="flex gap-0.5 h-1.5 items-center justify-center z-10 relative mt-0.5">
                {state.holiday && (
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ background: activeImage.palette.accent }}
                    title={state.holiday.name}
                  />
                )}
                {state.hasNotes && (
                  <span className="w-1 h-1 rounded-full bg-amber-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
