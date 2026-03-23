/**
 * Sign In Page — Thin route wrapper (SRP: only concerns itself with layout and metadata).
 * The actual UI logic lives in <SignInForm />.
 */
import type { Metadata } from "next";
import SignInForm from "@/components/SignInForm";

export const metadata: Metadata = {
  title: "Sign In — Air Vimanam | The Golden Horizon",
  description:
    "Sign in to your Air Vimanam account to manage bookings, check flight status, and enjoy a premium travel experience.",
};

export default function SignInPage() {
  return (
    <main
      id="signin-page"
      className="
        relative min-h-screen bg-stone-50
        flex flex-col items-center justify-center
        px-4 py-12
        overflow-hidden
      "
    >
      {/* Aurora / radial background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(234,179,8,0.10) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(234,179,8,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Brand on top of page (outside card, matches wireframe) */}
      <div className="mb-8 text-center select-none">
        <p className="text-2xl font-black tracking-[0.3em] uppercase text-stone-800">
          Air Vimanam
        </p>
        <p className="mt-1 text-[10px] tracking-[0.35em] uppercase text-stone-400 font-semibold">
          The Golden Horizon
        </p>
      </div>

      {/* Card */}
      <SignInForm />

      {/* Footer */}
      <footer className="mt-10 w-full max-w-5xl px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200 pt-6">
          <p className="text-xs font-bold tracking-widest uppercase text-stone-700">
            Air Vimanam
          </p>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {["Privacy Policy", "Terms of Service", "Cookie Settings", "Sustainability"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs text-stone-500 hover:text-stone-800 transition-colors duration-200"
                >
                  {item}
                </a>
              )
            )}
          </nav>
          <p className="text-xs text-yellow-600 font-semibold tracking-wide text-center sm:text-right">
            © 2024 Air Vimanam. The Golden Horizon.
          </p>
        </div>
      </footer>
    </main>
  );
}
