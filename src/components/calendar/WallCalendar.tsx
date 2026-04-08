'use client';

import React from 'react';
import clsx from 'clsx';
import { useCalendar } from '@/hooks/useCalendar';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { NotesPanel } from './NotesPanel';
import { RangeSummary } from './RangeSummary';
import { HolidayTicker } from './HolidayTicker';
import { SpiralBinding } from '../ui/SpiralBinding';

export function WallCalendar() {
  const cal = useCalendar();
  const { theme, activeImage, isFlipping, flipDir } = cal;

  const isDark = theme === 'dark';
  const calendarBg = isDark ? 'bg-ink-900' : 'bg-white';
  const outerBg = isDark ? 'bg-ink-800' : 'bg-parchment';
  const divider = isDark ? 'border-ink-700' : 'border-ink-100';

  return (
    <div
      className={clsx(
        'min-h-screen w-full flex items-center justify-center transition-colors duration-500',
        isDark ? 'bg-ink-900' : 'bg-cream',
      )}
      style={{
        backgroundImage: isDark
          ? 'radial-gradient(ellipse at 30% 20%, rgba(43,158,212,0.08) 0%, transparent 60%)'
          : 'radial-gradient(ellipse at 30% 20%, rgba(43,158,212,0.06) 0%, transparent 60%)',
      }}
    >
      {/* Wall shadow / mounting effect */}
      <div className="relative w-full max-w-5xl mx-auto px-3 py-8 md:py-12">
        {/* Hanging wire */}
        <div className="flex justify-center mb-0">
          <div className={clsx('w-px h-8', isDark ? 'bg-ink-600' : 'bg-ink-300')} />
        </div>

        {/* Calendar book */}
        <div
          className={clsx(
            'relative rounded-calendar overflow-hidden shadow-calendar transition-colors duration-500',
            calendarBg,
          )}
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Spiral binding */}
          <SpiralBinding theme={theme} />

          {/* Flip wrapper */}
          <div
            className={clsx(
              'transition-all duration-400',
              isFlipping && 'opacity-0 scale-y-95',
            )}
            style={{
              transition: 'opacity 0.35s ease, transform 0.35s ease',
            }}
          >
            {/* Desktop: side-by-side | Mobile: stacked */}
            <div className="flex flex-col lg:flex-row">
              {/* LEFT: Calendar panel */}
              <div className={clsx('flex-1 flex flex-col border-b lg:border-b-0 lg:border-r', divider)}>
                <CalendarHeader
                  currentDate={cal.currentDate}
                  today={cal.today}
                  activeImage={activeImage}
                  theme={theme}
                  isFlipping={isFlipping}
                  flipDir={flipDir}
                  onPrev={() => cal.navigateMonth('prev')}
                  onNext={() => cal.navigateMonth('next')}
                  onToday={cal.goToToday}
                  onThemeToggle={cal.toggleTheme}
                />

                {/* Range summary bar */}
                <RangeSummary
                  selectedRange={cal.selectedRange}
                  activeImage={activeImage}
                  theme={theme}
                  onClearRange={cal.clearRange}
                />

                {/* Holiday ticker */}
                <HolidayTicker
                  currentDate={cal.currentDate}
                  activeImage={activeImage}
                  theme={theme}
                />

                <CalendarGrid
                  currentDate={cal.currentDate}
                  selectedRange={cal.selectedRange}
                  dateNotes={cal.dateNotes}
                  activeImage={activeImage}
                  theme={theme}
                  onDayClick={cal.handleDayClick}
                  toDateKey={cal.toDateKey}
                />
              </div>

              {/* RIGHT: Notes panel */}
              <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 flex flex-col" style={{ minHeight: 400 }}>
                <NotesPanel
                  currentDate={cal.currentDate}
                  selectedRange={cal.selectedRange}
                  dateNotes={cal.dateNotes}
                  monthNotes={cal.monthNotes}
                  activeImage={activeImage}
                  theme={theme}
                  toMonthKey={cal.toMonthKey}
                  onAddDateNote={cal.addDateNote}
                  onRemoveDateNote={cal.removeDateNote}
                  onAddMonthNote={cal.addMonthNote}
                  onRemoveMonthNote={cal.removeMonthNote}
                  onClearRange={cal.clearRange}
                />
              </div>
            </div>
          </div>

          {/* Bottom edge shadow (physical depth) */}
          <div
            className="h-1 w-full"
            style={{
              background: isDark
                ? 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)'
                : 'linear-gradient(to bottom, rgba(0,0,0,0.06), transparent)',
            }}
          />
        </div>

        {/* Cast shadow below calendar */}
        <div
          className="mx-8 h-4 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
      </div>
    </div>
  );
}
