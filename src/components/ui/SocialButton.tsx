/**
 * SocialButton — DRY reusable social authentication button.
 * Open/Closed: new providers can be added without changing this component.
 */
"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
}

export default function SocialButton({
  icon,
  label,
  className = "",
  ...rest
}: SocialButtonProps) {
  return (
    <button
      type="button"
      className={`
        flex items-center justify-center gap-2.5 rounded-xl border-2 border-stone-200
        bg-white px-4 py-3 text-sm font-medium text-stone-700
        transition-all duration-200 ease-in-out
        hover:border-yellow-400 hover:bg-stone-50 hover:shadow-sm
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...rest}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
