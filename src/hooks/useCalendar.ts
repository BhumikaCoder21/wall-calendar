'use client';

import { useState, useCallback, useEffect } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { toDateKey, toMonthKey, getMonthImage } from '@/lib/calendar';
import type { CalendarState, DateRange, DateNote, MonthNote, NoteColor } from '@/types';
import { nanoid } from './nanoid';

const STORAGE_KEY = 'wall-calendar-v1';

function loadFromStorage(): Partial<CalendarState> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return {
      dateNotes: parsed.dateNotes || {},
      monthNotes: parsed.monthNotes || {},
    };
  } catch {
    return {};
  }
}

function saveToStorage(state: Partial<CalendarState>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      dateNotes: state.dateNotes,
      monthNotes: state.monthNotes,
    }));
  } catch {}
}

export function useCalendar() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [selectedRange, setSelectedRange] = useState<DateRange>({ start: null, end: null });
  const [dateNotes, setDateNotes] = useState<Record<string, DateNote[]>>({});
  const [monthNotes, setMonthNotes] = useState<Record<string, MonthNote[]>>({});
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<'next' | 'prev'>('next');

  // Load from storage
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored.dateNotes) setDateNotes(stored.dateNotes);
    if (stored.monthNotes) setMonthNotes(stored.monthNotes);
  }, []);

  // Persist on change
  useEffect(() => {
    saveToStorage({ dateNotes, monthNotes });
  }, [dateNotes, monthNotes]);

  const activeImage = getMonthImage(currentDate);

  const navigateMonth = useCallback((dir: 'next' | 'prev') => {
    setFlipDir(dir);
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentDate(d => dir === 'next' ? addMonths(d, 1) : subMonths(d, 1));
      setIsFlipping(false);
    }, 400);
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(today);
    setSelectedRange({ start: null, end: null });
  }, []);

  const handleDayClick = useCallback((date: Date) => {
    setSelectedRange(prev => {
      // If nothing selected, set start
      if (!prev.start || (prev.start && prev.end)) {
        return { start: date, end: null };
      }
      // If start selected but no end
      if (prev.start && !prev.end) {
        if (date < prev.start) {
          return { start: date, end: prev.start };
        }
        return { start: prev.start, end: date };
      }
      return { start: date, end: null };
    });
  }, []);

  const clearRange = useCallback(() => {
    setSelectedRange({ start: null, end: null });
  }, []);

  // Notes
  const addDateNote = useCallback((date: Date, text: string, color: NoteColor = 'sky') => {
    const key = toDateKey(date);
    const note: DateNote = { id: nanoid(), text, color, createdAt: new Date().toISOString() };
    setDateNotes(prev => ({ ...prev, [key]: [...(prev[key] || []), note] }));
  }, []);

  const removeDateNote = useCallback((date: Date, noteId: string) => {
    const key = toDateKey(date);
    setDateNotes(prev => ({ ...prev, [key]: (prev[key] || []).filter(n => n.id !== noteId) }));
  }, []);

  const addMonthNote = useCallback((text: string) => {
    const key = toMonthKey(currentDate);
    const note: MonthNote = { id: nanoid(), text, createdAt: new Date().toISOString() };
    setMonthNotes(prev => ({ ...prev, [key]: [...(prev[key] || []), note] }));
  }, [currentDate]);

  const removeMonthNote = useCallback((noteId: string) => {
    const key = toMonthKey(currentDate);
    setMonthNotes(prev => ({ ...prev, [key]: (prev[key] || []).filter(n => n.id !== noteId) }));
  }, [currentDate]);

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  }, []);

  return {
    currentDate,
    today,
    selectedRange,
    dateNotes,
    monthNotes,
    theme,
    activeImage,
    isFlipping,
    flipDir,
    navigateMonth,
    goToToday,
    handleDayClick,
    clearRange,
    addDateNote,
    removeDateNote,
    addMonthNote,
    removeMonthNote,
    toggleTheme,
    toDateKey,
    toMonthKey,
  };
}
