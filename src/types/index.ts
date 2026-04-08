export interface DateNote {
  id: string;
  text: string;
  color: NoteColor;
  createdAt: string;
}

export type NoteColor = 'sky' | 'amber' | 'rose' | 'emerald' | 'violet';

export interface MonthNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface CalendarState {
  currentDate: Date;
  selectedRange: DateRange;
  dateNotes: Record<string, DateNote[]>;   // key: "YYYY-MM-DD"
  monthNotes: Record<string, MonthNote[]>; // key: "YYYY-MM"
  theme: 'light' | 'dark';
  activeImage: MonthImage;
}

export interface MonthImage {
  url: string;
  alt: string;
  photographer?: string;
  palette: ImagePalette;
}

export interface ImagePalette {
  accent: string;
  accentLight: string;
  accentDark: string;
  text: string;
}

export interface Holiday {
  date: string; // "MM-DD"
  name: string;
  type: 'national' | 'observance';
}
