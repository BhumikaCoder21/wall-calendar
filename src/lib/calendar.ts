import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, isSameMonth, isSameDay, isWithinInterval,
  format, addMonths, subMonths, isToday, parseISO,
} from 'date-fns';
import type { Holiday, MonthImage } from '@/types';

export { format, addMonths, subMonths, isSameDay, isSameMonth, isToday, isWithinInterval, parseISO };

export function getCalendarDays(date: Date): Date[] {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });
  return eachDayOfInterval({ start, end });
}

export function toDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function toMonthKey(date: Date): string {
  return format(date, 'yyyy-MM');
}

export const WEEKDAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const HOLIDAYS: Holiday[] = [
  { date: '01-01', name: "New Year's Day", type: 'national' },
  { date: '02-14', name: "Valentine's Day", type: 'observance' },
  { date: '03-17', name: "St. Patrick's Day", type: 'observance' },
  { date: '07-04', name: 'Independence Day', type: 'national' },
  { date: '10-31', name: 'Halloween', type: 'observance' },
  { date: '11-11', name: "Veterans Day", type: 'national' },
  { date: '12-25', name: 'Christmas', type: 'national' },
  { date: '12-31', name: "New Year's Eve", type: 'observance' },
];

export function getHoliday(date: Date): Holiday | undefined {
  const key = format(date, 'MM-dd');
  return HOLIDAYS.find(h => h.date === key);
}

export const MONTH_IMAGES: MonthImage[] = [
  {
    url: "/jan.jpg",
    alt: "Winter mountains",
    photographer: "Eberhard Grossgasteiger",
    palette: {
      accent: "#2B9ED4",
      accentLight: "#E8F5FC",
      accentDark: "#1a6f97",
      text: "#ffffff",
    },
  },
  {
    url: "/feb.jpg",
    alt: "Spring cherry blossoms",
    photographer: "Alejandra Cifre",
    palette: {
      accent: "#E8729A",
      accentLight: "#FCE8EF",
      accentDark: "#b0455e",
      text: "#ffffff",
    },
  },
  {
    url: "/mar.jpg",
    alt: "Spring flowers",
    photographer: "Aaron Burden",
    palette: {
      accent: "#8CC152",
      accentLight: "#EEF7E4",
      accentDark: "#5d8c30",
      text: "#ffffff",
    },
  },
  {
    url: "/apr.jpg",
    alt: "Spring landscape",
    photographer: "Casey Horner",
    palette: {
      accent: "#37BC9B",
      accentLight: "#E0F5F0",
      accentDark: "#1e8068",
      text: "#ffffff",
    },
  },
  {
    url: "/may.jpg",
    alt: "Tropical beach summer",
    photographer: "Sean Oulashin",
    palette: {
      accent: "#F6BB42",
      accentLight: "#FDF4DC",
      accentDark: "#c48a0c",
      text: "#1a1108",
    },
  },
  {
    url: "/jun.jpg",
    alt: "Golden summer coast",
    photographer: "Wojciech Then",
    palette: {
      accent: "#E9573F",
      accentLight: "#FDE8E5",
      accentDark: "#b52f1b",
      text: "#ffffff",
    },
  },
  {
    url: "/jul.jpg",
    alt: "Lavender field",
    photographer: "Kira auf der Heide",
    palette: {
      accent: "#967ADC",
      accentLight: "#EEE8FC",
      accentDark: "#5e4c9e",
      text: "#ffffff",
    },
  },
  {
    url: "/aug.jpg",
    alt: "Mountain lake reflection",
    photographer: "Kalen Emsley",
    palette: {
      accent: "#3BAFDA",
      accentLight: "#E2F4FB",
      accentDark: "#1a7aa1",
      text: "#ffffff",
    },
  },
  {
    url: "/sep.jpg",
    alt: "Autumn mountain vista",
    photographer: "Samuel Ferrara",
    palette: {
      accent: "#E87722",
      accentLight: "#FDEEDD",
      accentDark: "#b54f05",
      text: "#ffffff",
    },
  },
  {
    url: "/oct.jpg",
    alt: "Autumn forest path",
    photographer: "Chris Lawton",
    palette: {
      accent: "#D4783B",
      accentLight: "#FAE9D9",
      accentDark: "#8f4413",
      text: "#ffffff",
    },
  },
  {
    url: "/nov.jpg",
    alt: "Late autumn fog",
    photographer: "Lukasz Szmigiel",
    palette: {
      accent: "#607D8B",
      accentLight: "#E8EEF1",
      accentDark: "#364c57",
      text: "#ffffff",
    },
  },
  {
    url: "/dec.jpg",
    alt: "Winter snow forest",
    photographer: "Aaron Burden",
    palette: {
      accent: "#5D9CEC",
      accentLight: "#E4EFFD",
      accentDark: "#2e67b9",
      text: "#ffffff",
    },
  },
];

export function getMonthImage(date: Date): MonthImage {
  return MONTH_IMAGES[date.getMonth()];
}

export const NOTE_COLORS = {
  sky:     { bg: 'bg-sky-50 border-sky-200',     dot: 'bg-sky-accent',    text: 'text-sky-700' },
  amber:   { bg: 'bg-amber-50 border-amber-200',  dot: 'bg-amber-400',    text: 'text-amber-700' },
  rose:    { bg: 'bg-rose-50 border-rose-200',    dot: 'bg-rose-400',     text: 'text-rose-700' },
  emerald: { bg: 'bg-emerald-50 border-emerald-200', dot: 'bg-emerald-400', text: 'text-emerald-700' },
  violet:  { bg: 'bg-violet-50 border-violet-200', dot: 'bg-violet-400',  text: 'text-violet-700' },
};
