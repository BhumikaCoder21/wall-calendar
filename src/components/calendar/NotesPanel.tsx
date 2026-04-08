'use client';

import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { Plus, X, StickyNote, Calendar, Trash2 } from 'lucide-react';
import type { DateNote, MonthNote, NoteColor, DateRange, MonthImage } from '@/types';
import { NOTE_COLORS, toDateKey } from '@/lib/calendar';
import clsx from 'clsx';

interface Props {
  currentDate: Date;
  selectedRange: DateRange;
  dateNotes: Record<string, DateNote[]>;
  monthNotes: Record<string, MonthNote[]>;
  activeImage: MonthImage;
  theme: 'light' | 'dark';
  toMonthKey: (date: Date) => string;
  onAddDateNote: (date: Date, text: string, color: NoteColor) => void;
  onRemoveDateNote: (date: Date, noteId: string) => void;
  onAddMonthNote: (text: string) => void;
  onRemoveMonthNote: (noteId: string) => void;
  onClearRange: () => void;
}

type Tab = 'month' | 'range';

const COLOR_OPTIONS: NoteColor[] = ['sky', 'amber', 'rose', 'emerald', 'violet'];

export function NotesPanel({
  currentDate, selectedRange, dateNotes, monthNotes, activeImage, theme,
  toMonthKey, onAddDateNote, onRemoveDateNote, onAddMonthNote, onRemoveMonthNote, onClearRange,
}: Props) {
  const [tab, setTab] = useState<Tab>('month');
  const [noteText, setNoteText] = useState('');
  const [selectedColor, setSelectedColor] = useState<NoteColor>('sky');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const monthKey = toMonthKey(currentDate);
  const currentMonthNotes = monthNotes[monthKey] || [];

  const rangeNotes: Array<{ date: Date; note: DateNote }> = [];
  if (selectedRange.start) {
    const dates = getDatesBetween(selectedRange.start, selectedRange.end || selectedRange.start);
    dates.forEach(d => {
      (dateNotes[toDateKey(d)] || []).forEach(note => rangeNotes.push({ date: d, note }));
    });
  }

  const hasRange = selectedRange.start !== null;

  const handleSubmit = () => {
    if (!noteText.trim()) return;
    if (tab === 'month') {
      onAddMonthNote(noteText.trim());
    } else if (selectedRange.start) {
      // Add to each day in range
      const dates = getDatesBetween(selectedRange.start, selectedRange.end || selectedRange.start);
      dates.forEach(d => onAddDateNote(d, noteText.trim(), selectedColor));
    }
    setNoteText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit();
  };

  const bg = theme === 'dark' ? 'bg-ink-800' : 'bg-white';
  const border = theme === 'dark' ? 'border-ink-700' : 'border-ink-100';
  const textPrimary = theme === 'dark' ? 'text-ink-100' : 'text-ink-800';
  const textSecondary = theme === 'dark' ? 'text-ink-400' : 'text-ink-500';
  const inputBg = theme === 'dark' ? 'bg-ink-900 border-ink-600 text-ink-100' : 'bg-cream border-ink-200 text-ink-800';

  return (
    <div className={clsx('flex flex-col h-full', bg)}>
      {/* Header */}
      <div className={clsx('px-4 pt-4 pb-0 border-b', border)}>
        <div className="flex items-center gap-1 mb-3">
          <StickyNote size={15} style={{ color: activeImage.palette.accent }} />
          <span className={clsx('text-xs font-bold uppercase tracking-widest font-mono', textSecondary)}>
            Notes
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-0">
          <button
            onClick={() => setTab('month')}
            className={clsx(
              'flex-1 py-2 text-xs font-bold tracking-wide border-b-2 transition-colors font-mono',
              tab === 'month'
                ? 'border-current'
                : 'border-transparent opacity-50 hover:opacity-80',
            )}
            style={tab === 'month' ? { color: activeImage.palette.accent, borderColor: activeImage.palette.accent } : { color: theme === 'dark' ? '#9a8876' : '#7d6a59' }}
          >
            MONTH
          </button>
          <button
            onClick={() => setTab('range')}
            className={clsx(
              'flex-1 py-2 text-xs font-bold tracking-wide border-b-2 transition-colors font-mono relative',
              tab === 'range'
                ? 'border-current'
                : 'border-transparent opacity-50 hover:opacity-80',
            )}
            style={tab === 'range' ? { color: activeImage.palette.accent, borderColor: activeImage.palette.accent } : { color: theme === 'dark' ? '#9a8876' : '#7d6a59' }}
          >
            RANGE
            {hasRange && (
              <span
                className="absolute top-1.5 right-3 w-2 h-2 rounded-full"
                style={{ background: activeImage.palette.accent }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {tab === 'month' && (
          <>
            {currentMonthNotes.length === 0 && (
              <p className={clsx('text-xs italic text-center py-4', textSecondary)}>
                No notes for {format(currentDate, 'MMMM yyyy')} yet.
              </p>
            )}
            {currentMonthNotes.map(note => (
              <MonthNoteCard
                key={note.id}
                note={note}
                theme={theme}
                onRemove={() => onRemoveMonthNote(note.id)}
                accent={activeImage.palette.accent}
              />
            ))}
          </>
        )}

        {tab === 'range' && (
          <>
            {!hasRange ? (
              <div className={clsx('text-center py-6 space-y-2', textSecondary)}>
                <Calendar size={24} className="mx-auto opacity-40" />
                <p className="text-xs">Select a date range on the calendar to add notes.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className={clsx('text-xs font-mono font-bold', textSecondary)}>
                    {selectedRange.end
                      ? `${format(selectedRange.start!, 'MMM d')} → ${format(selectedRange.end, 'MMM d')}`
                      : format(selectedRange.start!, 'MMM d')}
                  </p>
                  <button
                    onClick={onClearRange}
                    className={clsx('text-xs flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity', textSecondary)}
                  >
                    <X size={12} /> Clear
                  </button>
                </div>

                {/* Color picker */}
                <div className="flex gap-1.5 my-2">
                  {COLOR_OPTIONS.map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={clsx(
                        'w-5 h-5 rounded-full transition-transform',
                        selectedColor === c ? 'scale-125 ring-2 ring-offset-1' : 'hover:scale-110',
                        NOTE_COLORS[c].dot,
                      )}
                      style={selectedColor === c ? { ringColor: NOTE_COLORS[c].dot } : undefined}
                    />
                  ))}
                </div>

                {rangeNotes.length === 0 && (
                  <p className={clsx('text-xs italic', textSecondary)}>No notes for this range.</p>
                )}
                {rangeNotes.map(({ date, note }) => (
                  <DateNoteCard
                    key={note.id}
                    date={date}
                    note={note}
                    theme={theme}
                    onRemove={() => onRemoveDateNote(date, note.id)}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>

      {/* Input */}
      <div className={clsx('p-4 border-t', border)}>
        {tab === 'range' && !hasRange ? null : (
          <div className="space-y-2">
            <textarea
              ref={textareaRef}
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
              placeholder={
                tab === 'month'
                  ? `Note for ${format(currentDate, 'MMMM')}…`
                  : selectedRange.end
                  ? `Note for ${format(selectedRange.start!, 'MMM d')} – ${format(selectedRange.end, 'MMM d')}…`
                  : `Note for ${format(selectedRange.start!, 'MMM d')}…`
              }
              className={clsx(
                'w-full text-sm rounded-lg border px-3 py-2 resize-none transition-colors focus:outline-none focus:ring-2',
                inputBg,
              )}
              style={{ '--tw-ring-color': activeImage.palette.accent } as React.CSSProperties}
            />
            <button
              onClick={handleSubmit}
              disabled={!noteText.trim()}
              className="w-full py-2 rounded-lg text-sm font-bold text-white transition-all hover:brightness-110 active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ background: activeImage.palette.accent }}
            >
              <Plus size={15} /> Add Note
              <span className="text-xs opacity-70 font-normal">(⌘↵)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MonthNoteCard({ note, theme, onRemove, accent }: { note: MonthNote; theme: string; onRemove: () => void; accent: string }) {
  return (
    <div
      className={clsx(
        'group relative rounded-lg p-3 border text-sm leading-relaxed',
        theme === 'dark' ? 'bg-ink-700 border-ink-600 text-ink-100' : 'bg-cream border-ink-100 text-ink-700',
      )}
    >
      <div
        className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
        style={{ background: accent }}
      />
      <p className="pl-3 pr-5">{note.text}</p>
      <span className={clsx('text-[10px] pl-3', theme === 'dark' ? 'text-ink-500' : 'text-ink-400')}>
        {format(new Date(note.createdAt), 'MMM d, h:mm a')}
      </span>
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-ink-400 hover:text-rose-500"
      >
        <Trash2 size={12} />
      </button>
    </div>
  );
}

function DateNoteCard({ date, note, theme, onRemove }: { date: Date; note: DateNote; theme: string; onRemove: () => void }) {
  const colors = NOTE_COLORS[note.color];
  return (
    <div
      className={clsx(
        'group relative rounded-lg p-3 border text-sm leading-relaxed',
        theme === 'dark' ? 'bg-ink-700 border-ink-600' : colors.bg,
      )}
    >
      <div className="flex items-start gap-2">
        <span className={clsx('w-2 h-2 rounded-full mt-1 flex-shrink-0', colors.dot)} />
        <div className="flex-1 min-w-0">
          <span className={clsx('text-[10px] font-bold uppercase tracking-wide', colors.text)}>
            {format(date, 'MMM d')}
          </span>
          <p className={clsx('mt-0.5 break-words', theme === 'dark' ? 'text-ink-100' : 'text-ink-700')}>{note.text}</p>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-ink-400 hover:text-rose-500"
      >
        <Trash2 size={12} />
      </button>
    </div>
  );
}

function getDatesBetween(start: Date, end: Date): Date[] {
  const dates: Date[] = [];
  const s = start < end ? start : end;
  const e = start < end ? end : start;
  const cur = new Date(s);
  while (cur <= e) {
    dates.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}
