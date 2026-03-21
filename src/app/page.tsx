"use client";

import { useState } from "react";
import DatePicker from "@/components/DatePicker";

export default function Home() {
  const [date, setDate] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-[var(--border)]">
        <div>
          <p className="text-[var(--gold)] font-bold text-lg sm:text-xl tracking-wide">
            AIR VIMANAM
          </p>
          <p className="text-[var(--text-muted)] text-[10px] sm:text-xs tracking-widest">
            EXPERIENCE OUR CULTURE IN THE SKY
          </p>
        </div>

        {/* Desktop nav links */}
        <div className="hidden sm:flex items-center gap-6 text-sm text-[var(--text-secondary)]">
          <a
            href="#"
            className="hover:text-[var(--gold)] transition-colors font-medium"
          >
            Flights
          </a>
          <a
            href="#"
            className="hover:text-[var(--gold)] transition-colors font-medium"
          >
            My Bookings
          </a>
          <button className="bg-[var(--gold)] text-white px-5 py-2 rounded-full font-semibold hover:bg-[var(--gold-light)] hover:text-[var(--text-primary)] transition-all shadow-sm">
            Sign In
          </button>
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden flex flex-col gap-[5px] p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-[2px] bg-[var(--text-primary)] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`w-5 h-[2px] bg-[var(--text-primary)] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-5 h-[2px] bg-[var(--text-primary)] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="sm:hidden border-b border-[var(--border)] bg-[var(--bg-secondary)] px-5 py-4 flex flex-col gap-3 animate-[fade-in_0.2s_ease-out]">
          <a
            href="#"
            className="text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors font-medium py-2"
          >
            Flights
          </a>
          <a
            href="#"
            className="text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors font-medium py-2"
          >
            My Bookings
          </a>
          <button className="bg-[var(--gold)] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[var(--gold-light)] hover:text-[var(--text-primary)] transition-all shadow-sm w-full mt-1">
            Sign In
          </button>
        </div>
      )}

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-5 sm:px-6 py-16 sm:py-24 lg:py-32">
        <p className="text-[var(--gold)] text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4 font-semibold">
          Welcome aboard
        </p>
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-[var(--text-primary)]">
          Where every journey
          <br />
          <span className="text-[var(--gold)]">tells a story</span>
        </h1>
        <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-xl mb-8 sm:mb-12 leading-relaxed">
          Fly with Air Vimanam and experience the warmth of Indian hospitality,
          world-class cuisine, and comfort at 35,000 feet.
        </p>

        {/* Search Card */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl sm:rounded-3xl p-5 sm:p-6 w-full max-w-3xl shadow-[var(--shadow-warm)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider font-medium">
                From
              </label>
              <input
                type="text"
                placeholder="Mumbai (BOM)"
                className="bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] border-b border-[var(--border)] pb-2 focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider font-medium">
                To
              </label>
              <input
                type="text"
                placeholder="Delhi (DEL)"
                className="bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] border-b border-[var(--border)] pb-2 focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <DatePicker label="Date" value={date} onChange={setDate} />
            <button className="bg-[var(--gold)] text-white font-bold py-3 px-6 rounded-xl hover:bg-[var(--gold-light)] hover:text-[var(--text-primary)] transition-all mt-2 sm:mt-auto shadow-sm hover:shadow-md">
              Search Flights
            </button>
          </div>
        </div>
      </section>

      {/* Class Highlights */}
      <section className="px-5 sm:px-8 py-12 sm:py-16 max-w-6xl mx-auto">
        <p className="text-[var(--gold)] text-xs sm:text-sm tracking-widest uppercase text-center mb-2 font-semibold">
          Travel your way
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-[var(--text-primary)]">
          Choose your experience
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              name: "Economy",
              desc: "Comfortable seating with A La Carte meal selection",
              icon: "◆",
            },
            {
              name: "Premium Economy",
              desc: "Extra legroom with curated A La Carte dining",
              icon: "◈",
            },
            {
              name: "Business",
              desc: "Lie-flat beds with fully customisable menus",
              icon: "◉",
            },
            {
              name: "First Class",
              desc: "Private suites with personal chef experience",
              icon: "★",
            },
          ].map((cls) => (
            <div
              key={cls.name}
              className="border border-[var(--border)] rounded-2xl p-5 sm:p-6 hover:border-[var(--gold)] hover:bg-[var(--gold-glow)] transition-all cursor-pointer group hover:shadow-[var(--shadow-warm)]"
            >
              <p className="text-[var(--gold)] text-2xl mb-3 sm:mb-4">
                {cls.icon}
              </p>
              <h3 className="font-semibold text-base sm:text-lg mb-1.5 sm:mb-2 group-hover:text-[var(--gold)] transition-colors">
                {cls.name}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {cls.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] px-5 sm:px-8 py-5 sm:py-6 text-center text-[var(--text-muted)] text-sm">
        © 2025 Air Vimanam. Experience our culture in the sky.
      </footer>
    </main>
  );
}
