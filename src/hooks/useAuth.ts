/**
 * useAuth — Dependency Inversion: UI components depend on this hook (abstraction),
 * not directly on Firebase SDK (concrete implementation).
 * Single Responsibility: Only handles authentication operations.
 */
"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  sendPasswordResetEmail,
  AuthError,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export interface AuthState {
  loading: boolean;
  error: string | null;
}

const INITIAL_STATE: AuthState = { loading: false, error: null };

/** Maps Firebase error codes to human-friendly messages */
function mapFirebaseError(error: AuthError): string {
  switch (error.code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email or password. Please try again.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    case "auth/popup-closed-by-user":
      return "Sign-in popup was closed. Please try again.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
}

export function useAuth() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>(INITIAL_STATE);

  const setLoading = () => setState({ loading: true, error: null });
  const setError = (error: AuthError) =>
    setState({ loading: false, error: mapFirebaseError(error) });
  const clearError = () => setState((s) => ({ ...s, error: null }));

  async function signInWithEmail(email: string, password: string) {
    setLoading();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      setError(err as AuthError);
    }
  }

  async function signInWithGoogle() {
    setLoading();
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      router.push("/");
    } catch (err) {
      setError(err as AuthError);
    }
  }

  async function signInWithApple() {
    setLoading();
    try {
      const provider = new OAuthProvider("apple.com");
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err) {
      setError(err as AuthError);
    }
  }

  async function forgotPassword(email: string) {
    if (!email) return "Please enter your email address first.";
    try {
      await sendPasswordResetEmail(auth, email);
      return null; // success
    } catch (err) {
      return mapFirebaseError(err as AuthError);
    }
  }

  return {
    ...state,
    clearError,
    signInWithEmail,
    signInWithGoogle,
    signInWithApple,
    forgotPassword,
  };
}
