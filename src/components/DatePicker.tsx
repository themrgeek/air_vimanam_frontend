"use client";

import { useState } from "react";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label: string;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function DatePicker({
  value,
  onChange,
  label,
}: DatePickerProps) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(today);

  const selected = value ? new Date(value + "T00:00:00") : null;

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // First day of month & total days
  const firstDay = new Date(year, month, 1).getDay(); // This fun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const selectDay = (day: number) => {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    onChange(`${year}-${mm}-${dd}`);
    setOpen(false);
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const isSelected = (day: number) =>
    selected &&
    day === selected.getDate() &&
    month === selected.getMonth() &&
    year === selected.getFullYear();

  const isPast = (day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const displayValue = selected
    ? selected.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className="flex flex-col gap-1 relative">
      <label className="text-white/40 text-xs uppercase tracking-wider">
        {label}
      </label>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="bg-transparent text-left border-b border-white/20 pb-2 focus:outline-none focus:border-[var(--gold)] transition-colors flex items-center justify-between"
      >
        <span className={displayValue ? "text-white" : "text-white/30"}>
          {displayValue ?? "Select date"}
        </span>
        {/* Plane icon using pure CSS/SVG */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-[var(--gold)] opacity-70"
        >
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.0 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
        </svg>
      </button>

      {/* Calendar Dropdown */}
      {open && (
        <div className="absolute top-14 left-0 z-50 w-72 bg-[var(--navy-mid)] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <button
              onClick={prevMonth}
              className="text-white/40 hover:text-[var(--gold)] transition-colors text-lg"
            >
              ‹
            </button>
            <span className="text-white font-semibold tracking-wide">
              {MONTHS[month]} {year}
            </span>
            <button
              onClick={nextMonth}
              className="text-white/40 hover:text-[var(--gold)] transition-colors text-lg"
            >
              ›
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 px-3 pt-3">
            {DAYS.map((d) => (
              <div
                key={d}
                className="text-center text-white/30 text-xs font-medium py-1"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 px-3 pb-4 gap-y-1">
            {/* Empty cells for offset */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const past = isPast(day);
              const sel = isSelected(day);
              const tod = isToday(day);

              return (
                <button
                  key={day}
                  onClick={() => !past && selectDay(day)}
                  disabled={past}
                  className={`
                    relative w-9 h-9 mx-auto rounded-full text-sm transition-all flex items-center justify-center
                    ${past ? "text-white/15 cursor-not-allowed" : "cursor-pointer hover:bg-white/10"}
                    ${sel ? "bg-[var(--gold)] text-[var(--navy)] font-bold" : ""}
                    ${tod && !sel ? "text-[var(--gold)] font-semibold" : ""}
                    ${!sel && !tod && !past ? "text-white/80" : ""}
                  `}
                >
                  {day}
                  {/* Today dot indicator */}
                  {tod && !sel && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--gold)]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 px-5 py-3 flex justify-between items-center">
            <span className="text-white/30 text-xs">
              ✈ Prices may vary by date
            </span>
            <button
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="text-white/40 text-xs hover:text-white transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Backdrop to close */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}
