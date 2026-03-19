export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--navy)] text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div>
          <p className="text-[var(--gold)] font-semibold text-xl tracking-wide">
            AIR VIMANAM
          </p>
          <p className="text-white/40 text-xs tracking-widest">
            EXPERIENCE OUR CULTURE IN THE SKY
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/70">
          <a href="#" className="hover:text-white transition-colors">
            Flights
          </a>
          <a href="#" className="hover:text-white transition-colors">
            My Bookings
          </a>
          <button className="bg-[var(--gold)] text-[var(--navy)] px-5 py-2 rounded-full font-semibold hover:bg-[var(--gold-light)] transition-colors">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <p className="text-[var(--gold)] text-sm tracking-[0.3em] uppercase mb-4">
          Welcome aboard
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Where every journey
          <br />
          <span className="text-[var(--gold)]">tells a story</span>
        </h1>
        <p className="text-white/60 text-lg max-w-xl mb-12">
          Fly with Air Vimanam and experience the warmth of Indian hospitality,
          world-class cuisine, and comfort at 35,000 feet.
        </p>

        {/* Search Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 w-full max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-white/40 text-xs uppercase tracking-wider">
                From
              </label>
              <input
                type="text"
                placeholder="Mumbai (BOM)"
                className="bg-transparent text-white placeholder-white/30 border-b border-white/20 pb-2 focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-white/40 text-xs uppercase tracking-wider">
                To
              </label>
              <input
                type="text"
                placeholder="Delhi (DEL)"
                className="bg-transparent text-white placeholder-white/30 border-b border-white/20 pb-2 focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-white/40 text-xs uppercase tracking-wider">
                Date
              </label>
              <input
                type="date"
                className="bg-transparent text-white/60 border-b border-white/20 pb-2 focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <button className="bg-[var(--gold)] text-[var(--navy)] font-bold py-3 px-6 rounded-xl hover:bg-[var(--gold-light)] transition-colors mt-4 md:mt-auto">
              Search Flights
            </button>
          </div>
        </div>
      </section>

      {/* Class Highlights */}
      <section className="px-8 py-16 max-w-6xl mx-auto">
        <p className="text-[var(--gold)] text-sm tracking-widest uppercase text-center mb-2">
          Travel your way
        </p>
        <h2 className="text-3xl font-bold text-center mb-12">
          Choose your experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              className="border border-white/10 rounded-2xl p-6 hover:border-[var(--gold)]/50 hover:bg-white/5 transition-all cursor-pointer group"
            >
              <p className="text-[var(--gold)] text-2xl mb-4">{cls.icon}</p>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--gold)] transition-colors">
                {cls.name}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {cls.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-8 py-6 text-center text-white/30 text-sm">
        © 2025 Air Vimanam. Experience our culture in the sky.
      </footer>
    </main>
  );
}
