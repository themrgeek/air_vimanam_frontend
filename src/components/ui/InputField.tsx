/**
 * InputField — Open/Closed Principle: extendable via props without modification.
 * DRY: Single reusable input component used by any form in the app.
 */
"use client";

import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  trailing?: ReactNode;
  error?: string | null;
  id: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, icon, trailing, error, id, className = "", ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={id}
          className="text-xs font-semibold uppercase tracking-wider text-stone-700"
        >
          {label}
        </label>
        <div
          className={`
            flex items-center gap-3 rounded-lg bg-stone-100 px-3 py-3
            border-2 transition-colors duration-200
            focus-within:border-yellow-400 focus-within:bg-white
            ${error ? "border-red-400 bg-red-50" : "border-transparent"}
          `}
        >
          {icon && (
            <span className="text-stone-400 shrink-0 flex items-center">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            aria-describedby={error ? `${id}-error` : undefined}
            aria-invalid={!!error}
            className={`
              flex-1 bg-transparent text-sm text-stone-900 placeholder-stone-400
              focus:outline-none
              ${className}
            `}
            {...rest}
          />
          {trailing && (
            <span className="text-stone-400 shrink-0 flex items-center">
              {trailing}
            </span>
          )}
        </div>
        {error && (
          <p
            id={`${id}-error`}
            role="alert"
            className="text-xs text-red-500 font-medium"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;
