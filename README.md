# 📅 Wall Calendar Web App

A modern and interactive wall calendar built using Next.js, TypeScript, and Tailwind CSS.  
This project combines a visual calendar with note-taking and range-based planning features.

---

## 🚀 Features

- 📆 Monthly calendar view with proper weekday alignment  
- 🔄 Smooth navigation between months  
- 🎯 Select single dates or date ranges  
- 📝 Add notes for:
  - Entire month
  - Selected date ranges  
- 🎨 Dynamic UI:
  - Monthly background images
  - Adaptive color themes
  - Light / Dark mode toggle  
- 📌 Visual indicators:
  - Notes displayed directly on calendar (colored dots)
  - Holiday indicators  
- 💾 Data persistence using localStorage  

---

## 🛠️ Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- date-fns

---

## 🧠 Design Decisions

- Used a **custom hook (`useCalendar`)** to manage all state and logic  
- Built modular components:
  - CalendarHeader  
  - CalendarGrid  
  - NotesPanel  
  - RangeSummary  
  - HolidayTicker  
- Used **localStorage** instead of backend to keep the app lightweight  
- Focused on **UI/UX** with animations, theming, and visual feedback  

---
### 📦 Getting Started

```bash
git clone https://github.com/BhumikaCoder21/wall-calendar.git
cd wall-calendar
npm install
npm run dev
