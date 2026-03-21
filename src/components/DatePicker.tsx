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

  const firstDay = new Date(year, month, 1).getDay();
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
      <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider font-medium">
        {label}
      </label>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="bg-transparent text-left border-b border-[var(--border)] pb-2 focus:outline-none focus:border-[var(--gold)] transition-colors flex items-center justify-between"
      >
        <span
          className={
            displayValue
              ? "text-[var(--text-primary)]"
              : "text-[var(--text-muted)]"
          }
        >
          {displayValue ?? "Select date"}
        </span>
        {/* Calendar icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-[var(--gold)] opacity-80"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {/* Calendar Dropdown / Bottom Sheet */}
      {open && (
        <div
          className="
            bottom-sheet calendar-dropdown
            bg-white border border-[var(--border)]
            rounded-2xl shadow-xl overflow-hidden z-50
          "
        >
          {/* Mobile handle bar */}
          <div className="sm:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-[var(--border)]" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-[var(--border-light)]">
            <button
              onClick={prevMonth}
              className="text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors text-lg w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-[var(--gold-glow)]"
            >
              ‹
            </button>
            <span className="text-[var(--text-primary)] font-semibold tracking-wide text-sm sm:text-base">
              {MONTHS[month]} {year}
            </span>
            <button
              onClick={nextMonth}
              className="text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors text-lg w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-[var(--gold-glow)]"
            >
              ›
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 px-3 sm:px-3 pt-3">
            {DAYS.map((d) => (
              <div
                key={d}
                className="text-center text-[var(--text-muted)] text-xs font-medium py-1"
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
                    relative w-10 h-10 sm:w-9 sm:h-9 mx-auto rounded-full text-sm transition-all flex items-center justify-center
                    ${past ? "text-gray-300 cursor-not-allowed" : "cursor-pointer hover:bg-[var(--gold-glow)]"}
                    ${sel ? "bg-[var(--gold)] text-white font-bold shadow-sm" : ""}
                    ${tod && !sel ? "text-[var(--gold)] font-semibold" : ""}
                    ${!sel && !tod && !past ? "text-[var(--text-primary)]" : ""}
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
          <div className="border-t border-[var(--border-light)] px-4 sm:px-5 py-3 flex justify-between items-center">
            <span className="text-[var(--text-muted)] text-xs">
              ✈ Prices may vary by date
            </span>
            <button
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="text-[var(--text-muted)] text-xs hover:text-[var(--gold)] transition-colors font-medium"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Backdrop to close */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 sm:bg-transparent"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}
