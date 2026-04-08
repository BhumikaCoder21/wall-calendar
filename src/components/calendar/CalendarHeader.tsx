'use client';

import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Sun, Moon, CalendarDays } from 'lucide-react';
import type { MonthImage } from '@/types';
import clsx from 'clsx';

interface Props {
  currentDate: Date;
  today: Date;
  activeImage: MonthImage;
  theme: 'light' | 'dark';
  isFlipping: boolean;
  flipDir: 'next' | 'prev';
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onThemeToggle: () => void;
}

export function CalendarHeader({
  currentDate, today, activeImage, theme, isFlipping, flipDir,
  onPrev, onNext, onToday, onThemeToggle,
}: Props) {
  const isCurrentMonth =
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/7', minHeight: 180 }}>
      {/* Hero Image */}
      <div
        className={clsx(
          'absolute inset-0 transition-all duration-500',
          isFlipping && flipDir === 'next' && 'animate-flip-next',
          isFlipping && flipDir === 'prev' && 'animate-flip-prev',
        )}
      >
        <img
          src={activeImage.url}
          alt={activeImage.alt}
          className="w-full h-full object-cover"
          style={{
            transition: 'opacity 0.5s ease',
            filter: theme === 'dark' ? 'brightness(0.7) saturate(0.8)' : 'brightness(0.92)',
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, transparent 0%, transparent 40%, ${activeImage.palette.accentDark}dd 100%)`,
          }}
        />
        {/* Zigzag bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          style={{ height: 40 }}
        >
          <path
            d="M0,60 L0,30 L100,0 L200,30 L300,0 L400,30 L500,0 L600,30 L700,0 L800,30 L900,0 L1000,30 L1100,0 L1200,30 L1200,60 Z"
            fill={theme === 'dark' ? '#1a1108' : '#ffffff'}
          />
        </svg>
      </div>

      {/* Month/Year label */}
      <div
        className="absolute bottom-8 right-6 text-right z-10"
        style={{ color: activeImage.palette.text }}
      >
        <div
          className="text-4xl md:text-5xl font-bold leading-none tracking-tight font-display"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
        >
          {format(currentDate, 'yyyy')}
        </div>
        <div
          className="text-2xl md:text-3xl font-bold uppercase tracking-widest font-display"
          style={{
            color: activeImage.palette.accent,
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          {format(currentDate, 'MMMM')}
        </div>
        {activeImage.photographer && (
          <div className="text-xs mt-1 opacity-60 font-mono">
            📷 {activeImage.photographer}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute top-3 right-3 flex gap-2 z-10">
        <button
          onClick={onThemeToggle}
          className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.25)', color: '#fff' }}
          title="Toggle theme"
        >
          {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
        </button>
        {!isCurrentMonth && (
          <button
            onClick={onToday}
            className="px-3 h-8 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-sm transition-all hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.25)', color: '#fff' }}
          >
            <CalendarDays size={12} /> Today
          </button>
        )}
      </div>

      {/* Navigation arrows */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
        <button
          onClick={onPrev}
          disabled={isFlipping}
          className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
          style={{ background: 'rgba(255,255,255,0.25)', color: '#fff' }}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={onNext}
          disabled={isFlipping}
          className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
          style={{ background: 'rgba(255,255,255,0.25)', color: '#fff' }}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
