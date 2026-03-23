/**
 * SignInForm — Single Responsibility: handles only the presentation + form state
 * for sign-in. All Firebase logic is injected via useAuth (DIP).
 *
 * Follows the "Golden Horizon" design system from the Jira ticket.
 */
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import InputField from "@/components/ui/InputField";
import SocialButton from "@/components/ui/SocialButton";

/* ─────────────────────────────── Icons ─────────────────────────────── */

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-stone-800">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/* ────────────────────────────── Component ───────────────────────────── */

interface FormErrors {
  email?: string;
  password?: string;
}

function validateForm(email: string, password: string): FormErrors {
  const errors: FormErrors = {};
  if (!email) errors.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Please enter a valid email address.";
  if (!password) errors.password = "Password is required.";
  else if (password.length < 6)
    errors.password = "Password must be at least 6 characters.";
  return errors;
}

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [resetMsg, setResetMsg] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const { loading, error, clearError, signInWithEmail, signInWithGoogle, signInWithApple, forgotPassword } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearError();
    setResetMsg(null);
    const errors = validateForm(email, password);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    await signInWithEmail(email, password);
  }

  async function handleForgotPassword() {
    setResetMsg(null);
    const result = await forgotPassword(email);
    if (result) {
      setResetMsg(result);
    } else {
      setResetMsg("✓ Password reset email sent. Check your inbox.");
    }
  }

  return (
    <div className="w-full max-w-[480px] rounded-3xl bg-white shadow-2xl shadow-stone-200/80 px-10 py-12">

      {/* Brand Header */}
      <div className="mb-8 text-center">
        <p className="text-xl font-black tracking-[0.25em] uppercase text-yellow-500">
          Air Vimanam
        </p>
        <p className="mt-0.5 text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium">
          The Golden Horizon
        </p>
      </div>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 leading-tight">
          Welcome Back
        </h1>
        <p className="mt-2 text-sm text-stone-500 leading-relaxed">
          Please enter your details to access your premium flight experience.
        </p>
      </div>

      {/* Global Firebase Error */}
      {error && (
        <div
          role="alert"
          className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 font-medium"
        >
          {error}
        </div>
      )}

      {/* Reset Message */}
      {resetMsg && (
        <div
          role="status"
          className={`mb-5 rounded-lg px-4 py-3 text-sm font-medium border ${
            resetMsg.startsWith("✓")
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-600"
          }`}
        >
          {resetMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {/* Email */}
        <InputField
          id="signin-email"
          label="Email Address"
          type="email"
          placeholder="name@luxury.com"
          autoComplete="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setFormErrors((f) => ({ ...f, email: undefined })); }}
          icon={<EmailIcon />}
          error={formErrors.email}
          ref={emailRef}
          disabled={loading}
        />

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="signin-password"
              className="text-xs font-semibold uppercase tracking-wider text-stone-700"
            >
              Password
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs font-semibold text-yellow-500 hover:text-yellow-600 transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
            >
              Forgot Password?
            </button>
          </div>
          <InputField
            id="signin-password"
            label=""
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setFormErrors((f) => ({ ...f, password: undefined })); }}
            icon={<LockIcon />}
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="focus-visible:outline-none hover:text-stone-600 transition-colors"
              >
                <EyeIcon open={showPassword} />
              </button>
            }
            error={formErrors.password}
            disabled={loading}
          />
        </div>

        {/* Submit */}
        <button
          id="signin-submit"
          type="submit"
          disabled={loading}
          className="
            mt-1 flex items-center justify-center gap-2.5
            w-full rounded-full bg-yellow-400 px-6 py-3.5
            text-base font-bold text-stone-900
            transition-all duration-300 ease-in-out
            hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-200
            active:scale-95
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2
            disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100
          "
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Signing in…
            </>
          ) : (
            <>
              Sign In
              <ArrowRightIcon />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-7 flex items-center gap-3">
        <div className="flex-1 h-px bg-stone-200" />
        <span className="text-[11px] font-semibold uppercase tracking-widest text-stone-400">
          Or continue with
        </span>
        <div className="flex-1 h-px bg-stone-200" />
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <SocialButton
          id="signin-google"
          icon={<GoogleIcon />}
          label="Google"
          onClick={() => { clearError(); signInWithGoogle(); }}
          disabled={loading}
          aria-label="Sign in with Google"
        />
        <SocialButton
          id="signin-apple"
          icon={<AppleIcon />}
          label="Apple"
          onClick={() => { clearError(); signInWithApple(); }}
          disabled={loading}
          aria-label="Sign in with Apple"
        />
      </div>

      {/* Footer link */}
      <p className="mt-8 text-center text-sm text-stone-500">
        New to the golden horizon?{" "}
        <Link
          href="/signup"
          className="font-semibold text-yellow-500 hover:text-yellow-600 transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
